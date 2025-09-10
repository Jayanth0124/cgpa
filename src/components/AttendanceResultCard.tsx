import React from 'react';
import { RotateCcw } from 'lucide-react';
import CircularProgress from './CircularProgress';

interface AttendanceResultCardProps {
  percentage: number;
  attended: number;
  conducted: number;
  onReset: () => void;
}

const AttendanceResultCard: React.FC<AttendanceResultCardProps> = ({
  percentage,
  attended,
  conducted,
  onReset,
}) => {
  const getStatus = (percentage: number) => {
    if (percentage >= 80) return { text: 'Safe Zone', color: 'text-green-400' };
    if (percentage >= 70) return { text: 'Borderline', color: 'text-yellow-400' };
    return { text: 'Danger Zone', color: 'text-red-400' };
  };

  const status = getStatus(percentage);

  return (
    <div>
      <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-3">Attendance Result</h3>
          <div className="text-gray-400">
            Attended {attended} out of {conducted} classes
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <CircularProgress
            percentage={percentage}
            size={160}
            strokeWidth={10}
            label="Attendance"
            className="flex-shrink-0"
          />

          <div className="text-center lg:text-left">
            <div className="text-6xl font-bold text-white mb-4">
              {percentage.toFixed(2)}%
            </div>
            <div className={`text-2xl font-bold ${status.color} mb-2`}>
              {status.text}
            </div>
            <div className="text-gray-400 text-lg">
              Minimum 80% is required
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onReset}
          className="w-full backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20 hover:border-white/40"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default AttendanceResultCard;