import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-xl font-black text-indigo-600">
          CampusSetu
        </Link>
        <div className="hidden md:flex space-x-4 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link to="/book-room" className="hover:text-indigo-600">Book Room</Link>
          <Link to="/complaints" className="hover:text-indigo-600">Complaints</Link>
          <Link to="/lost-found" className="hover:text-indigo-600">Lost & Found</Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
            {user.name} ({user.role})
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;