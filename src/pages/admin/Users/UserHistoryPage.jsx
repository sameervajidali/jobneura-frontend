// src/pages/admin/Users/UserHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserHistory } from '../../../services/userService';
import { FaArrowLeft } from 'react-icons/fa';

export default function UserHistoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [history, setHistory] = useState({
    user:         null,
    quizAttempts: [],
    loginHistory: []
  });

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await getUserHistory(id);
        setHistory({
          user:         data.user         || null,
          quizAttempts: Array.isArray(data.quizAttempts) ? data.quizAttempts : [],
          loginHistory: Array.isArray(data.loginHistory) ? data.loginHistory : []
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id]);

  if (loading) return <p className="p-6 text-center text-gray-600">Loading user history…</p>;
  if (error)   return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!history.user) return <p className="p-6 text-center text-gray-600">User not found.</p>;

  const { user, quizAttempts, loginHistory } = history;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-indigo-600 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Users
      </button>

      {/* Profile Details */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-700">Name</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Email</dt>
            <dd>{user.email}</dd>
          </div>
          {user.phone && (
            <div>
              <dt className="font-medium text-gray-700">Phone</dt>
              <dd>{user.phone}</dd>
            </div>
          )}
          {user.location && (
            <div>
              <dt className="font-medium text-gray-700">Location</dt>
              <dd>{user.location}</dd>
            </div>
          )}
          {user.bio && (
            <div className="md:col-span-2">
              <dt className="font-medium text-gray-700">Bio</dt>
              <dd className="whitespace-pre-wrap">{user.bio}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Quiz Attempts */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Quiz Attempts</h2>
        {quizAttempts.length === 0 ? (
          <p className="text-gray-600">No quiz attempts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quiz</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Score</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quizAttempts.map((att, i) => (
                  <tr key={att._id ?? i} className={i % 2 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2 text-sm text-gray-700">{att.quiz?.title || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {att.score}/{att.totalQuestions}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(att.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Login History */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login History</h2>
        {loginHistory.length === 0 ? (
          <p className="text-gray-600">No login history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">IP Address</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User Agent</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loginHistory.map((lh, i) => (
                  <tr key={lh.at ?? i} className={i % 2 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {new Date(lh.at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{lh.ip}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 break-words">
                      {lh.userAgent}
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      {lh.success ? '✅' : '❌'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
