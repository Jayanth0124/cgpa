import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';

const NotificationModal: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const closePopup = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    const launchTimeout = setTimeout(() => {
      setIsActive(true);

      timerInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            closePopup();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 3000);

    return () => {
      clearTimeout(launchTimeout);
      clearInterval(timerInterval);
    };
  }, [closePopup]);

  return (
    <div
      className={`fixed z-[9999] transition-all duration-500 ease-out
        ${isActive
          ? 'right-5 md:right-10 opacity-100 pointer-events-auto'
          : 'right-[-500px] md:right-[-500px] opacity-0 pointer-events-none'
        }
        bottom-5 md:bottom-10 left-5 md:left-auto w-auto md:w-[420px]
      `}
    >
      <div className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top gradient line accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
          <span className="text-[10px] font-bold tracking-[3px] text-blue-400 uppercase font-['Inter']">
            SYS.ALERT
          </span>
          <button
            onClick={closePopup}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90"
            aria-label="Close Protocol"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-3 font-['Inter']">
            Your visit = little joy moment.
          </h2>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed font-['Inter']">
            Follow me on GitHub or visit my portfolio — your support means everything!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/Jayanth0124"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-stretch rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <span className="flex-1 flex items-center justify-center py-3 text-xs font-semibold tracking-widest uppercase text-white font-['Inter'] transition-colors duration-300 group-hover:text-blue-400">
                Initiate Follow
              </span>
              <span className="flex items-center justify-center px-4 bg-white/5 border-l border-white/10 text-white transition-all duration-300 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white">
                <Github size={18} />
              </span>
            </a>

            <a
              href="https://jayanth.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-stretch rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <span className="flex-1 flex items-center justify-center py-3 text-xs font-semibold tracking-widest uppercase text-white font-['Inter'] transition-colors duration-300 group-hover:text-purple-400">
                Visit Portfolio
              </span>
              <span className="flex items-center justify-center px-4 bg-white/5 border-l border-white/10 text-white transition-all duration-300 group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white">
                <ExternalLink size={18} />
              </span>
            </a>
          </div>
        </div>

        {/* Timer Track */}
        <div className="w-full h-[3px] bg-white/10">
          <div
            className={`h-full bg-gradient-to-r from-blue-400 to-purple-400 origin-left ${
              isActive ? 'animate-timer-shrink' : ''
            }`}
          ></div>
        </div>

        {/* Timer Text */}
        <div className="px-5 py-2 text-right bg-white/[0.02]">
          <span className="text-[10px] font-semibold tracking-[2px] text-gray-500 uppercase font-['Inter']">
            AUTO_DISCONNECT IN <span className="text-blue-400">{countdown}</span>S
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

