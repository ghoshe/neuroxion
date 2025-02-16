import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, Globe, CheckCircle2 } from 'lucide-react';

const ChatMessage = ({ message, type }) => (
  <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`rounded-2xl px-4 py-2 max-w-xs ${
      type === 'user' 
        ? 'bg-blue-500 text-white rounded-tr-none' 
        : 'bg-gray-800 text-white rounded-tl-none'
    }`}>
      {message}
    </div>
  </div>
);

const MetricCard = ({ icon: Icon, value, label }) => (
  <div className="bg-gray-900 rounded-xl p-4 flex items-center space-x-3">
    <div className="bg-gradient-to-r from-red-500 to-blue-500 rounded-lg p-2">
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  </div>
);

const SmartCustomerService = () => {
  const [currentChat, setCurrentChat] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const chatExamples = [
    [
      { type: 'user', message: "What are your opening hours today?" },
      { type: 'ai', message: "We're open from 9 AM to 8 PM today. Would you like to make a reservation?" }
    ],
    [
      { type: 'user', message: "Do you have the new collection in stock?" },
      { type: 'ai', message: "Yes! Our Spring 2025 collection just arrived. I can show you our latest items or help you find something specific." }
    ],
    [
      { type: 'user', message: "Can I track my order #1234?" },
      { type: 'ai', message: "Your order #1234 is out for delivery and will arrive between 2-4 PM today. Would you like real-time updates?" }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChat((prev) => (prev + 1) % chatExamples.length);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [chatExamples.length]);

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
      {/* Chat Interface */}
      <div className="bg-black rounded-xl p-4 mb-6 h-64 overflow-hidden">
        <div className="border-b border-gray-800 pb-2 mb-4">
          <div className="text-white font-medium">AI Customer Service</div>
        </div>
        <div className="space-y-4">
          {chatExamples[currentChat].map((msg, index) => (
            <div key={index} className="transition-all duration-500 transform translate-y-0 opacity-100">
              <ChatMessage {...msg} />
            </div>
          ))}
          {isTyping && (
            <div className="flex space-x-2 px-4 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
          icon={Clock} 
          value="< 1 min" 
          label="Response Time" 
        />
        <MetricCard 
          icon={Globe} 
          value="15+" 
          label="Languages" 
        />
        <MetricCard 
          icon={MessageSquare} 
          value="Multi-Channel" 
          label="WhatsApp, SMS, Instagram" 
        />
        <MetricCard 
          icon={CheckCircle2} 
          value="98%" 
          label="Resolution Rate" 
        />
      </div>

      {/* Try Now Button */}
      <div className="mt-6 text-center">
        <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center">
          Try AI Chat Assistant
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default SmartCustomerService;