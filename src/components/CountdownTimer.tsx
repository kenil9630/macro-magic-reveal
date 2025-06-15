
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-06-20T15:00:00+05:30'); // June 20, 2025, 3:00 PM IST

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-6 animate-pulse-glow">
      <h3 className="text-xl font-bold text-green-800 text-center mb-4">
        Event Starts In
      </h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg p-4">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-sm">Days</div>
        </div>
        <div className="bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg p-4">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div className="bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg p-4">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg p-4">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
