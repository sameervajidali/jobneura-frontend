// // src/components/quizzes/QuizSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronRight, Folder, Tag, Layers, Bookmark } from 'lucide-react';
// import {
  
//   BookOpen,
  
//   Code,
//   Package,
  
// } from 'lucide-react';
// import quizService from '../../services/quizService';

// // Icon mapping for categories and topics
// const categoryIcons = {
//   Programming: <Folder className="w-5 h-5" />,
//   'Software Development': <Layers className="w-5 h-5" />,
//   Design: <Tag className="w-5 h-5" />,
//   AI: <Layers className="w-5 h-5" />,
// };

// const topicIcons = {
//   Java: <BookOpen className="w-4 h-4" />,
//   Python: <Code className="w-4 h-4" />,
//   Go: <Package className="w-4 h-4" />,
// };

// export default function QuizSidebar({ filters = {}, onChange }) {
//   const [groups, setGroups] = useState([]);          // [{ category, topics: [] }, ...]
//   const [levels, setLevels] = useState([]);          // ['Beginner', ...]
//   const [expandedCat, setExpandedCat] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let isMounted = true;
//     async function loadFilters() {
//       setLoading(true);
//       setError('');
//       try {
//         const [grouped, sidebar] = await Promise.all([
//           quizService.fetchGroupedTopics(),
//           quizService.fetchSidebarFilters(),
//         ]);
//         if (!isMounted) return;
//         setGroups(grouped);
//         setLevels(sidebar.levels);
//       } catch (err) {
//         console.error('QuizSidebar fetch error:', err);
//         if (isMounted) setError('Failed to load filters.');
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }
//     loadFilters();
//     return () => { isMounted = false; };
//   }, []);

//   const handleCategoryClick = (category) => {
//     const cat = category.category;
//     setExpandedCat(prev => (prev === cat ? null : cat));
//     onChange({ ...filters, category: cat, topic: '', page: 1 });
//   };

//   const handleTopicClick = (topic) => {
//     setExpandedCat(filters.category);
//     onChange({ ...filters, topic, page: 1 });
//   };

//   const handleLevelChange = (e) => {
//     onChange({ ...filters, level: e.target.value, page: 1 });
//   };

//   return (
//     <aside className="w-64 bg-white dark:bg-gray-900 p-4 space-y-6 border-r">
//       {loading && <p className="text-center text-gray-500">Loading filters…</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {/* Categories */}
//       <div className="space-y-2">
//         {groups.map(({ category, topics }) => (
//           <div key={category}>
//             <button
//               onClick={() => handleCategoryClick({ category })}
//               className="flex items-center justify-between w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               <span className="flex items-center gap-2">
//                 {categoryIcons[category] || <Folder className="w-5 h-5" />} {category}
//               </span>
//               {expandedCat === category ? (
//                 <ChevronDown className="w-4 h-4" />
//               ) : (
//                 <ChevronRight className="w-4 h-4" />
//               )}
//             </button>
//             {expandedCat === category && (
//               <ul className="ml-6 mt-1 space-y-1">
//                 {topics.map(topic => (
//                   <li key={topic}>
//                     <button
//                       onClick={() => handleTopicClick(topic)}
//                       className={`flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
//                         filters.topic === topic ? 'bg-blue-100 text-blue-600 font-semibold' : ''
//                       }`}
//                     >
//                       {topicIcons[topic] || <Bookmark className="w-4 h-4" />} {topic}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Level Selector */}
//       <div>
//         <label className="block mb-1 font-medium">Level</label>
//         <select
//           className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
//           value={filters.level || ''}
//           onChange={handleLevelChange}
//           disabled={loading}
//         >
//           <option value="">All Levels</option>
//           {levels.map(lvl => (
//             <option key={lvl} value={lvl}>{lvl}</option>
//           ))}
//         </select>
//       </div>
//     </aside>
//   );
// }




// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBrain,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiPython,
  SiGo,
  SiReact,
  SiMongodb,
} from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdWidgets } from 'react-icons/md';

const CATEGORY_ICONS = {
  Programming: <FaLaptopCode />,
  'Software Development': <MdWidgets />,
  Design: <FaPaintBrush />,
  AI: <GiArtificialIntelligence />,
};

const TOPIC_ICONS = {
  JavaScript: <SiJavascript />,
  Python: <SiPython />,
  Go: <SiGo />,
  React: <SiReact />,
  MongoDB: <SiMongodb />,
  // add more mappings here...
};

export default function QuizSidebar({ filters = {}, onChange }) {
  const [groups, setGroups] = useState([]);
  const [levels, setLevels] = useState([]);
  const [expandedCat, setExpandedCat] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ categories, levels }, grouped] = await Promise.all([
          quizService.fetchSidebarFilters(),
          quizService.fetchGroupedTopics()
        ]);
        if (!mounted) return;
        // expect grouped = [{ category, topics: [ 'JS', 'Python', ... ] }, ...]
        setGroups(grouped);
        setLevels(levels);
      } catch (err) {
        console.error('Sidebar load error', err);
        if (mounted) setError('Failed to load filters.');
      }
    })();
    return () => { mounted = false; };
  }, []);

  const toggleCat = (cat) =>
    setExpandedCat(expandedCat === cat ? null : cat);

  const selectCategory = (cat) => {
    onChange({ ...filters, category: cat, topic: '', page: 1 });
    setExpandedCat(cat);
  };

  const selectTopic = (topic) => {
    onChange({ ...filters, topic, page: 1 });
  };

  const selectLevel = (e) => {
    onChange({ ...filters, level: e.target.value, page: 1 });
  };

  return (
    <aside className="w-64 bg-white border-r p-4 sticky top-0 h-screen overflow-y-auto">
      {error && (
        <div className="text-red-600 mb-4 text-sm">{error}</div>
      )}

      <nav>
        {groups.map(({ category, topics }) => (
          <div key={category} className="mb-3">
            <button
              onClick={() => selectCategory(category)}
              className={`flex items-center justify-between w-full p-2 rounded-lg font-medium transition
                ${filters.category === category
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'}
              `}
            >
              <span className="flex items-center gap-2">
                {CATEGORY_ICONS[category] || <MdWidgets />}
                {category}
              </span>
              <span>
                {expandedCat === category
                  ? <FaChevronDown />
                  : <FaChevronRight />}
              </span>
            </button>
            {expandedCat === category && (
              <ul className="mt-1 ml-6 space-y-1">
                {topics.map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => selectTopic(t)}
                      className={`flex items-center w-full p-1 rounded transition text-sm
                        ${filters.topic === t
                          ? 'bg-indigo-200 text-indigo-800'
                          : 'hover:bg-gray-100'}
                      `}
                    >
                      {TOPIC_ICONS[t] || <FaLaptopCode className="opacity-60" />}
                      <span className="ml-2">{t}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-6">
        <label className="block font-medium mb-1">Level</label>
        <select
          value={filters.level || ''}
          onChange={selectLevel}
          className="w-full border rounded p-2"
        >
          <option value="">All Levels</option>
          {levels.map(l => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
