import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { Shield } from 'lucide-react';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', rollNo: '', role: 'Student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setError(msg);

      // Agar account pehle se bana hai, toh 2 second baad auto-redirect to Login
      if (msg.includes('already exists')) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <Shield className="mx-auto h-10 w-10 text-sky-600" />
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Create Campus Account</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded text-sm border border-red-200">
            {error}
            {error.includes('already exists') && (
              <div className="mt-1 font-semibold text-sky-600">
                Redirecting to Login page...
              </div>
            )}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text" required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Roll No / Staff ID</label>
            <input
              type="text" required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500"
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input
              type="email" required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password" required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
  <label className="text-sm font-semibold text-slate-700">
    Role
  </label>
  <select
    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    value={formData.role}
    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
  >
    <option value="Student">Student</option>
    <option value="Admin">Admin</option>
  </select>
</div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-slate-600">
          Already registered? <Link to="/login" className="text-sky-600 font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;