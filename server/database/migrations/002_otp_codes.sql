-- ============================================================
-- Intervo Database Schema — Migration 002: OTP Codes Table
-- ============================================================

-- ─── OTP Codes Table ──────────────────────────────────────────
-- Stores one-time passcodes for email verification and password reset.
CREATE TABLE IF NOT EXISTS otp_codes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) NOT NULL,
    otp_code        VARCHAR(6) NOT NULL,
    type            VARCHAR(30) NOT NULL DEFAULT 'signup'
                      CHECK (type IN ('signup', 'forgot_password', 'verification')),
    attempts        INTEGER NOT NULL DEFAULT 0,
    max_attempts    INTEGER NOT NULL DEFAULT 5,
    is_used         BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_type ON otp_codes(email, type);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_otp_codes_otp_code   ON otp_codes(otp_code);
