import React, { useState } from 'react';
import { RotateCcw, BedDouble, ShieldAlert, TrendingUp, Share2 } from 'lucide-react';
import CircularProgress from './CircularProgress';
import { shareResultImage } from '../utils/exportUtils';

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
  const [requiredPercentage, setRequiredPercentage] = useState(75);
  const [showBunkCalc, setShowBunkCalc] = useState(false);

  const getStatus = (percentage: number) => {
    if (percentage >= 80) return { text: 'Safe Zone', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    if (percentage >= requiredPercentage) return { text: 'Borderline', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return { text: 'Danger Zone', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  };

  const status = getStatus(percentage);

  // Safe Skip Calculator Logic
  const calculateSafeSkips = () => {
    if (conducted === 0) return 0;
    let skips = 0;
    let simAttended = attended;
    let simConducted = conducted;
    while (true) {
      simConducted += 1;
      const newPct = (simAttended / simConducted) * 100;
      if (newPct < requiredPercentage) break;
      skips++;
    }
    return skips;
  };

  const calculateRecovery = () => {
    if (conducted === 0) return 0;
    if (percentage >= requiredPercentage + 5) return 0;
    let needed = 0;
    let simAttended = attended;
    let simConducted = conducted;
    while (true) {
      simAttended += 1;
      simConducted += 1;
      const newPct = (simAttended / simConducted) * 100;
      needed++;
      if (newPct >= requiredPercentage + 5) break;
      if (needed > 100) break; // safety cap
    }
    return needed;
  };

  const safeSkips = calculateSafeSkips();
  const recoveryClasses = calculateRecovery();

  const handleShare = async () => {
    await shareResultImage('attendance-export-content', {
      title: `My SIMATS Attendance: ${percentage.toFixed(2)}%`,
      text: `I have ${percentage.toFixed(2)}% attendance! Check yours at simatscgpa.netlify.app`,
    });
  };

  return (
    <div>
      <div id="attendance-export-content" className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
        {/* Branding Header for Export */}
        <div className="flex items-center justify-center space-x-3 mb-6 pb-4 border-b border-white/10">
          <img
            src="/logo2.png"
            alt="SIMATS"
            className="h-10 w-auto object-contain"
            crossOrigin="anonymous"
          />
          <div>
            <div className="text-white font-bold text-lg leading-tight">SIMATS Engineering</div>
            <div className="text-gray-400 text-xs tracking-wider">ATTENDANCE CALCULATOR</div>
          </div>
        </div>

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
            <div className="text-6xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              {percentage.toFixed(2)}%
            </div>
            <div className={`text-2xl font-bold ${status.color} mb-2`}>
              {status.text}
            </div>
            <div className="text-gray-400 text-lg">
              Minimum {requiredPercentage}% is required
            </div>
          </div>
        </div>

        {/* Safe Skip Calculator Toggle */}
        <div className="mt-8">
          <button
            onClick={() => setShowBunkCalc(!showBunkCalc)}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 border ${status.bg} ${status.border} hover:bg-white/5`}
          >
            <BedDouble size={18} className={status.color} />
            <span className={`font-semibold ${status.color}`}>
              {showBunkCalc ? 'Hide' : 'Can I Bunk Today?'}
            </span>
          </button>

          {showBunkCalc && (
            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Required % Input */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <label className="text-sm text-gray-300 font-medium">Minimum Required %</label>
                <input
                  type="number"
                  min="50"
                  max="95"
                  value={requiredPercentage}
                  onChange={(e) => setRequiredPercentage(Math.max(50, Math.min(95, parseInt(e.target.value) || 75)))}
                  className="w-20 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Safe Skips */}
              <div className={`p-5 rounded-xl ${safeSkips > 0 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <ShieldAlert size={18} className={safeSkips > 0 ? 'text-emerald-400' : 'text-red-400'} />
                  <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Safe Skip Allowance</span>
                </div>
                <div className={`text-3xl font-bold ${safeSkips > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {safeSkips} {safeSkips === 1 ? 'Class' : 'Classes'}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {safeSkips > 0
                    ? `You can safely skip ${safeSkips} consecutive classes before dropping below ${requiredPercentage}%`
                    : `Skipping even 1 class will drop you below ${requiredPercentage}%!`}
                </p>
              </div>

              {/* Recovery */}
              {recoveryClasses > 0 && (
                <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp size={18} className="text-blue-400" />
                    <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Recovery Needed</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {recoveryClasses} {recoveryClasses === 1 ? 'Class' : 'Classes'}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Attend {recoveryClasses} consecutive classes without skipping to reach a safe buffer above {requiredPercentage}%
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleShare}
          className="group relative flex-1 overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <Share2 size={20} />
            <span>Share My Score</span>
          </div>
        </button>

        <button
          onClick={onReset}
          className="flex-1 backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20 hover:border-white/40"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default AttendanceResultCard;
