'use client';


import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X  } from 'lucide-react';
import SmartCustomerService from './smart-customer-service';
import AutomatedScheduling from './automated-scheduling';
import BusinessIntelligence from './business-intelligence';

const Logo = () => (
  <div className="w-16 h-16 relative">
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="url(#redGradient)" 
          strokeWidth="4"
        />
        
        <g transform="translate(50, 50)">
          <line x1="-30" y1="0" x2="30" y2="0" stroke="#29B6F6" strokeWidth="2" />
          <line x1="0" y1="-30" x2="0" y2="30" stroke="#29B6F6" strokeWidth="2" />
          <line x1="-20" y1="-20" x2="20" y2="20" stroke="#29B6F6" strokeWidth="2" />
          <line x1="-20" y1="20" x2="20" y2="-20" stroke="#29B6F6" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const x = Math.cos(angle * Math.PI / 180) * 30;
            const y = Math.sin(angle * Math.PI / 180) * 30;
            return (
              <circle 
                key={angle} 
                cx={x} 
                cy={y} 
                r="2" 
                fill="#29B6F6"
              />
            );
          })}
        </g>
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF3B30" />
            <stop offset="100%" stopColor="#FF453A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-black bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
            <Logo />
            <span className="text-white text-xl font-medium">Neuroxion AI</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#customer-service" className="text-gray-400 hover:text-white transition-colors">Smart Assistant</a>
            <a href="#scheduling" className="text-gray-400 hover:text-white transition-colors">Automation</a>
            <a href="#analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Intelligence</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop CTA Button */}
          <button className="hidden md:block bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 border-b border-gray-900">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#customer-service" className="text-gray-400 hover:text-white transition-colors">Smart Assistant</a>
              <a href="#scheduling" className="text-gray-400 hover:text-white transition-colors">Automation</a>
              <a href="#analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Intelligence</a>
              <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};


const Hero = () => (
  <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
          The Future of 
          <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"> Business AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed">
          Revolutionizing small business operations with intelligent automation and personalized AI assistance.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <div id="features">
    {/* Smart Customer Service Section */}
    <div id="customer-service" className="py-24 bg-[#0A0A0A]"></div>
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Smart Assistant</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered responses across WhatsApp, Instagram, and SMS. Handle customer inquiries 24/7 with intelligent automation.
          </p>
        </div>
        <SmartCustomerService />
      </div>
    </div>

    {/* Automated Scheduling Section */}
    <div id="scheduling" className="py-24 bg-[#111]"></div>
    <div className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Schedule Automation</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Seamlessly manage appointments and bookings with AI that understands your business context.
          </p>
        </div>
        <AutomatedScheduling />
      </div>
    </div>

    {/* Business Intelligence Section */}
    <div id="analytics" className="py-24 bg-[#0A0A0A]"></div>
    <div className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Data Intelligence</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get actionable insights from your data with AI-powered machine learning and data analytics that help you make better business decisions.
          </p>
        </div>
        <BusinessIntelligence />
      </div>
    </div>
    
  </div>
);

const CTA = () => (
  <section className="bg-[#0D0D0D] py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 opacity-10"></div>
    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Business?</h2>
      <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
        Start Free Trial
      </button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-12 border-t border-gray-900">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex items-center space-x-4">
          <Logo />
          <span className="text-xl font-medium">Neuroxion AI</span>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Features</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">Smart Assistant</li>
            <li className="hover:text-white transition-colors cursor-pointer">Automation</li>
            <li className="hover:text-white transition-colors cursor-pointer">Analytics</li>
            <li className="hover:text-white transition-colors cursor-pointer">Integrations</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">About</li>
            <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>info@neuroxion.com</li>
            <li>Toronto, Canada</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-900 mt-12 pt-8 text-center text-sm text-gray-400">
      © 2025 Neuroxion AI. All rights reserved.
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};


export default App;