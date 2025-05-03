import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { AdminNavbar } from '../components/AdminNavbar.jsx';
import { useTranslation } from 'react-i18next';
import axios from '../services/axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Simple Sidebar component
const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="w-64 bg-white border-r h-full p-4">
      <h2 className="text-xl font-bold mb-6">{t('sidebar.title', 'Menu')}</h2>
      <nav className="flex flex-col space-y-2">
        <a href="/admin" className="text-gray-700 hover:text-blue-600">
          {t('sidebar.dashboard', 'Dashboard')}
        </a>
        <a href="/admin/users" className="text-gray-700 hover:text-blue-600">
          {t('sidebar.users', 'User Management')}
        </a>
        <a href="/admin/metrics" className="text-gray-700 hover:text-blue-600">
          {t('sidebar.metrics', 'Metrics')}
        </a>
        <a href="/admin/settings" className="text-gray-700 hover:text-blue-600">
          {t('sidebar.settings', 'Settings')}
        </a>
      </nav>
    </aside>
  );
};

// Colors for pie segments
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [summary, setSummary] = useState(null);
  const [userGrowth, setUserGrowth] = useState([]);
  const [revenueByRegion, setRevenueByRegion] = useState([]);

  useEffect(() => {
    axios.get('/admin/summary').then(({ data }) => {
      setSummary(data.summary);
      setUserGrowth(data.userGrowth);
      setRevenueByRegion(data.revenueByRegion);
    }).catch(console.error);
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar onLanguageChange={handleLanguageChange} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {t('dashboard.welcome', { name: user.name })}
            </h1>
            <div>
              <button onClick={() => handleLanguageChange('en')} className="mr-2">
                EN
              </button>
              <button onClick={() => handleLanguageChange('es')}>
                ES
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">
                {t('dashboard.cards.totalUsers', 'Total Users')}
              </h2>
              <p className="text-3xl">
                {summary?.totalUsers ?? '--'}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">
                {t('dashboard.cards.newSignups', 'New Signups')}
              </h2>
              <p className="text-3xl">
                {summary?.newSignups ?? '--'}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">
                {t('dashboard.cards.revenue', 'Revenue')}
              </h2>
              <p className="text-3xl">
                ${summary?.revenue?.toLocaleString() ?? '--'}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Growth Chart */}
            <div className="bg-white p-4 rounded shadow h-80">
              <h3 className="text-lg font-semibold mb-2">
                {t('dashboard.charts.userGrowth', 'User Growth')}
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue by Region Pie */}
            <div className="bg-white p-4 rounded shadow h-80">
              <h3 className="text-lg font-semibold mb-2">
                {t('dashboard.charts.revenueByRegion', 'Revenue by Region')}
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByRegion}
                    dataKey="value"
                    nameKey="region"
                    outerRadius={80}
                    fill="#82ca9d"
                  >
                    {revenueByRegion.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
