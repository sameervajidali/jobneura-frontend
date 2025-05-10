// // src/components/quizzes/QuizSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import { FolderOpen, ChevronDown, ChevronRight, ListFilter, SlidersHorizontal } from 'lucide-react';
// import API from '../../services/axios';

// export default function QuizSidebar({ filters = {}, onChange }) {
//   const [categories, setCategories] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchFilters() {
//       try {
//         const [catRes, levelRes] = await Promise.all([
//           API.get('/quizzes/grouped-topics'), // Expected format: [{ category: 'Programming', topics: ['Java', 'Python'] }]
//           API.get('/quizzes/distinct/level'),
//         ]);

//         if (!isMounted) return;
//         setCategories(catRes.data || []);
//         setLevels(levelRes.data || []);
//       } catch (err) {
//         console.error('Sidebar fetch error:', err);
//         setError('Failed to load filters.');
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     fetchFilters();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleCategoryClick = (cat) => {
//     setExpandedCategory((prev) => (prev === cat ? null : cat));
//     onChange({ ...filters, category: cat, topic: '', page: 1 });
//   };

//   const handleTopicClick = (topic) => {
//     onChange({ ...filters, topic, page: 1 });
//   };

//   const handleLevelChange = (e) => {
//     onChange({ ...filters, level: e.target.value, page: 1 });
//   };

//   return (
//     <aside className="w-full md:w-64 border-r bg-white dark:bg-gray-900 p-4 space-y-6 text-sm">
//       <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
//         <ListFilter className="w-5 h-5" /> Filters
//       </h2>

//       {error && <p className="text-red-600 text-sm">{error}</p>}

//       {/* Categories */}
//       <div className="space-y-2">
//         {categories.map(({ category, topics }) => (
//           <div key={category}>
//             <button
//               onClick={() => handleCategoryClick(category)}
//               className="flex items-center justify-between w-full font-medium text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <span className="flex items-center gap-2">
//                 <FolderOpen className="w-4 h-4" /> {category}
//               </span>
//               {expandedCategory === category ? <ChevronDown /> : <ChevronRight />}
//             </button>

//             {expandedCategory === category && (
//               <ul className="ml-6 mt-1 space-y-1">
//                 {topics.map((topic) => (
//                   <li key={topic}>
//                     <button
//                       onClick={() => handleTopicClick(topic)}
//                       className={`block w-full text-left px-2 py-1 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
//                         filters.topic === topic ? 'font-semibold text-purple-600' : ''
//                       }`}
//                     >
//                       {topic}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Level */}
//       <div>
//         <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-2">
//           <SlidersHorizontal className="w-4 h-4" /> Level
//         </label>
//         <select
//           className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
//           value={filters.level || ''}
//           onChange={handleLevelChange}
//         >
//           <option value="">All Levels</option>
//           {levels.map((l) => (
//             <option key={l} value={l}>{l}</option>
//           ))}
//         </select>
//       </div>
//     </aside>
//   );
// }


// src/components/quizzes/QuizSidebar.jsx
import React, { useEffect, useState } from 'react';
import { FolderClosed, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import quizService from '../../services/quizService';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [levels, setLevels] = useState([]);
  const [expandedCats, setExpandedCats] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      setLoading(true);
      setError('');
      try {
        const [catList, topicList, levelList] = await Promise.all([
          quizService.getDistinct('category'),
          quizService.getDistinct('topic'),
          quizService.getDistinct('level'),
        ]);

        setCategories(catList);
        setTopics(topicList);
        setLevels(levelList);
      } catch (err) {
        console.error('Failed to load filters', err);
        setError('Failed to load filters.');
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  const handleToggle = (category) => {
    setExpandedCats((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSelect = (key, value) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const groupedTopics = categories.reduce((acc, cat) => {
    acc[cat] = topics.filter((t) => t.toLowerCase().includes(cat.toLowerCase()));
    return acc;
  }, {});

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 text-sm p-4 border-r space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* Categories & Topics */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <div
                onClick={() => handleToggle(cat)}
                className="flex items-center cursor-pointer hover:text-indigo-600"
              >
                {expandedCats[cat] ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                <FolderClosed className="w-4 h-4 mr-2" />
                <span className="font-medium">{cat}</span>
              </div>
              {expandedCats[cat] && (
                <ul className="ml-6 mt-1 space-y-1">
                  {groupedTopics[cat]?.length ? (
                    groupedTopics[cat].map((topic) => (
                      <li
                        key={topic}
                        onClick={() => handleSelect('topic', topic)}
                        className={`flex items-center cursor-pointer hover:text-blue-600 ${
                          filters.topic === topic ? 'text-blue-600 font-semibold' : ''
                        }`}
                      >
                        <BookOpen className="w-4 h-4 mr-2" /> {topic}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-xs ml-1">No topics</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Levels */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Level</label>
        <select
          className="w-full p-2 border rounded text-sm dark:bg-gray-800"
          value={filters.level || ''}
          onChange={(e) => handleSelect('level', e.target.value)}
          disabled={loading}
        >
          <option value="">All Levels</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
