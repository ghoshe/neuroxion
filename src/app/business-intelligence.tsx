import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, value, change, trend }) => (
  <div className="bg-gray-800 rounded-xl p-4 transform transition-transform duration-300 hover:scale-105">
    <div className="text-gray-400 text-sm mb-2">{title}</div>
    <div className="text-white text-2xl font-bold mb-1">{value}</div>
    <div className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
      {trend === 'up' ? '↑' : '↓'} {change}
    </div>
  </div>
);

interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, value, label }) => (
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

interface DataPoint {
  day: string;
  value: number;
}

const BusinessIntelligence: React.FC = () => {
  const generateData = (days: number, trend: 'up' | 'down' = 'up'): DataPoint[] => {
    return Array.from({ length: days }, (_, i) => {
      const base = trend === 'up' ? i * 100 : 1000 - (i * 50);
      const random = Math.random() * 200 - 100;
      return {
        day: `Day ${i + 1}`,
        value: Math.max(0, base + random)
      };
    });
  };

  const [revenueData, setRevenueData] = useState<DataPoint[]>(() => generateData(7, 'up'));
  const [customerData, setCustomerData] = useState<DataPoint[]>(() => generateData(7, 'up'));
  const [trendData, setTrendData] = useState<DataPoint[]>(() => generateData(7));
  const [activeTab, setActiveTab] = useState<string>('revenue');

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueData(generateData(7, 'up')); 
      setCustomerData(generateData(7, 'up'));
      setTrendData(generateData(7));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  interface TabButtonProps {
    id: string;
    label: string;
  }

  const TabButton: React.FC<TabButtonProps> = ({ id, label }) => (
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-white text-lg font-medium mb-4 md:mb-0">AI Business Analytics</div>
        <div className="flex space-x-2">
          <TabButton id="revenue" label="Revenue" />
          <TabButton id="customers" label="Customers" />
          <TabButton id="trends" label="Trends" />
        </div>
      </div>

      <div className="bg-black rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InsightCard 
            title="Daily Revenue" 
            value={activeTab === 'revenue' ? "$2,847" : activeTab === 'customers' ? "147" : "$95"} 
            change={activeTab === 'revenue' ? "+12.5%" : activeTab === 'customers' ? "+8.2%" : "+5.7%"}
            trend="up"
          />
          <InsightCard 
            title="New Customers" 
            value={activeTab === 'revenue' ? "147" : activeTab === 'customers' ? "21" : "8"} 
            change={activeTab === 'revenue' ? "+8.2%" : activeTab === 'customers' ? "+4.5%" : "+2.1%"}
            trend="up"
          />
          <InsightCard 
            title={activeTab === 'revenue' ? "Avg. Order Value" : activeTab === 'customers' ? "Retention Rate" : "Conversion Rate"} 
            value={activeTab === 'revenue' ? "$95" : activeTab === 'customers' ? "78%" : "3.2%"} 
            change={activeTab === 'revenue' ? "+5.7%" : activeTab === 'customers' ? "+7.1%" : "+0.5%"}
            trend="up" 
          />
        </div>

        <div className="h-64 md:h-96 mb-6">
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
            ) : activeTab === 'customers' ? (
              <BarChart data={customerData}>
                <XAxis dataKey="day" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Bar 
                  dataKey="value" 
                  fill="url(#gradientBar)" 
                  radius={[4, 4, 0, 0]} 
                />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>               
              </BarChart>
            ) : (
              <LineChart data={trendData}>
                <XAxis dataKey="day" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Line 
                  type="monotone" 
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>  
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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