import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-semibold text-white rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
          : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      {isActive && (
        <span className="absolute inset-0 bg-white/20 rounded-full animate-ping-slow"></span>
      )}
      <span className="relative">{label}</span>
    </button>
  );
};

export default TabButton;