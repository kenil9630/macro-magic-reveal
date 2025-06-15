
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
  const [currentAnimation, setCurrentAnimation] = useState('float');
  const [currentEmotion, setCurrentEmotion] = useState('happy');
  const [isBlinking, setIsBlinking] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  const responses = {
    timer: "Set custom timers for focused work sessions! Perfect for Pomodoro technique while learning VBA!",
    music: "Boost your productivity with ambient corporate tracks! Music helps you focus while coding.",
    countdown: "Join us in just a few days! This comprehensive VBA training will revolutionize your Excel workflow!",
    codewriter: "Watch me demonstrate 10 powerful VBA macros! From data cleanup to automated reports - I'll show you everything!",
    title: "AI-powered VBA generation at your fingertips! No more manual coding headaches or syntax errors!",
    details: "Virtual training via MS Teams at Reliance! Learn to automate Excel tasks and save hours every day!",
    platforms: "Explore other AI assistants! Each has unique strengths for different coding and productivity tasks.",
    default: "Hi! I'm your VBA learning companion. Hover over elements to discover more about this amazing training!"
  };

  const aiPlatforms = [
    { name: 'ChatGPT', url: 'https://chat.openai.com', color: '#10a37f' },
    { name: 'Claude', url: 'https://claude.ai', color: '#cc785c' },
    { name: 'Gemini', url: 'https://gemini.google.com', color: '#4285f4' },
    { name: 'DeepSeek', url: 'https://chat.deepseek.com', color: '#6366f1' },
    { name: 'Grok', url: 'https://grok.x.ai', color: '#1da1f2' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai', color: '#20b2aa' }
  ];

  const animations = ['float', 'spin', 'jump', 'think', 'wave'];
  const emotions = ['happy', 'excited', 'thinking', 'winking'];

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
      let emotion = 'happy';

      if (target.closest('[aria-label="Open Timer"]') || target.closest('button[aria-label="Open Timer"]')) {
        message = responses.timer;
        emotion = 'excited';
      } else if (target.closest('.music-dropdown') || target.textContent?.includes('Music')) {
        message = responses.music;
        emotion = 'happy';
      } else if (target.closest('.countdown') || target.textContent?.includes('Event Starts')) {
        message = responses.countdown;
        emotion = 'excited';
      } else if (target.closest('.code-writer') || target.textContent?.includes('VBA') || target.textContent?.includes('Sub ')) {
        message = responses.codewriter;
        emotion = 'thinking';
      } else if (target.closest('h1') && target.textContent?.includes('AI Write')) {
        message = responses.title;
        emotion = 'winking';
      } else if (target.closest('.event-details') || target.textContent?.includes('Reliance') || target.textContent?.includes('Teams')) {
        message = responses.details;
        emotion = 'happy';
      } else if (target.closest('.ai-platforms')) {
        message = responses.platforms;
        emotion = 'thinking';
      }

      if (message !== responses.default) {
        showSpeech(message, emotion);
      }
    };

    // Random animation changes
    const animationInterval = setInterval(() => {
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      setCurrentAnimation(randomAnimation);
      
      setTimeout(() => {
        setCurrentAnimation('float');
      }, 2000);
    }, 8000);

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      clearInterval(animationInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  const showSpeech = (text: string, emotion: string = 'happy') => {
    setSpeechText(text);
    setCurrentEmotion(emotion);
    setIsVisible(true);
    setIsTalking(true);
    
    setTimeout(() => {
      setIsTalking(false);
    }, 600);

    setTimeout(() => {
      setIsVisible(false);
      setCurrentEmotion('happy');
    }, 4500);
  };

  const eyeTransform = `translate(${Math.max(-3, Math.min(3, mousePosition.x * 0.2))}, ${Math.max(-2, Math.min(2, mousePosition.y * 0.15))})`;

  const getEyeExpression = () => {
    if (isBlinking) return { leftEye: 2, rightEye: 2 };
    
    switch (currentEmotion) {
      case 'excited':
        return { leftEye: 14, rightEye: 14 };
      case 'thinking':
        return { leftEye: 10, rightEye: 8 };
      case 'winking':
        return { leftEye: 10, rightEye: 2 };
      default:
        return { leftEye: 10, rightEye: 10 };
    }
  };

  const getMouthExpression = () => {
    switch (currentEmotion) {
      case 'excited':
        return "M 90 80 Q 110 95 130 80";
      case 'thinking':
        return "M 105 85 Q 110 82 115 85";
      case 'winking':
        return "M 95 80 Q 110 90 125 80";
      default:
        return "M 95 80 Q 110 90 125 80";
    }
  };

  const eyeExpression = getEyeExpression();

  return (
    <div className="flex flex-col items-center space-y-6 relative">
      <div ref={characterRef} className={`relative animate-${currentAnimation}`} style={{ paddingTop: '60px' }}>
        {/* Speech Bubble - positioned well above the character */}
        <div 
          className={`speech-bubble-top ${isVisible ? 'visible' : ''}`}
          style={{ top: '-200px', zIndex: 1 }}
        >
          {speechText}
        </div>

        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="drop-shadow-2xl relative z-10"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="50%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dcfce7" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
            <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="cheekGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#059669" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Main Body - more rounded and cute */}
          <ellipse
            cx="120"
            cy="140"
            rx="45"
            ry="55"
            fill="url(#bodyGradient)"
            className="animate-pulse-glow"
            filter="url(#softShadow)"
          />
          
          {/* Head - larger and rounder */}
          <circle
            cx="120"
            cy="80"
            r="45"
            fill="url(#headGradient)"
            className={isTalking ? 'animate-talk' : ''}
            filter="url(#softShadow)"
          />
          
          {/* Cute cheeks */}
          <circle cx="85" cy="85" r="8" fill="url(#cheekGradient)" opacity="0.6" />
          <circle cx="155" cy="85" r="8" fill="url(#cheekGradient)" opacity="0.6" />
          
          {/* Eyes - larger and more expressive */}
          <ellipse cx="100" cy="70" rx="12" ry="15" fill="#ffffff" />
          <ellipse cx="140" cy="70" rx="12" ry="15" fill="#ffffff" />
          
          {/* Eye pupils */}
          <circle 
            cx="100" 
            cy="70" 
            r={eyeExpression.leftEye} 
            fill="url(#eyeGradient)" 
            transform={eyeTransform}
          />
          <circle 
            cx="140" 
            cy="70" 
            r={eyeExpression.rightEye} 
            fill="url(#eyeGradient)" 
            transform={eyeTransform}
          />
          
          {/* Eye highlights - bigger and cuter */}
          <circle cx="98" cy="66" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="138" cy="66" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="102" cy="68" r="1.5" fill="#ffffff" opacity="0.7" />
          <circle cx="142" cy="68" r="1.5" fill="#ffffff" opacity="0.7" />
          
          {/* Eyebrows - cute and expressive */}
          <path d="M 88 55 Q 100 50 112 55" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 128 55 Q 140 50 152 55" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" fill="none" />
          
          {/* Nose - small and cute */}
          <circle cx="120" cy="82" r="2" fill="#f87171" opacity="0.8" />
          
          {/* Mouth - more expressive */}
          <path 
            d={getMouthExpression()}
            stroke="#374151" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
            className={isTalking ? 'animate-talk' : ''}
          />
          
          {/* Cute little arms */}
          <ellipse 
            cx="70" 
            cy="120" 
            rx="12" 
            ry="30" 
            fill="url(#bodyGradient)"
            className={isTalking ? 'animate-wiggle' : currentAnimation === 'wave' ? 'animate-wave' : ''}
            style={{ transformOrigin: '70px 90px' }}
            filter="url(#softShadow)"
          />
          <ellipse 
            cx="170" 
            cy="120" 
            rx="12" 
            ry="30" 
            fill="url(#bodyGradient)"
            className={isTalking ? 'animate-wiggle' : currentAnimation === 'wave' ? 'animate-wave' : ''}
            style={{ transformOrigin: '170px 90px', animationDelay: '0.1s' }}
            filter="url(#softShadow)"
          />
          
          {/* Cute hands */}
          <circle cx="70" cy="155" r="12" fill="url(#bodyGradient)" filter="url(#softShadow)" />
          <circle cx="170" cy="155" r="12" fill="url(#bodyGradient)" filter="url(#softShadow)" />
          
          {/* Little legs */}
          <ellipse cx="105" cy="200" rx="10" ry="20" fill="url(#bodyGradient)" filter="url(#softShadow)" />
          <ellipse cx="135" cy="200" rx="10" ry="20" fill="url(#bodyGradient)" filter="url(#softShadow)" />
          
          {/* Cute feet */}
          <ellipse cx="105" cy="225" rx="8" ry="6" fill="#4ade80" />
          <ellipse cx="135" cy="225" rx="8" ry="6" fill="#4ade80" />
          
          {/* Cute little hat */}
          <ellipse cx="120" cy="35" rx="35" ry="8" fill="#059669" />
          <circle cx="120" cy="25" r="20" fill="#10b981" filter="url(#softShadow)" />
          <circle cx="120" cy="15" r="6" fill="#fbbf24" className="animate-sparkle" />
          
          {/* Thinking bubbles for thinking emotion */}
          {currentEmotion === 'thinking' && (
            <>
              <circle cx="170" cy="50" r="4" fill="#a7f3d0" className="animate-float" opacity="0.8" />
              <circle cx="185" cy="35" r="3" fill="#6ee7b7" className="animate-float" opacity="0.6" style={{ animationDelay: '0.5s' }} />
              <circle cx="195" cy="20" r="2" fill="#34d399" className="animate-float" opacity="0.4" style={{ animationDelay: '1s' }} />
            </>
          )}
          
          {/* Heart when excited */}
          {currentEmotion === 'excited' && (
            <path 
              d="M 180 60 C 180 55, 190 55, 190 65 C 190 55, 200 55, 200 60 C 200 70, 190 80, 190 80 C 190 80, 180 70, 180 60 Z" 
              fill="#f87171" 
              className="animate-bounce-in"
              opacity="0.8"
            />
          )}
          
          {/* Sparkles around character */}
          <circle cx="50" cy="60" r="2" fill="#fbbf24" className="animate-sparkle" />
          <circle cx="190" cy="80" r="2" fill="#10b981" className="animate-sparkle" />
          <circle cx="40" cy="180" r="2" fill="#fbbf24" className="animate-sparkle" />
          <circle cx="200" cy="200" r="2" fill="#10b981" className="animate-sparkle" />
          <circle cx="210" cy="130" r="2" fill="#fbbf24" className="animate-sparkle" />
          <circle cx="30" cy="140" r="2" fill="#10b981" className="animate-sparkle" />
          
          {/* Breathing effect */}
          <circle 
            cx="120" 
            cy="140" 
            r="3" 
            fill="#4ade80" 
            opacity="0.4" 
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* AI Platform Links */}
      <div className="ai-platforms grid grid-cols-3 gap-2 mt-4">
        {aiPlatforms.map((platform, index) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-platform-link"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              borderColor: `${platform.color}20`
            }}
            onMouseEnter={() => showSpeech(`Explore ${platform.name} for AI assistance! Each platform offers unique capabilities for coding and productivity.`)}
          >
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default AiCartoon;
