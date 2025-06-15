
import React from 'react';

const AiCartoon: React.FC = () => {
  return (
    <div className="animate-float">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
      >
        {/* Robot Body */}
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        
        {/* Main Body */}
        <rect
          x="60"
          y="80"
          width="80"
          height="90"
          rx="15"
          fill="url(#robotGradient)"
          className="animate-pulse-glow"
        />
        
        {/* Head */}
        <rect
          x="70"
          y="40"
          width="60"
          height="50"
          rx="20"
          fill="url(#robotGradient)"
        />
        
        {/* Eyes */}
        <circle cx="85" cy="60" r="6" fill="#fff" />
        <circle cx="115" cy="60" r="6" fill="#fff" />
        <circle cx="85" cy="60" r="3" fill="#1e40af" className="animate-blink" />
        <circle cx="115" cy="60" r="3" fill="#1e40af" className="animate-blink" />
        
        {/* Screen on chest */}
        <rect
          x="75"
          y="95"
          width="50"
          height="30"
          rx="5"
          fill="url(#screenGradient)"
        />
        
        {/* Screen content - VBA text */}
        <text x="100" y="108" textAnchor="middle" fontSize="8" fill="#06b6d4" fontFamily="monospace">
          VBA
        </text>
        <text x="100" y="118" textAnchor="middle" fontSize="6" fill="#06b6d4" fontFamily="monospace">
          READY
        </text>
        
        {/* Arms */}
        <rect x="45" y="90" width="15" height="40" rx="7" fill="url(#robotGradient)" />
        <rect x="140" y="90" width="15" height="40" rx="7" fill="url(#robotGradient)" />
        
        {/* Hands */}
        <circle cx="52" cy="135" r="8" fill="url(#robotGradient)" />
        <circle cx="148" cy="135" r="8" fill="url(#robotGradient)" />
        
        {/* Legs */}
        <rect x="75" y="170" width="12" height="25" rx="6" fill="url(#robotGradient)" />
        <rect x="113" y="170" width="12" height="25" rx="6" fill="url(#robotGradient)" />
        
        {/* Antenna */}
        <line x1="100" y1="40" x2="100" y2="25" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="100" cy="25" r="4" fill="#06b6d4" className="animate-sparkle" />
        
        {/* Sparkles around robot */}
        <circle cx="45" cy="55" r="2" fill="#06b6d4" className="animate-sparkle" />
        <circle cx="155" cy="70" r="2" fill="#3b82f6" className="animate-sparkle" />
        <circle cx="50" cy="160" r="2" fill="#06b6d4" className="animate-sparkle" />
        <circle cx="150" cy="180" r="2" fill="#3b82f6" className="animate-sparkle" />
      </svg>
    </div>
  );
};

export default AiCartoon;
