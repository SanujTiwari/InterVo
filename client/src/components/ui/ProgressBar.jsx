import { motion } from 'framer-motion';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  size = 'md',
  gradient = true,
  className = '',
}) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-slate-300">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-slate-400">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${sizeClasses[size]} bg-slate-800/80 rounded-full overflow-hidden`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            gradient
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-blue-500'
          }`}
        />
      </div>
    </div>
  );
}
