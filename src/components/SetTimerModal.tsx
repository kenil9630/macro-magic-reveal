
import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface SetTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetTimerModal: React.FC<SetTimerModalProps> = ({ isOpen, onClose }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Play notification sound (if available)
            try {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBTSHzfPVeSUFLYPS8dyKOwgYar7t');
              audio.play();
            } catch (e) {
              console.log('Audio notification not available');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 animate-bounce-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Custom Timer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-blue-600" />
          </button>
        </div>

        {/* Timer Display */}
        {timeLeft > 0 && (
          <div className="text-center mb-6">
            <div className="text-4xl font-mono font-bold text-blue-600 mb-4 animate-pulse-glow">
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={isRunning ? pauseTimer : () => setIsRunning(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Timer Setup */}
        {timeLeft === 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>

            {/* Quick presets */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => { setHours(0); setMinutes(5); setSeconds(0); }}
                className="p-3 bg-blue-100/50 text-blue-700 rounded-lg hover:bg-blue-200/50 transition-colors"
              >
                5 Minutes
              </button>
              <button
                onClick={() => { setHours(0); setMinutes(25); setSeconds(0); }}
                className="p-3 bg-blue-100/50 text-blue-700 rounded-lg hover:bg-blue-200/50 transition-colors"
              >
                25 Minutes
              </button>
              <button
                onClick={() => { setHours(1); setMinutes(0); setSeconds(0); }}
                className="p-3 bg-blue-100/50 text-blue-700 rounded-lg hover:bg-blue-200/50 transition-colors"
              >
                1 Hour
              </button>
              <button
                onClick={() => { setHours(2); setMinutes(0); setSeconds(0); }}
                className="p-3 bg-blue-100/50 text-blue-700 rounded-lg hover:bg-blue-200/50 transition-colors"
              >
                2 Hours
              </button>
            </div>

            <button
              onClick={startTimer}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium"
            >
              Start Timer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SetTimerModal;
