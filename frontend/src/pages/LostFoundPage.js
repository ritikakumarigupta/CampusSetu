import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', type: 'Lost', location: '' });
  const [message, setMessage] = useState('');

  const fetchItems = async () => {
    try {
      const res = await API.get('/api/lostfound');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/lostfound', formData);
      setMessage('Item posted successfully!');
      setFormData({ title: '', description: '', type: 'Lost', location: '' });
      fetchItems();
    } catch (err) {
      setMessage('Failed to post item');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
          <h2 className="text-xl font-black text-slate-900 mb-4">Report Lost or Found Item</h2>
          {message && <p className="text-xs text-indigo-600 mb-3 font-medium">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Item Title (e.g., Black Wallet)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
            />
            <textarea
              required
              placeholder="Description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm">Post Item</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${item.type === 'Lost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {item.type}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.description}</p>
              <p className="text-xs text-slate-400">Location: {item.location || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostFoundPage;