import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalComplaints: 0, pendingComplaints: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/api/admin/overview');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching admin overview', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-black text-indigo-600">CampusSetu Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-500">Total Users</p>
            <p className="text-3xl font-black text-slate-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-500">Total Complaints</p>
            <p className="text-3xl font-black text-slate-900">{stats.totalComplaints}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <p className="text-xs font-semibold text-slate-500">Pending Complaints</p>
            <p className="text-3xl font-black text-amber-600">{stats.pendingComplaints}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/manage-complaints" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Manage Complaints</h2>
            <p className="text-xs text-slate-500">View and update statuses of user complaints.</p>
          </Link>
          <Link to="/admin/announcements" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Post Announcement</h2>
            <p className="text-xs text-slate-500">Broadcast important campus notifications.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;