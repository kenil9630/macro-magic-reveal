
import React, { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const AiCartoon: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [speechText, setSpeechText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  const responses = {
    timer: "Let me help you track time! Click the timer to set a custom countdown. Perfect for Pomodoro sessions!",
    music: "Need some focus music? I've got 3 great tracks to keep you motivated while coding!",
    countdown: "Only a few days left! This Excel VBA training will transform how you work with spreadsheets forever!",
    codewriter: "Watch me write VBA code! I cycle through 10 powerful examples - from data cleanup to automated reports!",
    title: "AI-powered macro generation! I can write complex VBA code in seconds. No more manual coding headaches!",
    details: "Join us at Reliance via MS Teams! I'll teach you to automate Excel like a pro. Save hours every day!",
    default: "Hi there! I'm your AI assistant. Hover over different elements and I'll tell you more about them!"
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (characterRef.current) {
        const rect = characterRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / 20,
          y: (e.clientY - centerY) / 20
        });
      }
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let message = responses.default;

      // Check for specific elements or classes
      if (target.closest('[aria-label="Open Timer"]') || target.closest('button[aria-label="Open Timer"]')) {
        message = responses.timer;
      } else if (target.closest('.music-dropdown') || target.textContent?.includes('Music')) {
        message = responses.music;
      } else if (target.closest('.countdown') || target.textContent?.includes('Event Starts')) {
        message = responses.countdown;
      } else if (target.closest('.code-writer') || target.textContent?.includes('VBA') || target.textContent?.includes('Sub ')) {
        message = responses.codewriter;
      } else if (target.closest('h1') && target.textContent?.includes('AI Write')) {
        message = responses.title;
      } else if (target.closest('.event-details') || target.textContent?.includes('Reliance') || target.textContent?.includes('Teams')) {
        message = responses.details;
      }

      if (message !== responses.default) {
        showSpeech(message);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, []);

  const showSpeech = (text: string) => {
    setSpeechText(text);
    setIsVisible(true);
    setIsTalking(true);
    
    setTimeout(() => {
      setIsTalking(false);
    }, 500);

    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  const eyeTransform = `translate(${mousePosition.x * 0.5}, ${mousePosition.y * 0.3})`;

  return (
    <div ref={characterRef} className="relative animate-float">
      {/* Speech Bubble */}
      <div 
        className={`speech-bubble ${isVisible ? 'visible' : ''}`}
        style={{
          top: '-80px',
          left: '50%',
        }}
      >
        {speechText}
      </div>

      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
      >
        {/* Robot Body */}
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#217346" />
            <stop offset="100%" stopColor="#70ad47" />
          </linearGradient>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e5c2f" />
            <stop offset="100%" stopColor="#217346" />
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
          className={isTalking ? 'animate-talk' : ''}
        />
        
        {/* Eyes */}
        <circle cx="85" cy="60" r="6" fill="#fff" />
        <circle cx="115" cy="60" r="6" fill="#fff" />
        <circle 
          cx="85" 
          cy="60" 
          r="3" 
          fill="#0e5c2f" 
          className="animate-blink"
          transform={eyeTransform}
        />
        <circle 
          cx="115" 
          cy="60" 
          r="3" 
          fill="#0e5c2f" 
          className="animate-blink"
          transform={eyeTransform}
        />
        
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
        <text x="100" y="108" textAnchor="middle" fontSize="8" fill="#70ad47" fontFamily="monospace">
          VBA
        </text>
        <text x="100" y="118" textAnchor="middle" fontSize="6" fill="#70ad47" fontFamily="monospace">
          READY
        </text>
        
        {/* Arms */}
        <rect 
          x="45" 
          y="90" 
          width="15" 
          height="40" 
          rx="7" 
          fill="url(#robotGradient)"
          className={isTalking ? 'animate-wiggle' : ''}
          style={{ transformOrigin: '52px 90px' }}
        />
        <rect 
          x="140" 
          y="90" 
          width="15" 
          height="40" 
          rx="7" 
          fill="url(#robotGradient)"
          className={isTalking ? 'animate-wiggle' : ''}
          style={{ transformOrigin: '148px 90px', animationDelay: '0.1s' }}
        />
        
        {/* Hands */}
        <circle cx="52" cy="135" r="8" fill="url(#robotGradient)" />
        <circle cx="148" cy="135" r="8" fill="url(#robotGradient)" />
        
        {/* Legs */}
        <rect x="75" y="170" width="12" height="25" rx="6" fill="url(#robotGradient)" />
        <rect x="113" y="170" width="12" height="25" rx="6" fill="url(#robotGradient)" />
        
        {/* Antenna */}
        <line x1="100" y1="40" x2="100" y2="25" stroke="#217346" strokeWidth="2" />
        <circle cx="100" cy="25" r="4" fill="#70ad47" className="animate-sparkle" />
        
        {/* Sparkles around robot */}
        <circle cx="45" cy="55" r="2" fill="#70ad47" className="animate-sparkle" />
        <circle cx="155" cy="70" r="2" fill="#217346" className="animate-sparkle" />
        <circle cx="50" cy="160" r="2" fill="#70ad47" className="animate-sparkle" />
        <circle cx="150" cy="180" r="2" fill="#217346" className="animate-sparkle" />
      </svg>
    </div>
  );
};

export default AiCartoon;
