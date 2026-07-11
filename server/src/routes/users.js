import { Router } from 'express';
import { getUserProfile, updateUserProfile, recordInterview, recordProblemSolved } from '../controllers/users.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/profile/interview', recordInterview);
router.post('/profile/problem', recordProblemSolved);

export default router;
