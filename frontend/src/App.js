import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookRoom from './pages/BookRoom';
import ComplaintForm from './pages/ComplaintForm';
import LostFoundPage from './pages/LostFoundPage';
import ManageBookings from './pages/ManageBookings';
import ManageComplaints from './pages/ManageComplaints';
import MyComplaints from './pages/MyComplaints';
import PostAnnouncement from './pages/PostAnnouncement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/book-room" element={<ProtectedRoute><BookRoom /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><ComplaintForm /></ProtectedRoute>} />
        <Route path="/my-complaints" element={<ProtectedRoute><MyComplaints /></ProtectedRoute>} />
        <Route path="/lost-found" element={<ProtectedRoute><LostFoundPage /></ProtectedRoute>} />
        
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-bookings" element={<ProtectedRoute adminOnly={true}><ManageBookings /></ProtectedRoute>} />
        <Route path="/admin/manage-complaints" element={<ProtectedRoute adminOnly={true}><ManageComplaints /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute adminOnly={true}><PostAnnouncement /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;