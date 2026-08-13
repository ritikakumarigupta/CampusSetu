import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const PostAnnouncement = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/admin/announcement', formData);
      setMessage('Announcement posted successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      setMessage('Failed to post announcement');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
        <h1 className="text-xl font-black text-slate-900 text-center">Post Announcement</h1>
        {message && <p className="text-xs text-indigo-600 text-center font-medium">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
          />
          <textarea
            required
            placeholder="Content..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
          />
          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostAnnouncement;