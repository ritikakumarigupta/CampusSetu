import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ComplaintForm from './pages/ComplaintForm';
import MyComplaints from './pages/MyComplaints';
import LostFoundPage from './pages/LostFoundPage';
import BookRoom from './pages/BookRoom';

import AdminDashboard from './pages/AdminDashboard';
import ManageComplaints from './pages/ManageComplaints';
import ManageBookings from './pages/ManageBookings';
import PostAnnouncement from './pages/PostAnnouncement';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div className="min-h-screen bg-slate-100 dark:bg-[#070b14] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        
        <Routes>
          {/* Default Root Redirect */}
          <Route 
            path="/" 
            element={
              user ? (
                user.role === 'Admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRole="Student"><Dashboard /></ProtectedRoute>} />
          <Route path="/new-complaint" element={<ProtectedRoute allowedRole="Student"><ComplaintForm /></ProtectedRoute>} />
          <Route path="/my-complaints" element={<ProtectedRoute allowedRole="Student"><MyComplaints /></ProtectedRoute>} />
          <Route path="/lost-found" element={<ProtectedRoute allowedRole="Student"><LostFoundPage /></ProtectedRoute>} />
          <Route path="/book-room" element={<ProtectedRoute allowedRole="Student"><BookRoom /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="Admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="Admin"><ManageComplaints /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute allowedRole="Admin"><ManageBookings /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute allowedRole="Admin"><PostAnnouncement /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;