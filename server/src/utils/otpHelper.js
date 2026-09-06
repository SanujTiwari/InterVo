import crypto from 'crypto';
import env from '../config/env.js';

/**
 * Generate a cryptographically random 6-digit OTP.
 * @param {string} [excludeOtp] - Optional previous OTP to exclude so consecutive codes are guaranteed distinct
 * @returns {string} 6-digit numeric string
 */
export const generateOTP = (excludeOtp) => {
  let otp;
  do {
    otp = crypto.randomInt(100000, 999999).toString();
  } while (excludeOtp && otp === excludeOtp);
  return otp;
};

/**
 * Send OTP via email.
 * In development mode without SMTP config, logs to console and returns the OTP.
 * In production, sends a styled HTML email using nodemailer.
 *
 * @param {string} email - Recipient email address
 * @param {string} otp - The 6-digit OTP code
 * @param {string} type - OTP purpose: 'signup' | 'forgot_password' | 'verification'
 * @returns {Promise<{ sent: boolean, debugOtp?: string }>}
 */
export const sendOTPEmail = async (email, otp, type = 'signup') => {
  const subjectMap = {
    signup: 'Verify your Intervo account',
    forgot_password: 'Reset your Intervo password',
    verification: 'Verify your email — Intervo',
  };

  const headingMap = {
    signup: 'Welcome to Intervo!',
    forgot_password: 'Password Reset Request',
    verification: 'Email Verification',
  };

  const messageMap = {
    signup: 'Use the code below to verify your email and complete your registration.',
    forgot_password: 'Use the code below to reset your password. If you didn\'t request this, you can safely ignore this email.',
    verification: 'Use the code below to verify your email address.',
  };

  const subject = subjectMap[type] || subjectMap.signup;
  const heading = headingMap[type] || headingMap.signup;
  const message = messageMap[type] || messageMap.signup;

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0e0e0e; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 40px; height: 40px; background: #d4684b; border-radius: 10px; line-height: 40px; color: white; font-weight: bold; font-size: 18px;">I</div>
        <h2 style="color: #ffffff; margin: 16px 0 4px; font-size: 22px; font-weight: 600;">${heading}</h2>
        <p style="color: #ffffff80; font-size: 14px; margin: 0; line-height: 1.5;">${message}</p>
      </div>
      <div style="background: #1a1a1a; border: 1px solid #ffffff12; border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 24px;">
        <p style="color: #ffffff60; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Your verification code</p>
        <div style="font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #d4684b; font-family: 'Courier New', monospace; padding: 8px 0;">${otp}</div>
        <p style="color: #ffffff40; font-size: 12px; margin: 12px 0 0;">This code expires in 10 minutes</p>
      </div>
      <p style="color: #ffffff30; font-size: 12px; text-align: center; margin: 0;">If you didn't request this code, please ignore this email.</p>
    </div>
  `;

  // Check if SMTP credentials are configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10) || 587,
        secure: (parseInt(smtpPort, 10) || 587) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Intervo" <${smtpUser}>`,
        to: email,
        subject,
        html: htmlBody,
      });

      console.log(`📧 OTP email sent to ${email}`);
      return { sent: true };
    } catch (err) {
      console.error('❌ Failed to send OTP email:', err.message);
      // Fall through to dev mode logging
    }
  }

  // Development mode — log OTP to console
  console.log(`\n🔐 ─── OTP DEBUG ───────────────────────`);
  console.log(`   Email:  ${email}`);
  console.log(`   OTP:    ${otp}`);
  console.log(`   Type:   ${type}`);
  console.log(`   Expiry: 10 minutes`);
  console.log(`───────────────────────────────────────\n`);

  return { sent: false, debugOtp: env.isDev ? otp : undefined };
};
