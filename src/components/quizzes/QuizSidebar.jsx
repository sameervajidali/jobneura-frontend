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
  ChevronDown,
  ChevronRight,
  Code,
  Layout,
  Brush,
  Cpu,
  BookOpen,
} from 'lucide-react'; // all icons same style

export default function QuizSidebar({ filters = {}, onChange }) {
  const [groups, setGroups]   = useState([]);
  const [levels, setLevels]   = useState([]);
  const [openCat, setOpenCat] = useState(null);
  const [error, setError]     = useState('');

  useEffect(() => {
    let mounted = true;
    Promise.all([
      quizService.fetchSidebarFilters(),
      quizService.fetchGroupedTopics()
    ])
    .then(([{ levels }, grouped]) => {
      if (!mounted) return;
      setGroups(grouped);
      setLevels(levels);
    })
    .catch(err => {
      console.error(err);
      if (mounted) setError('Failed to load filters.');
    });
    return () => { mounted = false; };
  }, []);

  const toggle = (cat) => setOpenCat(openCat === cat ? null : cat);
  const pickCat = (cat) => {
    onChange({ ...filters, category: cat, topic: '', page: 1 });
    setOpenCat(cat);
  };
  const pickTopic = (t) =>
    onChange({ ...filters, topic: t, page: 1 });
  const pickLevel = (e) =>
    onChange({ ...filters, level: e.target.value, page: 1 });

  const IconFor = (name) => {
    switch (name) {
      case 'Programming': return <Code className="w-4 h-4" />;
      case 'Software Development': return <Layout className="w-4 h-4" />;
      case 'Design': return <Brush className="w-4 h-4" />;
      case 'AI': return <Cpu className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 sticky top-20 h-[calc(100vh-5rem)]">
      {error && (
        <div role="alert" className="text-red-600 text-sm mb-3">
          {error}
        </div>
      )}

      <nav aria-label="Quiz categories" className="space-y-2">
        {groups.map(({ category, topics }) => {
          const isOpen = openCat === category;
          const isActive = filters.category === category;
          return (
            <div key={category}>
              <button
                onClick={() => pickCat(category)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 
                  text-sm font-medium rounded
                  ${isActive ? 'bg-indigo-100 border-l-4 border-indigo-600' : 'hover:bg-gray-100'}
                  focus:outline-none focus:ring-2 focus:ring-indigo-400
                `}
                aria-expanded={isOpen}
                aria-controls={`cat-${category}`}
              >
                <span className="inline-flex items-center gap-2">
                  {IconFor(category)}
                  {category}
                </span>
                {isOpen
                  ? <ChevronDown className="w-4 h-4 text-gray-500" />
                  : <ChevronRight className="w-4 h-4 text-gray-400" />
                }
              </button>

              {isOpen && (
                <ul
                  id={`cat-${category}`}
                  role="menu"
                  className="mt-1 ml-5 space-y-1"
                >
                  {topics.map((t) => {
                    const isTopicActive = filters.topic === t;
                    return (
                      <li key={t}>
                        <button
                          onClick={() => pickTopic(t)}
                          className={`
                            flex items-center w-full px-2 py-1 text-sm rounded
                            ${isTopicActive ? 'bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100'}
                            focus:outline-none focus:ring-2 focus:ring-indigo-400
                          `}
                          role="menuitem"
                        >
                          {/* you could map some topics to specific icons if you like */}
                          <BookOpen className="w-4 h-4 opacity-60" />
                          <span className="ml-2">{t}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-6">
        <label htmlFor="level-select" className="block text-sm font-medium mb-1">
          Level
        </label>
        <select
          id="level-select"
          value={filters.level || ''}
          onChange={pickLevel}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-400 focus:border-indigo-400"
        >
          <option value="">All Levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
