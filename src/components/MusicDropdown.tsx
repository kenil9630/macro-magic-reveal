
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ChevronDown } from 'lucide-react';

const MusicDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tracks = [
    {
      name: "Upbeat Corporate",
      url: "https://www.chosic.com/wp-content/uploads/2021/04/Wavecont-Upbeat-Inspiring-Corporate-Full-Length(chosic.com).mp3"
    },
    {
      name: "Sweet Dreams",
      url: "https://www.chosic.com/wp-content/uploads/2020/11/batchbug-sweet-dreams(chosic.com).mp3"
    },
    {
      name: "Health Theme",
      url: "https://www.chosic.com/wp-content/uploads/2024/07/Health-chosic.com_.mp3"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const playTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(tracks[index].url);
    audioRef.current = audio;
    
    audio.addEventListener('loadstart', () => {
      console.log('Starting to load audio...');
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Audio can play through');
      audio.play().then(() => {
        setCurrentTrack(index);
        setIsPlaying(true);
        setIsOpen(false);
      }).catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    });

    audio.load();
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const playRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    playTrack(randomIndex);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg glass-card hover:bg-white/20 transition-all duration-300"
        aria-label="Music Player"
      >
        <Volume2 className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-blue-600 hidden sm:block">Music</span>
        <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-card rounded-lg shadow-lg animate-bounce-in">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Corporate Tracks</h3>
            
            {/* Current playing track */}
            {currentTrack !== null && (
              <div className="mb-4 p-3 bg-blue-50/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700">
                    Now Playing: {tracks[currentTrack].name}
                  </span>
                  <button
                    onClick={togglePlayPause}
                    className="p-1 rounded-full hover:bg-blue-100/50 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Play className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Track list */}
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => playTrack(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 hover:bg-white/20 ${
                    currentTrack === index ? 'bg-blue-50/30 border border-blue-200/50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-700">{track.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Random play button */}
            <button
              onClick={playRandomTrack}
              className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium"
            >
              Play Random Track
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDropdown;
