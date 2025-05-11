// src/pages/admin/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import API from '../../services/axios';

export default function SettingsPage() {
  const { isDark, setIsDark } = useTheme();
  const [companyName, setCompanyName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load existing settings
  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await API.get('/admin/settings');
        setCompanyName(data.companyName || '');
        setSupportEmail(data.supportEmail || '');
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await API.patch('/admin/settings', { companyName, supportEmail });
      setMessage('Settings updated successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {message && (
        <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
            disabled={saving}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Support Email</label>
          <input
            type="email"
            value={supportEmail}
            onChange={e => setSupportEmail(e.target.value)}
            required
            disabled={saving}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(d => !d)}
            id="darkModeToggle"
            className="h-5 w-5 text-indigo-600"
          />
          <label htmlFor="darkModeToggle" className="font-medium">
            Dark Mode
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
