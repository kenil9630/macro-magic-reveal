
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-06-20T15:00:00+05:30'); // June 20, 2025, 3:00 PM IST

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        
        // Make it urgent if less than 1 day left
        setIsUrgent(days === 0);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-6 animate-pulse-glow shadow-2xl relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="sparkle absolute top-2 left-4 animate-sparkle" style={{ animationDelay: '0s' }}></div>
        <div className="sparkle absolute top-8 right-6 animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="sparkle absolute bottom-4 left-8 animate-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="sparkle absolute bottom-8 right-4 animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <h3 className={`text-xl font-bold text-center mb-6 ${isUrgent ? 'text-red-600 animate-pulse' : 'text-emerald-800'}`}>
        {isUrgent ? '🚨 Event Starts Soon!' : 'Event Starts In'}
      </h3>
      
      <div className="grid grid-cols-4 gap-4 text-center relative z-10">
        <div className={`bg-gradient-to-b from-emerald-500 to-green-600 text-white rounded-xl p-4 shadow-lg transform transition-all duration-300 ${isUrgent ? 'animate-bounce scale-105' : 'hover:scale-105'}`}>
          <div className={`text-3xl font-bold ${timeLeft.seconds % 2 === 0 ? 'animate-glow' : ''}`}>
            {timeLeft.days}
          </div>
          <div className="text-sm opacity-90 font-medium">Days</div>
          {timeLeft.days <= 1 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
        
        <div className={`bg-gradient-to-b from-emerald-500 to-green-600 text-white rounded-xl p-4 shadow-lg transform transition-all duration-300 ${isUrgent ? 'animate-bounce scale-105' : 'hover:scale-105'}`} style={{ animationDelay: '0.1s' }}>
          <div className={`text-3xl font-bold ${timeLeft.seconds % 2 === 0 ? 'animate-glow' : ''}`}>
            {timeLeft.hours}
          </div>
          <div className="text-sm opacity-90 font-medium">Hours</div>
        </div>
        
        <div className={`bg-gradient-to-b from-emerald-500 to-green-600 text-white rounded-xl p-4 shadow-lg transform transition-all duration-300 ${isUrgent ? 'animate-bounce scale-105' : 'hover:scale-105'}`} style={{ animationDelay: '0.2s' }}>
          <div className={`text-3xl font-bold ${timeLeft.seconds % 2 === 0 ? 'animate-glow' : ''}`}>
            {timeLeft.minutes}
          </div>
          <div className="text-sm opacity-90 font-medium">Minutes</div>
        </div>
        
        <div className={`bg-gradient-to-b from-emerald-500 to-green-600 text-white rounded-xl p-4 shadow-lg transform transition-all duration-300 ${isUrgent ? 'animate-bounce scale-105' : 'hover:scale-105'}`} style={{ animationDelay: '0.3s' }}>
          <div className="text-3xl font-bold animate-pulse">
            {timeLeft.seconds}
          </div>
          <div className="text-sm opacity-90 font-medium">Seconds</div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full animate-pulse"
          style={{ 
            width: `${Math.max(10, (timeLeft.seconds / 60) * 100)}%`,
            transition: 'width 1s ease-in-out'
          }}
        ></div>
      </div>
      
      {isUrgent && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
            ⚡ Last chance to join!
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
