import React from 'react';
import { BookUser, CalendarDays } from 'lucide-react';

interface AttendanceInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: 'attended' | 'conducted';
}

const AttendanceInput: React.FC<AttendanceInputProps> = ({
  label,
  value,
  onChange,
  icon,
}) => {
  const iconMap = {
    attended: <BookUser className="text-emerald-400" size={24} />,
    conducted: <CalendarDays className="text-red-400" size={24} />,
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-lg">
            {iconMap[icon]}
          </div>
          <div className="text-white font-semibold text-lg">{label}</div>
        </div>
      </div>
      <input
        type="number"
        min="0"
        value={value === 0 ? '' : value}
        onChange={(e) => {
          const inputValue = e.target.value;
          onChange(inputValue === '' ? 0 : Math.max(0, parseInt(inputValue) || 0));
        }}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
        placeholder="0"
      />
    </div>
  );
};

export default AttendanceInput;