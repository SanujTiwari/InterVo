const colorMap = {
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  red: 'bg-red-500/15 text-red-400 border-red-500/20',
  yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  slate: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
};

const sizeMap = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export default function Badge({
  children,
  color = 'blue',
  size = 'md',
  dot = false,
  className = '',
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border 
        ${colorMap[color]} ${sizeMap[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            color === 'green'
              ? 'bg-emerald-400'
              : color === 'red'
              ? 'bg-red-400'
              : color === 'yellow'
              ? 'bg-amber-400'
              : 'bg-blue-400'
          }`}
        />
      )}
      {children}
    </span>
  );
}
