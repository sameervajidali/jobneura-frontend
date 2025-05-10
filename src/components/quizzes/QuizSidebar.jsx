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
import React, { useState, useEffect } from 'react';
import {
  Folder,
  Tag,
  Layers,
  BookOpen,
  Code,
  Package,
  Bookmark,
} from 'lucide-react';
import quizService from '../../services/quizService';

// Icon mapping for categories and topics
const categoryIcons = {
  Programming: <Folder className="w-5 h-5" />, 
  'Software Development': <Layers className="w-5 h-5" />, 
  Design: <Tag className="w-5 h-5" />, 
  AI: <Layers className="w-5 h-5" />,
};

const topicIcons = {
  Java: <BookOpen className="w-4 h-4" />,  
  Python: <Code className="w-4 h-4" />,  
  Go: <Package className="w-4 h-4" />,    
};

export default function QuizSidebar({ filters = {}, onChange }) {
  const [groups, setGroups] = useState([]);          // [{ category, topics: [] }, ...]
  const [levels, setLevels] = useState([]);          // ['Beginner', ...]
  const [expandedCat, setExpandedCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadFilters() {
      setLoading(true);
      setError('');
      try {
        const [grouped, sidebar] = await Promise.all([
          quizService.fetchGroupedTopics(),
          quizService.fetchSidebarFilters(),
        ]);
        if (!isMounted) return;
        setGroups(grouped);
        setLevels(sidebar.levels);
      } catch (err) {
        console.error('QuizSidebar fetch error:', err);
        if (isMounted) setError('Failed to load filters.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFilters();
    return () => { isMounted = false; };
  }, []);

  const handleCategoryClick = (category) => {
    const cat = category.category;
    setExpandedCat(prev => (prev === cat ? null : cat));
    onChange({ ...filters, category: cat, topic: '', page: 1 });
  };

  const handleTopicClick = (topic) => {
    setExpandedCat(filters.category);
    onChange({ ...filters, topic, page: 1 });
  };

  const handleLevelChange = (e) => {
    onChange({ ...filters, level: e.target.value, page: 1 });
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 p-4 space-y-6 border-r">
      {loading && <p className="text-center text-gray-500">Loading filters…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Categories */}
      <div className="space-y-2">
        {groups.map(({ category, topics }) => (
          <div key={category}>
            <button
              onClick={() => handleCategoryClick({ category })}
              className="flex items-center justify-between w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-2">
                {categoryIcons[category] || <Folder className="w-5 h-5" />} {category}
              </span>
              {expandedCat === category ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {expandedCat === category && (
              <ul className="ml-6 mt-1 space-y-1">
                {topics.map(topic => (
                  <li key={topic}>
                    <button
                      onClick={() => handleTopicClick(topic)}
                      className={`flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        filters.topic === topic ? 'bg-blue-100 text-blue-600 font-semibold' : ''
                      }`}
                    >
                      {topicIcons[topic] || <Bookmark className="w-4 h-4" />} {topic}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Level Selector */}
      <div>
        <label className="block mb-1 font-medium">Level</label>
        <select
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
          value={filters.level || ''}
          onChange={handleLevelChange}
          disabled={loading}
        >
          <option value="">All Levels</option>
          {levels.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
