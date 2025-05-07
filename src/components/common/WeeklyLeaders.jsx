import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/quizService';

export default function WeeklyLeaders({ limit = 5 }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard({ timePeriod: 'week' })
      .then(data => setLeaders(data.slice(0, limit)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) return <p>Loading leaders…</p>;
  if (!leaders.length) return <p>No leaders this week.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
      {leaders.map((e, i) => (
        <div
          key={e._id}
          className="p-4 bg-white rounded-lg shadow flex items-center space-x-3"
        >
          <span className="text-xl font-bold text-indigo-600">{i+1}</span>
          <div>
            <p className="font-medium text-gray-800">{e.user.name}</p>
            <p className="text-sm text-gray-500">{e.score} pts</p>
          </div>
        </div>
      ))}
    </div>
  );
}
