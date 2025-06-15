
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
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    
    console.log('Loading track:', tracks[index].name);

    audio.addEventListener('loadstart', () => {
      console.log('Starting to load audio...');
    });

    audio.addEventListener('canplay', () => {
      console.log('Audio can play');
      // Enable autoplay by immediately playing when audio is ready
      audio.play().then(() => {
        setCurrentTrack(index);
        setIsPlaying(true);
        setIsOpen(false);
        console.log('Audio started playing');
      }).catch((error) => {
        console.error('Autoplay prevented:', error);
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

    // Set volume and load
    audio.volume = 0.7;
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
    <div className="relative music-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg glass-card hover:bg-white/30 transition-all duration-300"
        aria-label="Music Player"
      >
        <Volume2 className="w-4 h-4 text-emerald-600" />
        <span className="text-sm text-emerald-700 hidden sm:block font-medium">Music</span>
        <ChevronDown className={`w-4 h-4 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl shadow-xl animate-bounce-in">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-emerald-700 mb-3">Focus Music</h3>
            
            {/* Current playing track */}
            {currentTrack !== null && (
              <div className="mb-4 p-3 glass-dark rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-800">
                    Now Playing: {tracks[currentTrack].name}
                  </span>
                  <button
                    onClick={togglePlayPause}
                    className="p-1 rounded-full hover:bg-emerald-100/50 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Play className="w-4 h-4 text-emerald-700" />
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
                    currentTrack === index ? 'glass-dark border border-emerald-300/50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-800 font-medium">{track.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Random play button */}
            <button
              onClick={playRandomTrack}
              className="w-full mt-4 p-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-medium shadow-lg"
            >
              🎵 Play Random Track
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDropdown;
