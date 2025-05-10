
// // src/components/quizzes/QuizSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import API from '../../services/axios';

// export default function QuizSidebar({ filters = {}, onChange }) {
//   const [cats,   setCats]   = useState([]);
//   const [topics,setTopics] = useState([]);
//   const [levels,setLevels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState('');

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchDistincts() {
//       setLoading(true);
//       setError('');
//       try {
//         const [catRes, topicRes, levelRes] = await Promise.all([
//           API.get('/quizzes/distinct/category'),
//           API.get('/quizzes/distinct/topic'),
//           API.get('/quizzes/distinct/level'),
//         ]);

//         if (!isMounted) return;

//         // Be defensive: ensure we got arrays
//         setCats(Array.isArray(catRes.data) ? catRes.data : []);
//         setTopics(Array.isArray(topicRes.data) ? topicRes.data : []);
//         setLevels(Array.isArray(levelRes.data) ? levelRes.data : []);
//       } catch (err) {
//         if (!isMounted) return;
//         console.error('QuizSidebar fetch error:', err);
//         setError('Failed to load filters.');
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     fetchDistincts();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // helper to emit a change and reset page to 1
//   const handleSelect = (key) => (e) => {
//     onChange({ ...filters, [key]: e.target.value, page: 1 });
//   };

//   return (
//     <aside className="w-1/5 p-4 bg-white border-r space-y-6">
//       {error && (
//         <div className="text-red-600 text-sm mb-4">
//           {error}
//         </div>
//       )}

//       {/* Category */}
//       <div>
//         <label className="block font-medium mb-1">Category</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.category || ''}
//           onChange={handleSelect('category')}
//           disabled={loading}
//         >
//           <option value="">All</option>
//           {cats.map(c => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       {/* Topic */}
//       <div>
//         <label className="block font-medium mb-1">Topic</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.topic || ''}
//           onChange={handleSelect('topic')}
//           disabled={loading}
//         >
//           <option value="">All</option>
//           {topics.map(t => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       {/* Level */}
//       <div>
//         <label className="block font-medium mb-1">Level</label>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.level || ''}
//           onChange={handleSelect('level')}
//           disabled={loading}
//         >
//           <option value="">All</option>
//           {levels.map(l => (
//             <option key={l} value={l}>{l}</option>
//           ))}
//         </select>
//       </div>
//     </aside>
//   );
// }




import React, { useState, useEffect } from 'react';
import API from '../../services/axios';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [cats, setCats] = useState([]);
  const [topics, setTopics] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleSelect = (key) => (e) => {
    onChange({ ...filters, [key]: e.target.value, page: 1 });
  };

  const programmingLanguages = ['Java', 'Python', 'Go', 'JavaScript', 'C++', 'C#'];

  return (
    <aside className="w-64 p-4 bg-white border-r space-y-6">
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <div>
        <label className="block font-semibold mb-1">Category</label>
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

      <div>
        <label className="block font-semibold mb-1">Level</label>
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

      {filters.category === 'Programming' && (
        <div>
          <label className="block font-semibold mb-1">Languages</label>
          <div className="flex flex-col space-y-2">
            {programmingLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => onChange({ ...filters, topic: lang, page: 1 })}
                className={`text-left px-3 py-2 rounded transition border hover:bg-blue-50 ${
                  filters.topic === lang ? 'bg-blue-100 text-blue-600 font-bold border-blue-500' : 'border-gray-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
