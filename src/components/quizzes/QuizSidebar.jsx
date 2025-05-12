
// // src/components/quizzes/QuizSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import quizService from '../../services/quizService';
// import {
//   ChevronDown,
//   ChevronRight,
//   Code,
//   Layout,
//   Brush,
//   Cpu,
//   BookOpen,
// } from 'lucide-react'; // all icons same style

// export default function QuizSidebar({ filters = {}, onChange }) {
//   const [groups, setGroups]   = useState([]);
//   const [levels, setLevels]   = useState([]);
//   const [openCat, setOpenCat] = useState(null);
//   const [error, setError]     = useState('');

//   useEffect(() => {
//     let mounted = true;
//     Promise.all([
//       quizService.fetchSidebarFilters(),
//       quizService.fetchGroupedTopics()
//     ])
//     .then(([{ levels }, grouped]) => {
//       if (!mounted) return;
//       setGroups(grouped);
//       setLevels(levels);
//     })
//     .catch(err => {
//       console.error(err);
//       if (mounted) setError('Failed to load filters.');
//     });
//     return () => { mounted = false; };
//   }, []);

//   const toggle = (cat) => setOpenCat(openCat === cat ? null : cat);
//   const pickCat = (cat) => {
//     onChange({ ...filters, category: cat, topic: '', page: 1 });
//     setOpenCat(cat);
//   };
//   const pickTopic = (t) =>
//     onChange({ ...filters, topic: t, page: 1 });
//   const pickLevel = (e) =>
//     onChange({ ...filters, level: e.target.value, page: 1 });

//   const IconFor = (name) => {
//     switch (name) {
//       case 'Programming': return <Code className="w-4 h-4" />;
//       case 'Software Development': return <Layout className="w-4 h-4" />;
//       case 'Design': return <Brush className="w-4 h-4" />;
//       case 'AI': return <Cpu className="w-4 h-4" />;
//       default: return <BookOpen className="w-4 h-4" />;
//     }
//   };

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 p-4 sticky top-20 h-[calc(100vh-5rem)]">
//       {error && (
//         <div role="alert" className="text-red-600 text-sm mb-3">
//           {error}
//         </div>
//       )}

//       <nav aria-label="Quiz categories" className="space-y-2">
//         {groups.map(({ category, topics }) => {
//           const isOpen = openCat === category;
//           const isActive = filters.category === category;
//           return (
//             <div key={category}>
//               <button
//                 onClick={() => pickCat(category)}
//                 className={`
//                   flex items-center justify-between w-full px-3 py-2
//                   text-sm font-medium rounded
//                   ${isActive ? 'bg-indigo-100 border-l-4 border-indigo-600' : 'hover:bg-gray-100'}
//                   focus:outline-none focus:ring-2 focus:ring-indigo-400
//                 `}
//                 aria-expanded={isOpen}
//                 aria-controls={`cat-${category}`}
//               >
//                 <span className="inline-flex items-center gap-2">
//                   {IconFor(category)}
//                   {category}
//                 </span>
//                 {isOpen
//                   ? <ChevronDown className="w-4 h-4 text-gray-500" />
//                   : <ChevronRight className="w-4 h-4 text-gray-400" />
//                 }
//               </button>

//               {isOpen && (
//                 <ul
//                   id={`cat-${category}`}
//                   role="menu"
//                   className="mt-1 ml-5 space-y-1"
//                 >
//                   {topics.map((t) => {
//                     const isTopicActive = filters.topic === t;
//                     return (
//                       <li key={t}>
//                         <button
//                           onClick={() => pickTopic(t)}
//                           className={`
//                             flex items-center w-full px-2 py-1 text-sm rounded
//                             ${isTopicActive ? 'bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100'}
//                             focus:outline-none focus:ring-2 focus:ring-indigo-400
//                           `}
//                           role="menuitem"
//                         >
//                           {/* you could map some topics to specific icons if you like */}
//                           <BookOpen className="w-4 h-4 opacity-60" />
//                           <span className="ml-2">{t}</span>
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       <div className="mt-6">
//         <label htmlFor="level-select" className="block text-sm font-medium mb-1">
//           Level
//         </label>
//         <select
//           id="level-select"
//           value={filters.level || ''}
//           onChange={pickLevel}
//           className="block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-indigo-400 focus:border-indigo-400"
//         >
//           <option value="">All Levels</option>
//           {levels.map((l) => (
//             <option key={l} value={l}>
//               {l}
//             </option>
//           ))}
//         </select>
//       </div>
//     </aside>
//   );
// }



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
} from 'lucide-react';

export default function QuizSidebar({ filters = {}, onChange }) {
  const [groups, setGroups] = useState([]);  // Groups for categories and topics
  const [levels, setLevels] = useState([]);  // Available levels
  const [categories, setCategories] = useState([]);  // Category names
  const [topics, setTopics] = useState([]);  // Topic names
  const [openCat, setOpenCat] = useState(null);  // Which category is open
  const [error, setError] = useState('');  // Error state

  useEffect(() => {
    let mounted = true;
    Promise.all([
      quizService.fetchSidebarFilters(),  // Fetch categories and levels
      quizService.fetchGroupedTopics(),   // Fetch grouped topics
    ])
      .then(([{ categories: categoriesData, levels: levelsData }, groupedTopics]) => {
        if (!mounted) return;
        setGroups(groupedTopics);  // Set grouped topics (categories + topics)
        setLevels(levelsData);     // Set levels
        setCategories(categoriesData); // Set categories

        // Log to verify data
        console.log("Categories Data:", categoriesData); // Log categories to check if names are populated
        console.log("Grouped Topics Data:", groupedTopics); // Log topics to check if names are populated
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError('Failed to load filters.');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const toggle = (cat) => setOpenCat(openCat === cat ? null : cat);  // Toggle category visibility

  const pickCat = (cat) => {
    onChange({ ...filters, category: cat, topic: '', page: 1 });
    setOpenCat(cat);
  };

  const pickTopic = (t) => onChange({ ...filters, topic: t, page: 1 });
  const pickLevel = (e) => onChange({ ...filters, level: e.target.value, page: 1 });

  const IconFor = (name) => {
    switch (name) {
      case 'Programming': return <Code className="w-4 h-4" />;
      case 'Software Development': return <Layout className="w-4 h-4" />;
      case 'Design': return <Brush className="w-4 h-4" />;
      case 'AI': return <Cpu className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Find category name by ID (if populated correctly, it will have a name field)
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    console.log(`Category Name for ${categoryId}:`, category); // Debugging line to see category data
    return category ? category.name : categoryId; // Return name or ID if not found
  };

  // Find topic name by ID (if populated correctly, it will have a name field)
  const getTopicName = (topicId) => {
    const topic = topics.find((topic) => topic._id === topicId);
    console.log(`Topic Name for ${topicId}:`, topic); // Debugging line to see topic data
    return topic ? topic.name : topicId; // Return name or ID if not found
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
                  {IconFor(getCategoryName(category))} {/* Display category icon */}
                  {getCategoryName(category)} {/* Display category name */}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {isOpen && (
                <ul id={`cat-${category}`} role="menu" className="mt-1 ml-5 space-y-1">
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
                          <BookOpen className="w-4 h-4 opacity-60" />
                          <span className="ml-2">{getTopicName(t)}</span> {/* Display topic name */}
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
