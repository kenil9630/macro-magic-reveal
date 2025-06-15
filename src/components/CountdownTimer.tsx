import React, { useState, useEffect } from 'react';

interface TimeUnit {
  value: number;
  label: string;
  isChanging: boolean;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Days', isChanging: false },
    { value: 0, label: 'Hours', isChanging: false },
    { value: 0, label: 'Minutes', isChanging: false },
    { value: 0, label: 'Seconds', isChanging: false }
  ]);

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

        setTimeLeft(prev => prev.map((unit, index) => {
          const newValue = [days, hours, minutes, seconds][index];
          return {
            ...unit,
            value: newValue,
            isChanging: newValue !== unit.value
          };
        }));
      } else {
        setTimeLeft(prev => prev.map(unit => ({
          ...unit,
          value: 0,
          isChanging: false
        })));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-8 animate-countdown-glow shadow-xl max-w-4xl mx-auto"
      style={{ minWidth: '340px', maxWidth: '98vw' }}
    >
      <h3 className="text-3xl font-bold text-emerald-800 text-center mb-6">
        Event Starts In
      </h3>
      <div className="grid grid-cols-4 gap-6 text-center">
        {timeLeft.map((unit, index) => (
          <div
            key={unit.label}
            className={`bg-gradient-to-b from-emerald-600 to-green-700 text-white rounded-xl p-6 shadow-lg transition-all duration-300 flex flex-col items-center justify-center ${
              unit.isChanging ? 'animate-countdown-pulse' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className={`text-4xl font-bold transition-all duration-300 ${
                unit.isChanging ? 'animate-countdown-slide' : ''
              }`}>
                {unit.value}
              </span>
              <span className="text-lg font-medium opacity-90 mt-2 whitespace-nowrap">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
