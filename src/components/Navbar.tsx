
import React from 'react';
import { Timer } from 'lucide-react';
import MusicDropdown from './MusicDropdown';

interface NavbarProps {
  onTimerClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTimerClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 animate-slide-in-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-green-700 tracking-tight">
              Excel Macro Magic
            </h1>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <MusicDropdown />
            <button
              onClick={onTimerClick}
              className="p-2 rounded-lg glass-card hover:bg-white/20 transition-all duration-300 animate-pulse-glow"
              aria-label="Open Timer"
            >
              <Timer className="w-5 h-5 text-green-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
