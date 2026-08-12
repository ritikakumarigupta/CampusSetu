import React, { useState, useEffect } from 'react'; // Line 1: useState aur useEffect add kiya
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Home, AlertCircle, Search, Calendar, Sun, Moon } from 'lucide-react'; // Line 3: Sun, Moon icons add kiye

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // --- LINE 8 SE NEECHE THEME LOGIC ADD KIYA GAYA HAI ---
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-slate-900 dark:bg-slate-950 text-white shadow-md border-b border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-sky-400" />
            <span className="font-bold text-xl tracking-wide">CampusSetu</span>
            <span className="text-xs bg-sky-800 text-sky-200 px-2 py-0.5 rounded-full font-semibold">
              {user.role}
            </span>
          </div>

          <div className="flex space-x-4 items-center">
            {user.role === 'Student' ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-sky-400 px-3 py-2 text-sm font-medium">
                  <Home className="w-4 h-4" /><span>Dashboard</span>
                </Link>
                <Link to="/my-complaints" className="flex items-center space-x-1 hover:text-sky-400 px-3 py-2 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" /><span>Complaints</span>
                </Link>
                <Link to="/lost-found" className="flex items-center space-x-1 hover:text-sky-400 px-3 py-2 text-sm font-medium">
                  <Search className="w-4 h-4" /><span>Lost & Found</span>
                </Link>
                <Link to="/book-room" className="flex items-center space-x-1 hover:text-sky-400 px-3 py-2 text-sm font-medium">
                  <Calendar className="w-4 h-4" /><span>Book Lab/Room</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin/dashboard" className="hover:text-sky-400 px-3 py-2 text-sm font-medium">Overview</Link>
                <Link to="/admin/complaints" className="hover:text-sky-400 px-3 py-2 text-sm font-medium">Manage Complaints</Link>
                <Link to="/admin/bookings" className="hover:text-sky-400 px-3 py-2 text-sm font-medium">Manage Bookings</Link>
                <Link to="/admin/announcements" className="hover:text-sky-400 px-3 py-2 text-sm font-medium">Announce</Link>
              </>
            )}

            {/* --- LOGOUT BUTTON SE THEEK PEHLE LIGHT/DARK TOGGLE BUTTON ADD KIYA (Line 57) --- */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-md text-sm font-medium transition border border-slate-700"
              title="Toggle Theme"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-200 hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-400" />
                  <span className="text-xs text-slate-200 hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;