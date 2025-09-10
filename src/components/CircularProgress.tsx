import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  label: string; // Add this new prop
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  size, 
  strokeWidth, 
  label, // Destructure the new prop
  className = "" 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
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
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white">
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