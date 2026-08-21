import React from 'react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  color?: string;
  trackColor?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 46,
  strokeWidth = 4,
  showText = true,
  color = '#fbbf24', // amber-400
  trackColor = 'rgba(255, 255, 255, 0.1)'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const validPercentage = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (validPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      {showText && (
        <span className="absolute text-[10px] font-mono-code font-bold text-white">
          {validPercentage}%
        </span>
      )}
    </div>
  );
};
