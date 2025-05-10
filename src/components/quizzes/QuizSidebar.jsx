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
  FaJava,
  FaPython,
  FaPaintBrush,
  FaBrain,
  FaCogs,
  FaPalette,
  FaNetworkWired,
} from 'react-icons/fa';
import { SiGo } from 'react-icons/si';
import { MdDesignServices } from 'react-icons/md';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { BsUiChecksGrid } from 'react-icons/bs';
import { AiOutlineBulb } from 'react-icons/ai';

const categoryData = [
  {
    name: 'Programming',
    icon: <FaCogs />,
    topics: [
      { name: 'Java', icon: <FaJava /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'Go', icon: <SiGo /> },
    ],
  },
  {
    name: 'Design',
    icon: <MdDesignServices />,
    topics: [
      { name: 'UX', icon: <AiOutlineBulb /> },
      { name: 'UI', icon: <BsUiChecksGrid /> },
    ],
  },
  {
    name: 'AI',
    icon: <GiArtificialIntelligence />,
    topics: [
      { name: 'ML Basics', icon: <FaBrain /> },
      { name: 'Deep Learning', icon: <FaNetworkWired /> },
    ],
  },
];

const levels = ['Beginner', 'Intermediate', 'Expert'];

export default function QuizSidebar({ filters = {}, onChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setSelectedTopic(null);
    onChange({ ...filters, category: category.name, topic: '', page: 1 });
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.name);
    onChange({ ...filters, topic: topic.name, page: 1 });
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    onChange({ ...filters, level: e.target.value, page: 1 });
  };

  return (
    <aside className="w-1/5 p-4 bg-white border-r space-y-6">
      {/* Categories and Topics */}
      {categoryData.map((category) => (
        <div key={category.name}>
          <button
            className={`flex items-center w-full text-left p-2 rounded ${
              selectedCategory === category.name ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.name}</span>
          </button>
          {selectedCategory === category.name && (
            <ul className="ml-6 mt-2 space-y-1">
              {category.topics.map((topic) => (
                <li key={topic.name}>
                  <button
                    className={`flex items-center w-full text-left p-2 rounded ${
                      selectedTopic === topic.name ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleTopicClick(topic)}
                  >
                    <span className="mr-2">{topic.icon}</span>
                    <span>{topic.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Level Selector */}
      <div>
        <label className="block font-medium mb-1">Level</label>
        <select
          className="w-full border rounded p-2"
          value={selectedLevel || ''}
          onChange={handleLevelChange}
        >
          <option value="">All Levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
