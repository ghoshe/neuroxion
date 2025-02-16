import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

const InsightCard = ({ title, value, change, trend }) => (
  <div className="bg-gray-800 rounded-xl p-4 transform transition-transform duration-300 hover:scale-105">
    <div className="text-gray-400 text-sm mb-2">{title}</div>
    <div className="text-white text-2xl font-bold mb-1">{value}</div>
    <div className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
      {trend === 'up' ? '↑' : '↓'} {change}
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

const BusinessIntelligence = () => {
  // Helper function to generate random data
  const generateData = (days, trend = 'up') => {
    return Array.from({ length: days }, (_, i) => {
      const base = trend === 'up' ? i * 100 : 1000 - (i * 50);
      const random = Math.random() * 200 - 100;
      return {
        day: `Day ${i + 1}`,
        value: Math.max(0, base + random)
      };
    });
  };

  const [currentData, setCurrentData] = useState(() => generateData(7));
  const [revenueData, setRevenueData] = useState(() => generateData(7, 'up'));
  const [activeTab, setActiveTab] = useState('revenue');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(generateData(7));
      setRevenueData(generateData(7, 'up'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        activeTab === id 
          ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white' 
          : 'text-gray-400 hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-white text-lg font-medium">AI Business Analytics</div>
        <div className="flex space-x-2">
          <TabButton id="revenue" label="Revenue" />
          <TabButton id="customers" label="Customers" />
          <TabButton id="trends" label="Trends" />
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className="bg-black rounded-xl p-4 mb-6">
        {/* Insight Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <InsightCard 
            title="Daily Revenue" 
            value="$2,847" 
            change="+12.5%" 
            trend="up"
          />
          <InsightCard 
            title="New Customers" 
            value="147" 
            change="+8.2%" 
            trend="up"
          />
          <InsightCard 
            title="Avg. Order Value" 
            value="$95" 
            change="+5.7%" 
            trend="up"
          />
        </div>

        {/* Main Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'revenue' ? (
              <LineChart data={revenueData}>
                <XAxis dataKey="day" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="url(#gradient)" 
                  strokeWidth={2} 
                  dot={false}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </LineChart>
            ) : (
              <BarChart data={currentData}>
                <XAxis dataKey="day" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Bar 
                  dataKey="value" 
                  fill="url(#gradient)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard 
          icon={TrendingUp} 
          value="93%" 
          label="Prediction Accuracy" 
        />
        <MetricCard 
          icon={Users} 
          value="Real-time" 
          label="Customer Insights" 
        />
        <MetricCard 
          icon={DollarSign} 
          value="AI-Driven" 
          label="Revenue Forecasting" 
        />
        <MetricCard 
          icon={BarChart3} 
          value="Custom" 
          label="Analytics Dashboard" 
        />
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center">
          Get Business Insights
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default BusinessIntelligence;