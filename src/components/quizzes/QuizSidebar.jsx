// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect } from 'react';
import API from '../../services/axios.js';

export default function QuizSidebar({ filters, onChange }) {
  const [cats, setCats]   = useState([]);
  const [topics, setTopics] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    // fetch all three in parallel
    Promise.all([
      API.get('/quizzes/distinct/category'),
      API.get('/quizzes/distinct/topic'),
      API.get('/quizzes/distinct/level'),
    ])
      .then(([{ data: cats }, { data: topics }, { data: levels }]) => {
        setCats(cats);
        setTopics(topics);
        setLevels(levels);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <aside className="w-1/5 p-4 bg-white border-r space-y-6">
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border rounded p-2"
          value={filters.category}
          onChange={e => onChange({ ...filters, category: e.target.value, page:1 })}
        >
          <option value="">All</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Topic</label>
        <select
          className="w-full border rounded p-2"
          value={filters.topic}
          onChange={e => onChange({ ...filters, topic: e.target.value, page:1 })}
        >
          <option value="">All</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Level</label>
        <select
          className="w-full border rounded p-2"
          value={filters.level}
          onChange={e => onChange({ ...filters, level: e.target.value, page:1 })}
        >
          <option value="">All</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
    </aside>
  );
}
