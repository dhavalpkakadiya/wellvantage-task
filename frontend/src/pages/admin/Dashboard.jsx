import React, { useEffect, useState } from "react";
import { apiService } from "../../services/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    interestDistribution: {},
    gymTimeDistribution: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await apiService.get('/lead', { page: 1, limit: 100 });
        
        const totalLeads = response.total || 0;
        const leadsData = response.data || [];

        const normalizeText = (text) => {
          if (!text) return 'Unknown';
          return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        };

        const interestDistribution = leadsData.reduce((acc, lead) => {
          const level = normalizeText(lead.interestLevel);
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});

        const gymTimeDistribution = leadsData.reduce((acc, lead) => {
          const time = normalizeText(lead.preferences?.preferredGymTime);
          acc[time] = (acc[time] || 0) + 1;
          return acc;
        }, {});

        setStats({
          totalLeads,
          interestDistribution,
          gymTimeDistribution
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-gray-500">Loading dashboard stats...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-[#F9F9FA] min-h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Leads */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Leads</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-[#28A745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">{stats.totalLeads}</span>
            <span className="ml-2 text-sm text-gray-500">leads</span>
          </div>
        </div>

        {/* Card 2: Leads by Interest Level */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Interest Level</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.interestDistribution).map(([level, count]) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize text-sm">{level}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        level.toLowerCase() === 'hot' ? 'bg-red-400' : 
                        level.toLowerCase() === 'warm' ? 'bg-orange-400' : 
                        'bg-blue-400'
                      }`}
                      style={{ width: `${(count / stats.totalLeads) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-6 text-right">{count}</span>
                </div>
              </div>
            ))}
            {Object.keys(stats.interestDistribution).length === 0 && (
              <p className="text-sm text-gray-400 italic">No interest data available</p>
            )}
          </div>
        </div>

        {/* Card 3: Preferred Gym Time */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Preferred Gym Time</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.gymTimeDistribution).map(([time, count]) => (
              <div key={time} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize text-sm">{time.replace(/_/g, ' ')}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {count}
                </span>
              </div>
            ))}
            {Object.keys(stats.gymTimeDistribution).length === 0 && (
              <p className="text-sm text-gray-400 italic">No preference data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
