// Create a new file: how-it-works.tsx
import React from 'react';
import { 
  Users, 
  Globe, 
  Brain, 
  Rocket, 
  LineChart,
  ArrowRight
} from 'lucide-react';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  number: number;
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      icon: Users,
      title: "Consultation and Setup",
      description: "We begin by understanding your business needs and goals, then tailor our AI solutions to fit your operations.",
      number: 1
    },
    {
      icon: Globe,
      title: "Website Development",
      description: "Our team builds a user-friendly website for your business, integrated with essential tools for scheduling, customer communication, and more.",
      number: 2
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Neuroxion's AI agents are customized to manage customer inquiries, automate bookings, and provide valuable business insights.",
      number: 3
    },
    {
      icon: Rocket,
      title: "Launch and Support",
      description: "Once live, we ensure everything runs smoothly with ongoing support and updates to keep your business ahead.",
      number: 4
    },
    {
      icon: LineChart,
      title: "Growth and Optimization",
      description: "As your business grows, our platform evolves with you, offering data-driven recommendations and scalable solutions.",
      number: 5
    }
  ];

  return (
    <section id="offer" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-5xl mx-auto">
            Neuroxion simplifies business management with a seamless process from start to finish
          </p>
        </div>

        

        <div className="relative">
          {/* Gradient Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500 transform -translate-y-1/2 hidden md:block" />

          {/* Steps */}
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number}
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Step Card */}
                  <div className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 h-full">
                    {/* Number Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 mt-4 flex justify-center">
                      <div className="p-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-400 text-center">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



        <div className="text-xl text-center mt-16 text-gray-400 max-w-5xl mx-auto">
          With Neuroxion, small business owners can focus on what they do best while we handle the rest
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;