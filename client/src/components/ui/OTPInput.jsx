import { useState, useRef, useEffect } from 'react';

/**
 * Premium 6-digit OTP input with auto-focus, paste support,
 * keyboard navigation, error shake, and success glow.
 *
 * @param {{ length?: number, onComplete: (otp: string) => void, error?: boolean, disabled?: boolean }} props
 */
export default function OTPInput({ length = 6, onComplete, error = false, disabled = false }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Trigger shake animation on error
  useEffect(() => {
    if (error) {
      setValues(Array(length).fill(''));
      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 350);
    }
  }, [error, length]);

  const focusInput = (index) => {
    if (index >= 0 && index < length && inputRefs.current[index]) {
      inputRefs.current[index].focus();
      inputRefs.current[index].select();
    }
  };

  const handleChange = (index, e) => {
    const val = e.target.value;

    // Only accept single digit
    if (val && !/^\d$/.test(val)) return;

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    // Move to next input on typing
    if (val && index < length - 1) {
      focusInput(index + 1);
    }

    // Check if all digits are filled
    const otpString = newValues.join('');
    if (otpString.length === length && newValues.every(v => v !== '')) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (newValues[index]) {
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = '';
        setValues(newValues);
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (digits.length === 0) return;

    const newValues = [...values];
    for (let i = 0; i < length; i++) {
      newValues[i] = digits[i] || '';
    }
    setValues(newValues);

    // Focus the next empty or last input
    const nextEmptyIndex = newValues.findIndex(v => v === '');
    focusInput(nextEmptyIndex >= 0 ? nextEmptyIndex : length - 1);

    // If all digits filled, fire onComplete
    if (digits.length === length) {
      onComplete(digits);
    }
  };

  const handleFocus = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].select();
    }
  };

  const isFilled = values.every(v => v !== '');

  return (
    <div
      className={`flex items-center justify-center gap-2.5 sm:gap-3 ${error ? 'animate-shake' : ''}`}
    >
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(i)}
          aria-label={`Digit ${i + 1}`}
          className={`
            w-11 h-[52px] sm:w-12 sm:h-14
            text-center text-xl font-semibold
            rounded-xl border
            bg-white/[0.03] text-white
            outline-none
            transition-all duration-200 ease-out
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-text'}
            ${error
              ? 'border-red-500/60 bg-red-500/[0.06]'
              : val
                ? isFilled
                  ? 'border-emerald-500/50 bg-emerald-500/[0.05] shadow-[0_0_16px_-4px_rgba(16,185,129,0.2)]'
                  : 'border-[#d4684b]/50 bg-[#d4684b]/[0.05]'
                : 'border-white/[0.08] hover:border-white/[0.15]'
            }
            focus:border-[#d4684b]/60 focus:bg-[#d4684b]/[0.04]
            focus:shadow-[0_0_0_3px_rgba(212,104,75,0.1)]
            placeholder:text-white/10
          `}
          style={{ caretColor: '#d4684b' }}
        />
      ))}
    </div>
  );
}
