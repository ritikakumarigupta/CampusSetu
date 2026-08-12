import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-8 text-center">Loading Analytics Dashboard...</div>;

  const pieData = {
    labels: ['Pending', 'In-Progress', 'Resolved'],
    datasets: [{
      data: [stats.pendingComplaints, stats.inProgressComplaints, stats.resolvedComplaints],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
    }]
  };

  const barData = {
    labels: ['Total Complaints', 'Total Bookings', 'Registered Students'],
    datasets: [{
      label: 'Campus Management Metrics',
      data: [stats.totalComplaints, stats.totalBookings, stats.totalStudents],
      backgroundColor: '#0284c7'
    }]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-300">Admin Analytics Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-slate-500 font-semibold">Total Complaints</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalComplaints}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-slate-500 font-semibold">Pending Issues</p>
          <p className="text-3xl font-extrabold text-red-600 mt-2">{stats.pendingComplaints}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-slate-500 font-semibold">Pending Bookings</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-2">{stats.pendingBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-slate-500 font-semibold">Active Students</p>
          <p className="text-3xl font-extrabold text-sky-600 mt-2">{stats.totalStudents}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Complaint Status Breakdown</h3>
          <div className="h-64 flex justify-center">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-bold text-lg mb-4 text-slate-800">System Activity Metrics</h3>
          <div className="h-64 flex justify-center">
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;