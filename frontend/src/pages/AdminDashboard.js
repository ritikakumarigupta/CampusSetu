import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/admin/stats')
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin stats error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Loading Admin Overview...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-xs text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-xs text-gray-500">Total Complaints</p>
          <p className="text-2xl font-bold">{stats.totalComplaints}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-xs text-yellow-600">Pending</p>
          <p className="text-2xl font-bold">{stats.pendingComplaints}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-xs text-green-600">Resolved</p>
          <p className="text-2xl font-bold">{stats.resolvedComplaints}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;