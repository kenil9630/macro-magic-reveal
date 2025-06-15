
import React, { useState } from 'react';
import { Building, Laptop, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import AiCartoon from '../components/AiCartoon';
import CodeWriter from '../components/CodeWriter';
import CountdownTimer from '../components/CountdownTimer';
import ExcelCells from '../components/ExcelCells';
import SetTimerModal from '../components/SetTimerModal';

const Index = () => {
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <ExcelCells />
      
      {/* Navigation */}
      <Navbar onTimerClick={() => setIsTimerModalOpen(true)} />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* AI Character */}
            <div className="flex justify-center animate-slide-in-left">
              <AiCartoon />
            </div>
            
            {/* Central Content */}
            <div className="text-center space-y-8 animate-slide-in-top">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
                  Let AI Write Your First Macro
                </h1>
                <p className="text-xl text-blue-600 font-medium">
                  Automate, Impress & Save Hours—The AI Way!
                </p>
              </div>
              
              {/* Countdown Timer */}
              <CountdownTimer />
              
              {/* Event Details */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Event Details</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Location</div>
                      <div className="text-xs text-blue-500">Reliance</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Laptop className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Platform</div>
                      <div className="text-xs text-blue-500">MS Teams</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Date</div>
                      <div className="text-xs text-blue-500">Fri, 20 June 2025</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Time</div>
                      <div className="text-xs text-blue-500">3:00 PM - 5:00 PM IST</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code Writer Section */}
            <div className="animate-slide-in-right">
              <CodeWriter />
            </div>
          </div>
        </section>
        
        {/* Additional Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-blue-700">
              Master Excel VBA with AI Assistance
            </h2>
            <p className="text-lg text-blue-600 max-w-3xl mx-auto">
              Transform your Excel skills with AI-powered macro generation. Learn to automate 
              complex tasks, create dynamic reports, and impress your colleagues with 
              professional VBA solutions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-white font-bold">AI</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-700">AI-Powered</h3>
                <p className="text-blue-600">
                  Let artificial intelligence write complex VBA macros for you instantly
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-white font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-700">Lightning Fast</h3>
                <p className="text-blue-600">
                  Generate professional macros in seconds, not hours of manual coding
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-white font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-700">Production Ready</h3>
                <p className="text-blue-600">
                  Enterprise-grade VBA code that's clean, documented, and reliable
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Timer Modal */}
      <SetTimerModal 
        isOpen={isTimerModalOpen} 
        onClose={() => setIsTimerModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
