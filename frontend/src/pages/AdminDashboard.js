import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    pendingComplaints: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/api/admin/overview')
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin overview:', err);
        setError('Failed to load admin overview data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-600">Loading Admin Overview...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Complaints</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalComplaints}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
          <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Pending Complaints</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingComplaints}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;