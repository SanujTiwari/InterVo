import { Loader2 } from 'lucide-react';
import './BookLoader.css';

export function BookLoader({ variant = 'default', className = '' }) {
  const variantClass = variant === 'coral' ? 'book--coral' : '';
  return (
    <div className={`book ${variantClass} ${className}`}>
      <div className="book__pg-shadow" />
      <div className="book__pg" />
      <div className="book__pg book__pg--2" />
      <div className="book__pg book__pg--3" />
      <div className="book__pg book__pg--4" />
      <div className="book__pg book__pg--5" />
    </div>
  );
}

export function Spinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <Loader2
      className={`${sizeClasses[size]} animate-spin text-blue-400 ${className}`}
    />
  );
}

export function PageLoader({ message = 'Loading...', variant = 'default', fullScreen = false }) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-[#0e0e0e]/90 backdrop-blur-md'
    : 'flex items-center justify-center min-h-[60vh] py-12';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-2xl backdrop-blur-xl">
        <div className="relative py-2 px-4 flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl transform scale-150 animate-pulse" />
          <BookLoader variant={variant} />
        </div>
        {message && (
          <p className="text-sm font-medium text-white/70 tracking-wide animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export function Skeleton({ className = '', ...props }) {
  return <div className={`skeleton ${className}`} {...props} />;
}

export function CardSkeleton() {
  return (
    <div className="glass p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}
