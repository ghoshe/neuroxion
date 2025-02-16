import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Globe, Bell } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, isSelected, isAvailable, onClick }) => (
  <div
    className={`
      p-2 rounded-lg text-center cursor-pointer transition-all duration-300 transform hover:scale-105
      ${isSelected ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 
        isAvailable ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-900 text-gray-500'}
    `}
    onClick={() => isAvailable && onClick()}
  >
    {time}
  </div>
);

interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, value, label }) => (
  <div className="bg-gray-900 rounded-xl p-3 flex items-center space-x-3">
    <div className="bg-gradient-to-r from-red-500 to-blue-500 rounded-lg p-2">
      <Icon className="h-4 w-4 text-white" />
    </div>
    <div>
      <div className="text-sm font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  </div>
);

interface BookingConfirmationProps {
  isVisible: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ isVisible }) => (
  <div className={`
    fixed inset-0 flex items-center justify-center transition-opacity duration-300
    ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `}>
    <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
      <div className="flex items-center space-x-2 text-green-500 mb-2">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Booking Confirmed!</span>
      </div>
      <p className="text-gray-400 text-sm">Confirmation sent to email & phone</p>
    </div>
  </div>
);

const AutomatedScheduling: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number>(0);

  const days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots: string[] = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const getAvailability = (dayIndex: number, timeIndex: number): boolean => {
    const random = (dayIndex * timeIndex + timeIndex) % 3;
    return random !== 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay((prev) => (prev + 1) % days.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [days.length]);

  const handleTimeSelect = (time: string): void => {
    setSelectedTime(time);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedTime(null);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
      {/* Calendar Interface */}
      <div className="bg-black rounded-xl p-4 mb-6">
        <div className="border-b border-gray-800 pb-2 mb-4">
          <div className="text-white font-medium">AI Scheduling Assistant</div>
        </div>
        
        {/* Days of the week */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {days.map((day, index) => (
            <div 
              key={day}
              className={`
                p-2 rounded-lg text-center transition-all duration-300
                ${index === currentDay ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' : 'bg-gray-800 text-gray-400'}
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time, index) => (
            <TimeSlot
              key={time}
              time={time}
              isSelected={time === selectedTime}
              isAvailable={getAvailability(currentDay, index)}
              onClick={() => handleTimeSelect(time)}
            />
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard 
          icon={Clock} 
          value="85% Less" 
          label="Scheduling Time" 
        />
        <MetricCard 
          icon={Globe} 
          value="Multi-TZ" 
          label="Timezone Support" 
        />
        <MetricCard 
          icon={Bell} 
          value="Automated" 
          label="Reminders & Followups" 
        />
        <MetricCard 
          icon={CheckCircle2} 
          value="100%" 
          label="Booking Accuracy" 
        />
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center">
          Automate Your Calendar
          <span className="ml-2">→</span>
        </button>
      </div>

      {/* Booking Confirmation Popup */}
      <BookingConfirmation isVisible={showConfirmation} />
    </div>
  );
};

export default AutomatedScheduling;