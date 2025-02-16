import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Website {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const WebsiteDevelopment: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const websites: Website[] = [
    {
      title: "E-commerce Platform",
      description: "Modern shopping experience with seamless checkout",
      image: "/ecommerce-preview.jpg",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Secure Checkout"]
    },
    {
      title: "Business Portfolio",
      description: "Professional showcase of your services and work",
      image: "/portfolio-preview.jpg",
      features: ["Brand Focused", "Interactive UI", "Performance First", "Analytics Ready"]
    },
    {
      title: "Service Platform",
      description: "Intuitive booking and service management system",
      image: "/service-preview.jpg",
      features: ["Booking System", "Payment Integration", "Client Dashboard", "Admin Controls"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % websites.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [websites.length]);

  // Website preview component with mock website UI
  const WebsitePreview = () => (
    <div className="relative h-[600px] bg-[#0A0A0A] rounded-xl overflow-hidden border border-gray-800">
      {websites.map((website, index) => (
        <div
          key={website.title}
          className={`absolute inset-0 transition-all duration-1000 transform
            ${index === currentSlide 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'}`}
        >
          <div className="w-full h-full">
            {/* Mock Website UI */}
            <div className="bg-[#111] h-full w-full flex flex-col">
              {/* Browser Bar - Fixed at top */}
              <div className="h-8 bg-[#0A0A0A] flex items-center px-4 space-x-2 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 bg-[#111] rounded h-4 w-full"></div>
              </div>
              
              {/* Website Content - Scrollable area */}
              <div className="flex-1 overflow-hidden">
                <div className="p-6 space-y-6 animate-scroll">
                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg"></div>
                    <div className="flex space-x-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-4 w-16 bg-[#222] rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="space-y-4">
                    <div className="h-12 w-3/4 bg-[#222] rounded-lg"></div>
                    <div className="h-6 w-1/2 bg-[#222] rounded-lg"></div>
                    <div className="flex space-x-4">
                      <div className="h-10 w-32 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg"></div>
                      <div className="h-10 w-32 bg-[#222] rounded-lg"></div>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="grid grid-cols-2 gap-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="space-y-4">
                        <div className="h-32 bg-[#222] rounded-lg"></div>
                        <div className="h-4 w-3/4 bg-[#222] rounded"></div>
                        <div className="h-4 w-1/2 bg-[#222] rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black rounded-2xl p-6 shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <WebsitePreview />
        
        {/* Feature List */}
        <div className="space-y-8">
          <div className="transition-all duration-500">
            <h3 className="text-2xl font-bold text-white mb-4">{websites[currentSlide].title}</h3>
            <p className="text-gray-400 mb-6">{websites[currentSlide].description}</p>
            
            <div className="space-y-4">
              {websites[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDevelopment;