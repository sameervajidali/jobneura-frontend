// src/components/quizzes/QuizSidebar.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { FiFolder, FiFolderPlus, FiBookOpen, FiSearch, FiX } from 'react-icons/fi';
import { Code, Layout, Brush, Cpu, BookOpen } from 'lucide-react';
import quizService from '../../services/quizService';

const IconFor = name => {
  switch (name) {
    case 'Programming':          return <Code    className="w-5 h-5" />;
    case 'Software Development': return <Layout  className="w-5 h-5" />;
    case 'Design':               return <Brush   className="w-5 h-5" />;
    case 'AI':                   return <Cpu     className="w-5 h-5" />;
    default:                     return <BookOpen className="w-5 h-5" />;
  }
};

export default function QuizSidebar({ filters, onChange }) {
  const [open,    setOpen]    = useState(false);
  const [cats,    setCats]    = useState([]);
  const [tops,    setTops]    = useState([]);
  const [levels,  setLevels]  = useState([]);
  const [groups,  setGroups]  = useState([]);
  const [openCat, setOpenCat] = useState(null);
  const [q,       setQ]       = useState('');

  // 1) fetch flat lists
  useEffect(() => {
    quizService.fetchSidebarFilters()
      .then(({ categories, topics, levels }) => {
        setCats(categories);
        setTops(topics);
        setLevels(levels);
      })
      .catch(console.error);
  }, []);

  // 2) build grouped tree
  useEffect(() => {
    if (!cats.length || !tops.length) return;
    quizService.fetchGroupedTopics()
      .then(raw => {
        const catMap = Object.fromEntries(cats.map(c => [c._id, c.name]));
        const topMap = Object.fromEntries(tops.map(t => [t._id, t.name]));
        setGroups(raw.map(({ category, topics }) => ({
          id:      category,
          name:    catMap[category] || 'Unknown',
          topics:  topics.map(tid => ({
            id:   tid,
            name: topMap[tid] || 'Unknown'
          }))
        })));
      })
      .catch(console.error);
  }, [cats, tops]);

  // 3) client-side search
  const filtered = useMemo(() => {
    if (!q) return groups;
    const lc = q.toLowerCase();
    return groups
      .map(g => ({ 
        ...g, 
        topics: g.topics.filter(t => t.name.toLowerCase().includes(lc)) 
      }))
      .filter(g => g.name.toLowerCase().includes(lc) || g.topics.length);
  }, [groups, q]);

  // 4) pick handlers
  const pickCat   = cid => {
    onChange({ ...filters, category: cid, topic:'', page:1 });
    setOpenCat(openCat===cid ? null : cid);
  };
  const pickTopic = tid =>
    onChange({ ...filters, topic: tid, page:1 });

  return (
    <>
      {/* Mobile open button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={()=>setOpen(true)}
        aria-label="Open categories"
      >
        <FiSearch className="w-6 h-6"/>
      </button>

      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={()=>setOpen(false)}
      />

      <aside
        className={`
          fixed inset-y-0 left-0  b-t w-60 bg-white border-r  z-50
          transform transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
          md:sticky md:top-16      /* push below a 64px header */
          h-full pt-4             /* give top padding so it never overlaps */
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end pr-4 pb-2">
          <button onClick={()=>setOpen(false)} aria-label="Close sidebar">
            <FiX className="w-6 h-6"/>
          </button>
        </div>

        {/* Search */}
        <div className="relative px-4 pb-4">
          <FiSearch className="absolute top-3 left-6 text-gray-400"/>
          <input
            type="text"
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search…"
            className="pl-10 pr-4 py-2 w-full border rounded focus:ring-indigo-300 focus:border-indigo-300"
          />
        </div>

        {/* Category → Topic tree */}
        <nav className="px-2 space-y-2">
          {filtered.map(group => {
            const isOpen   = openCat===group.id;
            const isActive = filters.category===group.id;
            return (
              <div key={group.id}>
                <button
                  onClick={()=>pickCat(group.id)}
                  className={`
                    flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded
                    ${isActive
                      ? 'bg-indigo-100 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-100'}
                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                    transition
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isOpen
                      ? <FiFolderPlus className="w-5 h-5 text-indigo-600"/>
                      : <FiFolder     className="w-5 h-5 text-gray-600"/>}
                    {IconFor(group.name)}
                    <span>{group.name}</span>
                  </span>
                  <span className="text-gray-500">{isOpen ? '▾' : '▸'}</span>
                </button>

                {isOpen && group.topics.length > 0 && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {group.topics.map(t => {
                      const act = filters.topic===t.id;
                      return (
                        <li key={t.id}>
                          <button
                            onClick={()=>pickTopic(t.id)}
                            className={`
                              flex items-center w-full px-2 py-1 text-sm rounded
                              ${act
                                ? 'bg-indigo-200 text-indigo-800'
                                : 'hover:bg-gray-100'}
                              focus:outline-none focus:ring-2 focus:ring-indigo-400
                              transition
                            `}
                          >
                            <FiBookOpen className="w-4 h-4 text-gray-500"/>
                            <span className="ml-2">{t.name}</span>
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

        {/* Level dropdown */}
        <div className="px-4 mt-6 mb-4">
          <label htmlFor="level" className="block text-sm font-medium mb-1">
            Level
          </label>
          <select
            id="level"
            value={filters.level||''}
            onChange={e=>onChange({...filters, level: e.target.value, page:1})}
            className="w-full border rounded px-3 py-2 text-sm focus:ring-indigo-300 focus:border-indigo-300"
          >
            <option value="">All Levels</option>
            {levels.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </aside>
    </>
  );
}
