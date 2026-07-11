import { query, getClient } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Helper function to update user streak and XP.
 */
const updateStreakAndXP = async (dbClient, userId, xpToAdd) => {
  const profileRes = await dbClient.query(
    'SELECT current_streak, longest_streak, xp_points, last_active_at FROM user_profiles WHERE user_id = $1',
    [userId]
  );
  
  if (profileRes.rows.length === 0) {
    throw new AppError('Profile not found', 404);
  }
  
  const profile = profileRes.rows[0];
  let currentStreak = profile.current_streak;
  let longestStreak = profile.longest_streak;
  let newXpPoints = profile.xp_points + xpToAdd;
  const now = new Date();
  
  if (profile.last_active_at) {
    const lastActive = new Date(profile.last_active_at);
    
    // Clear hours to compare dates only
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastActiveDate = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    
    if (lastActiveDate.getTime() === yesterday.getTime()) {
      // Activity on consecutive day, increment streak
      currentStreak += 1;
    } else if (lastActiveDate.getTime() < yesterday.getTime()) {
      // Streak broken, reset to 1
      currentStreak = 1;
    }
    // If lastActiveDate is today, keep currentStreak the same
  } else {
    // First activity ever
    currentStreak = 1;
  }
  
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }
  
  await dbClient.query(
    `UPDATE user_profiles 
     SET current_streak = $1, longest_streak = $2, xp_points = $3, last_active_at = NOW() 
     WHERE user_id = $4`,
    [currentStreak, longestStreak, newXpPoints, userId]
  );
};

/**
 * Fetch the authenticated user's profile and stats.
 */
export const getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  
  try {
    const userProfileRes = await query(
      `SELECT 
         u.id, u.email, u.full_name, u.avatar_url, u.role, u.created_at,
         p.bio, p.college, p.graduation_year, p.target_company, p.target_role, p.resume_url, p.skills,
         p.xp_points, p.current_streak, p.longest_streak, p.interviews_taken, p.problems_solved, p.avg_score, p.avg_solve_time, p.acceptance_rate, p.last_active_at
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );
    
    if (userProfileRes.rows.length === 0) {
      throw new AppError('User not found', 404);
    }
    
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Profile retrieved successfully',
      data: userProfileRes.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update the user's profile information.
 */
export const updateUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { full_name, bio, college, graduation_year, target_company, target_role, skills } = req.body;
  
  const dbClient = await getClient();
  try {
    await dbClient.query('BEGIN');
    
    if (full_name) {
      await dbClient.query(
        'UPDATE users SET full_name = $1 WHERE id = $2',
        [full_name, userId]
      );
    }
    
    await dbClient.query(
      `UPDATE user_profiles 
       SET bio = COALESCE($1, bio),
           college = COALESCE($2, college),
           graduation_year = COALESCE($3, graduation_year),
           target_company = COALESCE($4, target_company),
           target_role = COALESCE($5, target_role),
           skills = COALESCE($6, skills)
       WHERE user_id = $7`,
      [
        bio !== undefined ? bio : null,
        college !== undefined ? college : null,
        graduation_year !== undefined ? (graduation_year ? parseInt(graduation_year) : null) : null,
        target_company !== undefined ? target_company : null,
        target_role !== undefined ? target_role : null,
        skills !== undefined ? skills : null,
        userId
      ]
    );
    
    await dbClient.query('COMMIT');
    
    // Fetch updated profile
    const updatedProfileRes = await query(
      `SELECT 
         u.id, u.email, u.full_name, u.avatar_url, u.role, u.created_at,
         p.bio, p.college, p.graduation_year, p.target_company, p.target_role, p.resume_url, p.skills,
         p.xp_points, p.current_streak, p.longest_streak, p.interviews_taken, p.problems_solved, p.avg_score, p.avg_solve_time, p.acceptance_rate, p.last_active_at
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );
    
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Profile updated successfully',
      data: updatedProfileRes.rows[0]
    });
  } catch (err) {
    await dbClient.query('ROLLBACK');
    next(err);
  } finally {
    dbClient.release();
  }
};

/**
 * Record a completed mock interview and update user stats.
 */
export const recordInterview = async (req, res, next) => {
  const userId = req.user.id;
  const { score } = req.body;
  const parsedScore = parseInt(score) || 0;
  
  const dbClient = await getClient();
  try {
    await dbClient.query('BEGIN');
    
    // Fetch current profile stats
    const profileRes = await dbClient.query(
      'SELECT interviews_taken, avg_score FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (profileRes.rows.length === 0) {
      throw new AppError('Profile not found', 404);
    }
    
    const profile = profileRes.rows[0];
    const newInterviewsTaken = profile.interviews_taken + 1;
    
    // Recalculate average score: (old_avg * old_count + new_score) / new_count
    const newAvgScore = Math.round((profile.avg_score * profile.interviews_taken + parsedScore) / newInterviewsTaken);
    
    // Update streak and add 100 XP
    await updateStreakAndXP(dbClient, userId, 100);
    
    // Update interviews and average score
    await dbClient.query(
      `UPDATE user_profiles 
       SET interviews_taken = $1, avg_score = $2
       WHERE user_id = $3`,
      [newInterviewsTaken, newAvgScore, userId]
    );
    
    await dbClient.query('COMMIT');
    
    // Fetch updated profile
    const updatedProfileRes = await query(
      `SELECT 
         u.id, u.email, u.full_name, u.avatar_url, u.role, u.created_at,
         p.bio, p.college, p.graduation_year, p.target_company, p.target_role, p.resume_url, p.skills,
         p.xp_points, p.current_streak, p.longest_streak, p.interviews_taken, p.problems_solved, p.avg_score, p.avg_solve_time, p.acceptance_rate, p.last_active_at
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );
    
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Interview recorded successfully',
      data: updatedProfileRes.rows[0]
    });
  } catch (err) {
    await dbClient.query('ROLLBACK');
    next(err);
  } finally {
    dbClient.release();
  }
};

/**
 * Record a solved coding problem and update user stats.
 */
export const recordProblemSolved = async (req, res, next) => {
  const userId = req.user.id;
  
  const dbClient = await getClient();
  try {
    await dbClient.query('BEGIN');
    
    // Fetch current profile stats
    const profileRes = await dbClient.query(
      'SELECT problems_solved FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (profileRes.rows.length === 0) {
      throw new AppError('Profile not found', 404);
    }
    
    const profile = profileRes.rows[0];
    const newProblemsSolved = profile.problems_solved + 1;
    
    // Update streak and add 50 XP
    await updateStreakAndXP(dbClient, userId, 50);
    
    // Update problems solved count
    await dbClient.query(
      `UPDATE user_profiles 
       SET problems_solved = $1
       WHERE user_id = $2`,
      [newProblemsSolved, userId]
    );
    
    await dbClient.query('COMMIT');
    
    // Fetch updated profile
    const updatedProfileRes = await query(
      `SELECT 
         u.id, u.email, u.full_name, u.avatar_url, u.role, u.created_at,
         p.bio, p.college, p.graduation_year, p.target_company, p.target_role, p.resume_url, p.skills,
         p.xp_points, p.current_streak, p.longest_streak, p.interviews_taken, p.problems_solved, p.avg_score, p.avg_solve_time, p.acceptance_rate, p.last_active_at
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );
    
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Problem solved recorded successfully',
      data: updatedProfileRes.rows[0]
    });
  } catch (err) {
    await dbClient.query('ROLLBACK');
    next(err);
  } finally {
    dbClient.release();
  }
};
