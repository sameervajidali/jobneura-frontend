
// import React, { useState, useEffect } from 'react';
// import API from '../../services/axios';

// export default function QuizSidebar({ filters = {}, onChange }) {
//   const [cats, setCats] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

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

//   const handleSelect = (key) => (e) => {
//     onChange({ ...filters, [key]: e.target.value, page: 1 });
//   };

//   const programmingLanguages = ['Java', 'Python', 'Go', 'JavaScript', 'C++', 'C#'];

//   return (
//     <aside className="w-64 p-4 bg-white border-r space-y-6">
//       {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

//       <div>
//         <label className="block font-semibold mb-1">Category</label>
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

//       <div>
//         <label className="block font-semibold mb-1">Level</label>
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

//       {filters.category === 'Programming' && (
//         <div>
//           <label className="block font-semibold mb-1">Languages</label>
//           <div className="flex flex-col space-y-2">
//             {programmingLanguages.map(lang => (
//               <button
//                 key={lang}
//                 onClick={() => onChange({ ...filters, topic: lang, page: 1 })}
//                 className={`text-left px-3 py-2 rounded transition border hover:bg-blue-50 ${
//                   filters.topic === lang ? 'bg-blue-100 text-blue-600 font-bold border-blue-500' : 'border-gray-200'
//                 }`}
//               >
//                 {lang}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// }


// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect } from 'react';
import { FolderOpen, ChevronDown, ChevronRight, ListFilter, SlidersHorizontal } from 'lucide-react';
import API from '../../services/axios';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchFilters() {
      try {
        const [catRes, levelRes] = await Promise.all([
          API.get('/quizzes/grouped-topics'), // Expected format: [{ category: 'Programming', topics: ['Java', 'Python'] }]
          API.get('/quizzes/distinct/level'),
        ]);

        if (!isMounted) return;
        setCategories(catRes.data || []);
        setLevels(levelRes.data || []);
      } catch (err) {
        console.error('Sidebar fetch error:', err);
        setError('Failed to load filters.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFilters();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (cat) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
    onChange({ ...filters, category: cat, topic: '', page: 1 });
  };

  const handleTopicClick = (topic) => {
    onChange({ ...filters, topic, page: 1 });
  };

  const handleLevelChange = (e) => {
    onChange({ ...filters, level: e.target.value, page: 1 });
  };

  return (
    <aside className="w-full md:w-64 border-r bg-white dark:bg-gray-900 p-4 space-y-6 text-sm">
      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
        <ListFilter className="w-5 h-5" /> Filters
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Categories */}
      <div className="space-y-2">
        {categories.map(({ category, topics }) => (
          <div key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className="flex items-center justify-between w-full font-medium text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> {category}
              </span>
              {expandedCategory === category ? <ChevronDown /> : <ChevronRight />}
            </button>

            {expandedCategory === category && (
              <ul className="ml-6 mt-1 space-y-1">
                {topics.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => handleTopicClick(topic)}
                      className={`block w-full text-left px-2 py-1 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        filters.topic === topic ? 'font-semibold text-purple-600' : ''
                      }`}
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Level */}
      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Level
        </label>
        <select
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
          value={filters.level || ''}
          onChange={handleLevelChange}
        >
          <option value="">All Levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
