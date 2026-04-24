import React, { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';

interface PercentileChartProps {
  cgpa: number;
}

const getPercentile = (cgpa: number): { percentile: number; label: string; color: string } => {
  if (cgpa >= 9.5) return { percentile: 2, label: 'Top 2%', color: 'from-emerald-400 to-green-500' };
  if (cgpa >= 9.0) return { percentile: 5, label: 'Top 5%', color: 'from-emerald-400 to-teal-500' };
  if (cgpa >= 8.5) return { percentile: 15, label: 'Top 15%', color: 'from-blue-400 to-cyan-500' };
  if (cgpa >= 8.0) return { percentile: 30, label: 'Top 30%', color: 'from-blue-400 to-indigo-500' };
  if (cgpa >= 7.5) return { percentile: 50, label: 'Top 50%', color: 'from-indigo-400 to-purple-500' };
  if (cgpa >= 7.0) return { percentile: 70, label: 'Top 70%', color: 'from-purple-400 to-pink-500' };
  if (cgpa >= 6.0) return { percentile: 85, label: 'Top 85%', color: 'from-orange-400 to-amber-500' };
  return { percentile: 95, label: 'Top 95%', color: 'from-red-400 to-orange-500' };
};

const PercentileChart: React.FC<PercentileChartProps> = ({ cgpa }) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const info = getPercentile(cgpa);
  const fillPercent = 100 - info.percentile;

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth * (fillPercent / 100));
    }
  }, [fillPercent]);

  return (
    <div className="mt-6 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
      <div className="flex items-center space-x-2 mb-3">
        <Trophy className="text-amber-400" size={18} />
        <span className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
          Anonymous Campus Percentile
        </span>
      </div>

      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-white">{info.label}</span>
        <p className="text-xs text-gray-400 mt-1">
          Your CGPA of {cgpa.toFixed(2)} puts you in the {info.label.toLowerCase()} of users this College.
        </p>
      </div>

      <div ref={containerRef} className="relative h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${info.color} transition-all duration-[2000ms] ease-out`}
          style={{ width: `${width}px` }}
        />
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-sweep rounded-full pointer-events-none" />
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-medium tracking-wider">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default PercentileChart;

