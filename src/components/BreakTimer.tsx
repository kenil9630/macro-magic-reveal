import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const BreakTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(5); // Default 5 minutes
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const durations = [5, 10, 15, 20, 30]; // Available break durations in minutes

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (isRunning) return;

    if (timeLeft === 0) {
      setTimeLeft(selectedDuration * 60);
    }

    setIsRunning(true);
    setIsComplete(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeLeft(selectedDuration * 60);
    setIsRunning(false);
    setIsComplete(false);
  };

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration * 60);
    setIsRunning(false);
    setIsComplete(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl p-8 shadow-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100 via-white to-green-100"
      style={{ minWidth: '340px', maxWidth: '95vw' }}>
      <div className="relative z-10 text-center mb-6">
        <h2 className="text-3xl font-bold text-emerald-800 mb-2 drop-shadow-lg">Break Timer</h2>
        <p className="text-emerald-700 font-medium">Take a well-deserved break!</p>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <div className={`text-7xl font-extrabold text-center transition-all duration-300 drop-shadow-xl ${
          isComplete ? 'text-emerald-500' : 'text-emerald-700'
        }`}>
          {formatTime(timeLeft)}
        </div>
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-emerald-500 animate-bounce">
              Break Complete!
            </div>
          </div>
        )}
      </div>

      {/* Duration Selection */}
      <div className="flex justify-center gap-2 mb-6">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => handleDurationChange(duration)}
            className={`px-4 py-2 rounded-full text-base font-semibold transition-all shadow-md ${
              selectedDuration === duration
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {duration}m
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-2">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="flex items-center gap-2 px-7 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg text-lg font-semibold"
          >
            <Play className="w-6 h-6" />
            <span>Start Break</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex items-center gap-2 px-7 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg text-lg font-semibold"
          >
            <Pause className="w-6 h-6" />
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-7 py-3 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors shadow text-lg font-semibold"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="h-3 bg-emerald-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300 transition-all duration-1000 ease-linear"
            style={{
              width: `${((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BreakTimer; 