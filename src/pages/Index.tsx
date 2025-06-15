import React, { useState } from 'react';
import { Building, Laptop, Calendar, Clock, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import AiCartoon from '../components/AiCartoon';
import CodeWriter from '../components/CodeWriter';
import CountdownTimer from '../components/CountdownTimer';
import ExcelCells from '../components/ExcelCells';
import BreakTimer from '../components/BreakTimer';

const Index = () => {
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Background Elements */}
      <ExcelCells />
      
      {/* Navigation */}
      <Navbar onTimerClick={() => setIsTimerModalOpen(true)} />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* AI Character */}
            <div className="flex justify-center animate-slide-in-left">
              <AiCartoon />
            </div>
            
            {/* Central Content */}
            <div className="text-center space-y-8 animate-slide-in-top">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 bg-clip-text text-transparent leading-tight">
                  Let AI Write Your First Macro
                </h1>
                <p className="text-xl text-emerald-700 font-medium">
                  Automate, Impress & Save Hours—The AI Way!
                </p>
              </div>
              
              {/* Countdown Timer */}
              <div className="countdown">
                <CountdownTimer />
              </div>
              
              {/* Event Details */}
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in">
                <div className="flex items-center justify-center space-x-4 text-emerald-700">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>Reliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Laptop className="w-5 h-5" />
                    <span>MS Teams</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>June 20, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>3:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code Writer Section */}
            <div className="animate-slide-in-right code-writer">
              <CodeWriter />
            </div>
          </div>
        </section>
        
        {/* Additional Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-emerald-800">
              Master Excel VBA with AI Assistance
            </h2>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              Transform your Excel skills with AI-powered macro generation. Learn to automate 
              complex tasks, create dynamic reports, and impress your colleagues with 
              professional VBA solutions.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl text-white font-bold">AI</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800">AI-Powered</h3>
                <p className="text-emerald-700">
                  Let artificial intelligence write complex VBA macros for you instantly
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl text-white font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800">Lightning Fast</h3>
                <p className="text-emerald-700">
                  Generate professional macros in seconds, not hours of manual coding
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center space-y-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl text-white font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800">Production Ready</h3>
                <p className="text-emerald-700">
                  Enterprise-grade VBA code that's clean, documented, and reliable
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Break Timer Modal */}
      {isTimerModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setIsTimerModalOpen(false)}
              className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
            >
              <X className="w-5 h-5 text-emerald-600" />
            </button>
            <BreakTimer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
