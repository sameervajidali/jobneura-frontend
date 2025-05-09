// 2) src/pages/admin/Users/UserHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserHistory } from '../../../services/userService';
import { FaArrowLeft } from 'react-icons/fa';

export default function UserHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ user: null, quizAttempts: [], loginHistory: [] });

  useEffect(() => {
    setLoading(true);
    getUserHistory(id)
      .then(resp => setData(resp))
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading user history…</p>;
  if (error)   return <p className="p-6 text-center text-red-600">{error}</p>;

  const { user, quizAttempts, loginHistory } = data;

  return (
    <div className="p-8 space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-indigo-600 hover:underline">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          {user.location && <p><strong>Location:</strong> {user.location}</p>}
          {user.bio && <p className="md:col-span-2"><strong>Bio:</strong> {user.bio}</p>}
        </div>
      </div>

      {/* Quiz Attempts */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Quiz Attempts</h2>
        {quizAttempts.length === 0 ? (
          <p className="text-gray-600">No quiz attempts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quiz</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Score</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {quizAttempts.map((att, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-700">{att.quiz.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{att.score}/{att.totalQuestions}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(att.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login History</h2>
        {loginHistory.length === 0 ? (
          <p className="text-gray-600">No login history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">IP</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User-Agent</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Success</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loginHistory.map((lh, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(lh.at).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{lh.ip}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 break-all">{lh.userAgent}</td>
                    <td className="px-4 py-2 text-sm">{lh.success ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}