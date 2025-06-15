import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const tracks = [
  { name: 'Health Theme', url: '/audio/health-theme.mp3' },
  { name: 'Upbeat Corporate', url: '/audio/upbeat-corporate.mp3' },
  { name: 'Sweet Dreams', url: '/audio/sweet-dreams.mp3' }
];

const MusicDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = async (track: typeof tracks[0]) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      
      try {
        await audio.play();
        audioRef.current = audio;
        setCurrentTrack(track);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        // Fallback: Try to play on next user interaction
        document.addEventListener('click', () => {
          audio.play().catch(console.error);
        }, { once: true });
      }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) {
      await playTrack(currentTrack);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-emerald-600" />
          ) : (
            <Volume2 className="w-5 h-5 text-emerald-600" />
          )}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          <Music className="w-5 h-5" />
          <span>Music</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-emerald-100 p-4 z-50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-800">
                {currentTrack.name}
              </span>
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Play className="w-4 h-4 text-emerald-600" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              {tracks.map((track) => (
                <button
                  key={track.name}
                  onClick={() => playTrack(track)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentTrack.name === track.name
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'hover:bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {track.name}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-emerald-100">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDropdown;
