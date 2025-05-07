// src/pages/admin/AdminQuizPanel.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate }      from 'react-router-dom';
import { getAllQuizzes }          from '../../services/quizService';

export default function AdminQuizPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading]  = useState(false);
  const [error, setError]      = useState('');
  const navigate               = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    setLoading(true);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/admin/quizzes/create')}
        >
          + New Quiz
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error   && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {['Title','Category','Topic','Level','Active','Actions'].map(h => (
                <th key={h} className="p-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quizzes.map(q => (
              <tr key={q._id} className="border-t">
                <td className="p-2">{q.title}</td>
                <td className="p-2">{q.category}</td>
                <td className="p-2">{q.topic}</td>
                <td className="p-2">{q.level}</td>
                <td className="p-2">{q.isActive ? '✅' : '❌'}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/quizzes/${q._id}/edit`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/quizzes/${q._id}/bulk-upload`}
                    className="text-sm text-green-600 hover:underline"
                  >
                    Bulk Questions
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
