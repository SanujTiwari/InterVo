-- ============================================================
-- Intervo Database Schema — Migration 001: Initial Setup
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users Table ───────────────────────────────────────────────
-- Core user table supporting both local and OAuth authentication.
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255),  -- NULL for OAuth-only users
    full_name       VARCHAR(255) NOT NULL,
    avatar_url      TEXT,
    role            VARCHAR(20) NOT NULL DEFAULT 'candidate' 
                      CHECK (role IN ('candidate', 'admin')),
    is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
    provider        VARCHAR(20) NOT NULL DEFAULT 'local' 
                      CHECK (provider IN ('local', 'google')),
    provider_id     VARCHAR(255),  -- OAuth provider user ID
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── User Profiles Table ──────────────────────────────────────
-- Extended user information for personalization.
CREATE TABLE IF NOT EXISTS user_profiles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio             TEXT,
    college         VARCHAR(255),
    graduation_year INTEGER CHECK (graduation_year >= 2000 AND graduation_year <= 2040),
    target_company  VARCHAR(255),
    target_role     VARCHAR(255),
    resume_url      TEXT,
    skills          TEXT[] DEFAULT '{}',
    xp_points       INTEGER NOT NULL DEFAULT 0,
    current_streak  INTEGER NOT NULL DEFAULT 0,
    longest_streak  INTEGER NOT NULL DEFAULT 0,
    interviews_taken INTEGER NOT NULL DEFAULT 0,
    problems_solved INTEGER NOT NULL DEFAULT 0,
    avg_score       INTEGER NOT NULL DEFAULT 0,
    avg_solve_time  INTEGER NOT NULL DEFAULT 0,
    acceptance_rate INTEGER NOT NULL DEFAULT 0,
    last_active_at  TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure stats columns exist on pre-existing user_profiles tables
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS interviews_taken INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS problems_solved INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avg_score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS avg_solve_time INTEGER NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS acceptance_rate INTEGER NOT NULL DEFAULT 0;

-- ─── Sessions Table ───────────────────────────────────────────
-- Stores refresh tokens for JWT-based auth.
CREATE TABLE IF NOT EXISTS sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token   TEXT NOT NULL,
    expires_at      TIMESTAMPTZ NOT NULL,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    is_revoked      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_refresh_token ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ─── Auto-update updated_at Trigger ───────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ─── Seed Admin User (dev only) ───────────────────────────────
-- Password: admin123 (bcrypt hash)
-- In production, create admin via a secure process.
-- INSERT INTO users (email, password_hash, full_name, role, is_verified)
-- VALUES ('admin@intervo.dev', '$2b$10$...', 'Admin User', 'admin', TRUE);
