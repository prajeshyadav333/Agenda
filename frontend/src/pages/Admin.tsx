import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Admin() {
  const [data, setData] = useState<any>(null);
const [performanceData, setPerformanceData] = useState<any>([]);
const [userDistribution, setUserDistribution] = useState<any>([]);
  const navigate = useNavigate();

useEffect(() => {

  async function load() {

    const analytics =
      await api.get('/admin/analytics');

    setData(analytics.data);

    const distribution =
      await api.get('/admin/distribution');

    setUserDistribution(distribution.data);

    const performance =
      await api.get('/admin/performance');

    setPerformanceData(performance.data);

  }

  load();

}, []);

  function logout() {
    localStorage.clear();
    navigate('/');
  }


  const COLORS = ['#7c3aed', '#06b6d4', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Platform analytics & insights</p>
              </div>
            </div>
            <button onClick={logout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="stat-number stat-cyan">{data?.users || 120}</p>
                <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tests</p>
                <p className="stat-number stat-green">{data?.activeTests || 4}</p>
                <p className="text-sm text-blue-600 mt-2">Live right now</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
<p className="stat-number stat-violet">
  {(data?.avgAccuracy || 0).toFixed(0)}%
</p>
                <p className="text-sm text-green-600 mt-2">↑ 3% improvement</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trends */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.15)" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(124,58,237,0.3)' }}
                  label={{
                    value: 'Test Status',
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#94a3b8'
                  }}
                />

                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(124,58,237,0.3)' }}
                  label={{
                    value: 'No. of Tests',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#94a3b8'
                  }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1628', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#e2e8f0' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  cursor={{ fill: 'rgba(124,58,237,0.08)' }}
                />
                <Bar dataKey="taken" fill="#7c3aed" name="Tests Taken" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completed" fill="#06b6d4" name="Completed Tests" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* User Distribution */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="rgba(124,58,237,0.2)"
                  strokeWidth={2}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1628', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#e2e8f0' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
<Legend
  wrapperStyle={{ color: '#94a3b8', fontSize: '13px' }}
/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="status-item" style={{ borderLeft: '3px solid #10b981', padding: '12px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-600">API Server</p>
                  <p className="font-semibold text-gray-900">Online</p>
                </div>
              </div>
            </div>
            <div className="status-item" style={{ borderLeft: '3px solid #10b981', padding: '12px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-600">AI Engine</p>
                  <p className="font-semibold text-gray-900">Active</p>
                </div>
              </div>
            </div>
            <div className="status-item" style={{ borderLeft: '3px solid #10b981', padding: '12px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-600">Database</p>
                  <p className="font-semibold text-gray-900">Connected</p>
                </div>
              </div>
            </div>
            <div className="status-item" style={{ borderLeft: '3px solid #f59e0b', padding: '12px 16px', borderRadius: '10px', background: 'rgba(245,158,11,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-600">Storage</p>
                  <p className="font-semibold text-gray-900">78% Used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
