import React from 'react';

interface GradeInputProps {
  grade: string;
  points: number;
  value: number;
  onChange: (value: number) => void;
  color: string;
}

const GradeInput: React.FC<GradeInputProps> = ({ 
  grade, 
  value, 
  onChange, 
  color 
}) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white font-bold shadow-lg`}>
            {grade}
          </div>
          <div className="text-white font-semibold text-lg">Grade {grade}</div>
        </div>
        <div className="text-gray-400 text-sm font-medium">Subjects</div>
      </div>
      <input
        type="number"
        min="0"
        max="20"
        value={value === 0 ? '' : value}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === '') {
            onChange(0);
          } else {
            onChange(Math.max(0, parseInt(inputValue) || 0));
          }
        }}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
        placeholder="0"
      />
    </div>
  );
};

export default GradeInput;