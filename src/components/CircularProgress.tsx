import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  label: string;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size,
  strokeWidth,
  label,
  className = ""
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      {/* Cinematic outer glow */}
      <div
        className="absolute inset-0 rounded-full glow-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)`,
          transform: 'scale(1.3)',
        }}
      />
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 relative z-10"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient-active)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Shimmer sweep overlay */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#shimmer-gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="shimmer-sweep opacity-0"
          style={{ animationDelay: '0.5s' }}
        />
        <defs>
          <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            {percentage.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-400 mt-2 font-medium">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
