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
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
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
          x: (e.clientX - centerX) / 15,
          y: (e.clientY - centerY) / 15
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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      clearInterval(animationInterval);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, []);

  const showSpeech = (text: string, emotion: string = 'happy') => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    setSpeechText(text);
    setCurrentEmotion(emotion);
    setIsVisible(true);
    setIsTalking(true);
    
    // Stop talking animation after 600ms
    setTimeout(() => {
      setIsTalking(false);
    }, 600);

    // Set a new timeout to hide the speech bubble
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setCurrentEmotion('happy');
    }, 5000); // Increased from 8000 to 5000 for better responsiveness

    setHoverTimeout(timeout);
  };

  const eyeTransform = `translate(${Math.max(-2, Math.min(2, mousePosition.x * 0.3))}, ${Math.max(-1, Math.min(1, mousePosition.y * 0.2))})`;

  const getEyeExpression = () => {
    switch (currentEmotion) {
      case 'excited':
        return { leftEye: 12, rightEye: 12 };
      case 'thinking':
        return { leftEye: 8, rightEye: 6 };
      case 'winking':
        return { leftEye: 8, rightEye: 0 };
      default:
        return { leftEye: 8, rightEye: 8 };
    }
  };

  const getMouthExpression = () => {
    switch (currentEmotion) {
      case 'excited':
        return "M 95 75 Q 110 85 125 75";
      case 'thinking':
        return "M 105 78 L 115 78";
      case 'winking':
        return "M 100 75 Q 110 82 120 75";
      default:
        return "M 100 75 Q 110 82 120 75";
    }
  };

  const eyeExpression = getEyeExpression();

  return (
    <div className="flex flex-col items-start space-y-8 relative mt-48 ml-8 w-full">
      <div ref={characterRef} className={`relative animate-${currentAnimation} mb-4 w-full`}>
        {/* Speech Bubble - positioned above the character */}
        <div 
          className={`speech-bubble-top ${isVisible ? 'visible' : ''}`}
          style={{ width: '100%' }}
        >
          {speechText}
        </div>

        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="drop-shadow-2xl relative z-20"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Body */}
          <rect
            x="70"
            y="90"
            width="80"
            height="95"
            rx="20"
            fill="url(#bodyGradient)"
            className="animate-pulse-glow"
            filter="url(#glow)"
          />
          
          {/* Head */}
          <circle
            cx="110"
            cy="65"
            r="35"
            fill="url(#headGradient)"
            className={isTalking ? 'animate-talk' : ''}
            filter="url(#glow)"
          />
          
          {/* Eyes */}
          <circle cx="95" cy="60" r="8" fill="#fff" />
          <circle cx="125" cy="60" r="8" fill="#fff" />
          <circle 
            cx="95" 
            cy="60" 
            r={eyeExpression.leftEye} 
            fill="#064e3b" 
            className="animate-blink"
            transform={eyeTransform}
          />
          <circle 
            cx="125" 
            cy="60" 
            r={eyeExpression.rightEye} 
            fill="#064e3b" 
            className="animate-blink"
            transform={eyeTransform}
          />
          
          {/* Eye highlights */}
          <circle cx="96" cy="58" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="126" cy="58" r="1.5" fill="#fff" opacity="0.8" />
          
          {/* Mouth */}
          <path 
            d={getMouthExpression()}
            stroke="#064e3b" 
            strokeWidth="2" 
            fill="none"
            className={isTalking ? 'animate-talk' : ''}
          />
          
          {/* Screen on chest */}
          <rect
            x="85"
            y="105"
            width="50"
            height="35"
            rx="8"
            fill="url(#screenGradient)"
            filter="url(#glow)"
          />
          
          {/* Screen content */}
          <text x="110" y="118" textAnchor="middle" fontSize="10" fill="#10b981" fontFamily="monospace" fontWeight="bold">
            VBA
          </text>
          <text x="110" y="130" textAnchor="middle" fontSize="7" fill="#6ee7b7" fontFamily="monospace">
            ASSISTANT
          </text>
          
          {/* Arms */}
          <ellipse 
            cx="55" 
            cy="115" 
            rx="8" 
            ry="25" 
            fill="url(#bodyGradient)"
            className={isTalking ? 'animate-wiggle' : currentAnimation === 'wave' ? 'animate-wave' : ''}
            style={{ transformOrigin: '55px 90px' }}
          />
          <ellipse 
            cx="165" 
            cy="115" 
            rx="8" 
            ry="25" 
            fill="url(#bodyGradient)"
            className={isTalking ? 'animate-wiggle' : currentAnimation === 'wave' ? 'animate-wave' : ''}
            style={{ transformOrigin: '165px 90px', animationDelay: '0.1s' }}
          />
          
          {/* Hands */}
          <circle cx="55" cy="145" r="10" fill="url(#bodyGradient)" />
          <circle cx="165" cy="145" r="10" fill="url(#bodyGradient)" />
          
          {/* Legs */}
          <rect x="85" y="185" width="15" height="30" rx="7" fill="url(#bodyGradient)" />
          <rect x="115" y="185" width="15" height="30" rx="7" fill="url(#bodyGradient)" />
          
          {/* Antenna */}
          <line x1="110" y1="30" x2="110" y2="15" stroke="#059669" strokeWidth="3" />
          <circle cx="110" cy="12" r="5" fill="#10b981" className="animate-sparkle" filter="url(#glow)" />
          
          {/* Thinking bubbles for thinking emotion */}
          {currentEmotion === 'thinking' && (
            <>
              <circle cx="140" cy="40" r="3" fill="#6ee7b7" className="animate-float" opacity="0.7" />
              <circle cx="150" cy="30" r="2" fill="#10b981" className="animate-float" opacity="0.5" style={{ animationDelay: '0.5s' }} />
              <circle cx="155" cy="20" r="1.5" fill="#6ee7b7" className="animate-float" opacity="0.3" style={{ animationDelay: '1s' }} />
            </>
          )}
          
          {/* Sparkles around robot */}
          <circle cx="50" cy="50" r="2" fill="#6ee7b7" className="animate-sparkle" />
          <circle cx="170" cy="70" r="2" fill="#10b981" className="animate-sparkle" />
          <circle cx="45" cy="170" r="2" fill="#6ee7b7" className="animate-sparkle" />
          <circle cx="175" cy="190" r="2" fill="#10b981" className="animate-sparkle" />
          <circle cx="200" cy="120" r="2" fill="#6ee7b7" className="animate-sparkle" />
          <circle cx="20" cy="130" r="2" fill="#10b981" className="animate-sparkle" />
        </svg>
      </div>

      {/* AI Platform Links */}
      <div className="ai-platforms grid grid-cols-3 gap-3 mt-8">
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
