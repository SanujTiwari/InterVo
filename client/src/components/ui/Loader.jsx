import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-blue-500/20 rounded-full" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-blue-500 rounded-full animate-spin" />
        </div>
        <p className="text-sm text-slate-400 animate-pulse">Loading...</p>
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
