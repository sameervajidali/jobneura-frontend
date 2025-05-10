// // src/components/quizzes/QuizSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import API from '../../services/axios.js';

// export default function QuizSidebar({ filters, onChange }) {
//   const [cats, setCats]   = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [levels, setLevels] = useState([]);

//   useEffect(() => {
//     // fetch all three in parallel
//     Promise.all([
//       API.get('/quizzes/distinct/category'),
//       API.get('/quizzes/distinct/topic'),
//       API.get('/quizzes/distinct/level'),
//     ])
//       .then(([{ data: cats }, { data: topics }, { data: levels }]) => {
//         setCats(cats);
//         setTopics(topics);
//         setLevels(levels);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <aside className="w-1/5 p-4 bg-white border-r space-y-6">
//       <div>
//         <label className="block font-medium mb-1">Category</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.category}
//           onChange={e => onChange({ ...filters, category: e.target.value, page:1 })}
//         >
//           <option value="">All</option>
//           {cats.map(c => <option key={c} value={c}>{c}</option>)}
//         </select>
//       </div>

//       <div>
//         <label className="block font-medium mb-1">Topic</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.topic}
//           onChange={e => onChange({ ...filters, topic: e.target.value, page:1 })}
//         >
//           <option value="">All</option>
//           {topics.map(t => <option key={t} value={t}>{t}</option>)}
//         </select>
//       </div>

//       <div>
//         <label className="block font-medium mb-1">Level</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.level}
//           onChange={e => onChange({ ...filters, level: e.target.value, page:1 })}
//         >
//           <option value="">All</option>
//           {levels.map(l => <option key={l} value={l}>{l}</option>)}
//         </select>
//       </div>
//     </aside>
//   );
// }


// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect } from 'react';
import API from '../../services/axios';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [cats,   setCats]   = useState([]);
  const [topics,setTopics] = useState([]);
  const [levels,setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchDistincts() {
      setLoading(true);
      setError('');
      try {
        const [catRes, topicRes, levelRes] = await Promise.all([
          API.get('/quizzes/distinct/category'),
          API.get('/quizzes/distinct/topic'),
          API.get('/quizzes/distinct/level'),
        ]);

        if (!isMounted) return;

        // Be defensive: ensure we got arrays
        setCats(Array.isArray(catRes.data) ? catRes.data : []);
        setTopics(Array.isArray(topicRes.data) ? topicRes.data : []);
        setLevels(Array.isArray(levelRes.data) ? levelRes.data : []);
      } catch (err) {
        if (!isMounted) return;
        console.error('QuizSidebar fetch error:', err);
        setError('Failed to load filters.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDistincts();
    return () => {
      isMounted = false;
    };
  }, []);

  // helper to emit a change and reset page to 1
  const handleSelect = (key) => (e) => {
    onChange({ ...filters, [key]: e.target.value, page: 1 });
  };

  return (
    <aside className="w-1/5 p-4 bg-white border-r space-y-6">
      {error && (
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border rounded p-2"
          value={filters.category || ''}
          onChange={handleSelect('category')}
          disabled={loading}
        >
          <option value="">All</option>
          {cats.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Topic */}
      <div>
        <label className="block font-medium mb-1">Topic</label>
        <select
          className="w-full border rounded p-2"
          value={filters.topic || ''}
          onChange={handleSelect('topic')}
          disabled={loading}
        >
          <option value="">All</option>
          {topics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Level */}
      <div>
        <label className="block font-medium mb-1">Level</label>
        <select
          className="w-full border rounded p-2"
          value={filters.level || ''}
          onChange={handleSelect('level')}
          disabled={loading}
        >
          <option value="">All</option>
          {levels.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
