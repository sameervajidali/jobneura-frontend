import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import {
  downloadAllQuizzes,
  downloadAllCategories,
  downloadAllTopics,
  getDAUReport,
  getCategoryEngagement,
  getExportHistory,
  getAlerts,
  saveAlertConfig,
} from '../../../services/quizService';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function AdminReportsPage() {
  const tabs = ['Usage', 'Engagement', 'Exports', 'Alerts'];

  // Usage
  const [dauData, setDauData] = useState([]);
  const [dauLoading, setDauLoading] = useState(false);
  const [dauError, setDauError] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: '2025-05-01',
    to: '2025-05-07',
  });

  // Engagement
  const [categoryData, setCategoryData] = useState([]);
  const [engagementLoading, setEngagementLoading] = useState(false);
  const [engagementError, setEngagementError] = useState(null);

  // Exports
  const [exporting, setExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);

  // Alerts
  const [alerts, setAlerts] = useState([]);
  const [alertConfig, setAlertConfig] = useState({
    dauThreshold: 10,
    sendEmail: false,
  });
  const [alertSaving, setAlertSaving] = useState(false);

  // Fetch DAU data with date range
useEffect(() => {
  async function loadDAU() {
    setDauLoading(true);
    setDauError(null);
    try {
      const data = await getDAUReport({ from: dateRange.from, to: dateRange.to });
      setDauData(data);
    } catch (err) {
      setDauError('Failed to load usage data');
    } finally {
      setDauLoading(false);
    }
  }
  loadDAU();
}, [dateRange]);

  // Fetch category engagement
  useEffect(() => {
    async function loadEngagement() {
      setEngagementLoading(true);
      setEngagementError(null);
      try {
        const data = await getCategoryEngagement();
        setCategoryData(data);
      } catch (err) {
        setEngagementError('Failed to load engagement data');
      } finally {
        setEngagementLoading(false);
      }
    }
    loadEngagement();
  }, []);

  // Fetch export history
  useEffect(() => {
    async function loadExportHistory() {
      try {
        const history = await getExportHistory();
        setExportHistory(history);
      } catch {
        // silently fail
      }
    }
    loadExportHistory();
  }, []);

  // Fetch alerts
  useEffect(() => {
    async function loadAlerts() {
      try {
        const activeAlerts = await getAlerts();
        setAlerts(activeAlerts);
      } catch {
        // silently fail
      }
    }
    loadAlerts();
  }, []);

  // Download handlers with progress
  const handleDownload = async (type) => {
    setExporting(true);
    try {
      let blob;
      switch (type) {
        case 'quizzes':
          blob = await downloadAllQuizzes();
          triggerDownload(blob.data, 'quizzes.csv');
          break;
        case 'categories':
          blob = await downloadAllCategories();
          triggerDownload(blob.data, 'categories.csv');
          break;
        case 'topics':
          blob = await downloadAllTopics();
          triggerDownload(blob.data, 'topics.csv');
          break;
        default:
          break;
      }
      // Optionally refresh export history here
    } catch (err) {
      alert('Download failed. Please try again later.');
    } finally {
      setExporting(false);
    }
  };

  // Alert form handlers
  const handleAlertChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAlertConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveAlerts = async () => {
    setAlertSaving(true);
    try {
      await saveAlertConfig(alertConfig);
      alert('Alert settings saved successfully');
    } catch {
      alert('Failed to save alert settings');
    } finally {
      setAlertSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Admin Reports</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b-2 border-gray-300">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `py-3 px-6 rounded-t-lg font-semibold focus:outline-none ${
                  selected
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="bg-white p-6 rounded-b-lg shadow-lg">
          {/* Usage Tab */}
          <Tab.Panel>
            <div className="mb-4 flex flex-wrap gap-4 items-center">
              <label className="font-semibold text-gray-700">From:</label>
              <input
                type="date"
                value={dateRange.from}
                max={dateRange.to}
                onChange={(e) =>
                  setDateRange((d) => ({ ...d, from: e.target.value }))
                }
                className="border rounded px-3 py-1"
              />
              <label className="font-semibold text-gray-700">To:</label>
              <input
                type="date"
                value={dateRange.to}
                min={dateRange.from}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDateRange((d) => ({ ...d, to: e.target.value }))}
                className="border rounded px-3 py-1"
              />
            </div>

            {dauLoading ? (
              <div className="text-center py-20 text-gray-400 font-semibold">Loading...</div>
            ) : dauError ? (
              <div className="text-red-600 font-semibold">{dauError}</div>
            ) : dauData.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dauData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={COLORS[0]}
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-500 font-semibold">No data available.</div>
            )}
          </Tab.Panel>

          {/* Engagement Tab */}
          <Tab.Panel>
            {engagementLoading ? (
              <div className="text-center py-20 text-gray-400 font-semibold">Loading...</div>
            ) : engagementError ? (
              <div className="text-red-600 font-semibold">{engagementError}</div>
            ) : categoryData.length ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-6 overflow-auto max-h-96 border rounded shadow">
                  <table className="w-full table-auto text-left">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.map(({ name, value }, idx) => (
                        <tr
                          key={name}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}
                        >
                          <td className="px-4 py-2">{name}</td>
                          <td className="px-4 py-2">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-gray-500 font-semibold">No engagement data available.</div>
            )}
          </Tab.Panel>

          {/* Exports Tab */}
          <Tab.Panel>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                disabled={exporting}
                onClick={() => handleDownload('quizzes')}
                className={`px-5 py-3 rounded font-semibold text-white ${
                  exporting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Download All Quizzes
              </button>
              <button
                disabled={exporting}
                onClick={() => handleDownload('categories')}
                className={`px-5 py-3 rounded font-semibold text-white ${
                  exporting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Download All Categories
              </button>
              <button
                disabled={exporting}
                onClick={() => handleDownload('topics')}
                className={`px-5 py-3 rounded font-semibold text-white ${
                  exporting ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Download All Topics
              </button>
            </div>

            <h3 className="mt-8 mb-3 font-semibold text-lg">Export History</h3>
            {exportHistory.length ? (
              <div className="overflow-auto max-h-72 border rounded shadow">
                <table className="w-full table-auto text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Filename</th>
                      <th className="px-4 py-2">Type</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportHistory.map(({ id, filename, type, status, createdAt }) => (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{filename}</td>
                        <td className="px-4 py-2">{type}</td>
                        <td className="px-4 py-2">{status}</td>
                        <td className="px-4 py-2">
                          {new Date(createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No export history found.</p>
            )}
          </Tab.Panel>

          {/* Alerts Tab */}
          <Tab.Panel>
            <h2 className="text-xl font-semibold mb-4">Alerts & Trends</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveAlerts();
              }}
              className="max-w-md space-y-4"
            >
              <div>
                <label
                  htmlFor="dauThreshold"
                  className="block text-gray-700 font-medium mb-1"
                >
                  DAU Threshold
                </label>
                <input
                  id="dauThreshold"
                  name="dauThreshold"
                  type="number"
                  min={0}
                  value={alertConfig.dauThreshold}
                  onChange={handleAlertChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Alert when daily active users fall below this number.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="sendEmail"
                  name="sendEmail"
                  type="checkbox"
                  checked={alertConfig.sendEmail}
                  onChange={handleAlertChange}
                  className="rounded"
                />
                <label htmlFor="sendEmail" className="text-gray-700 font-medium">
                  Send Email Notification
                </label>
              </div>

              <button
                type="submit"
                disabled={alertSaving}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {alertSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Active Alerts</h3>
              {alerts.length ? (
                <ul className="list-disc list-inside text-gray-700">
                  {alerts.map(({ id, message }) => (
                    <li key={id}>{message}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No active alerts.</p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
