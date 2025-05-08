// src/components/quizzes/QuizLeaderboard.jsx
import React, { useState, useEffect } from "react";
import API from "../../services/axios.js";

export default function QuizLeaderboard({ filters }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get("/quizzes/leaderboard", { params: filters })
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  // inside your data-loading useEffect:
  quizService
    .getLeaderboard(filters) // filters contains category, topic, level, timePeriod, page, limit
    .then((data) => {
      setEntries(data.items);
      setTotal(data.total);
      setPage(data.page);
      setLimit(data.limit);
    })
    .catch(console.error);

  if (loading) return <p>Loading leaderboard…</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Weekly Leaders</h3>
      <ol className="list-decimal list-inside space-y-2">
        {entries.slice(0, 5).map((e, i) => (
          <li key={e._id} className="flex justify-between">
            <span>{e.user.name}</span>
            <span className="font-mono">{e.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
