
import React, { useState, useEffect, useMemo } from "react";
import quizService from "../../services/quizService";
import { FiSearch, FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function QuizSidebar({ filters, onChange }) {
  const [cats, setCats] = useState([]);
  const [tops, setTops] = useState([]);
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [openCat, setOpenCat] = useState(null);
  const [q, setQ] = useState("");

  // Fetch data
  useEffect(() => {
    quizService.fetchSidebarFilters().then(({ categories, topics, levels }) => {
      setCats(categories);
      setTops(topics);
      setLevels(levels);
    });
  }, []);

  // Filter
  
useEffect(() => {
  if (!cats.length || !tops.length) return;

  quizService.fetchGroupedTopics().then((raw) => {
    const catMap = Object.fromEntries(cats.map((c) => [c._id, c.name]));
    const topMap = Object.fromEntries(tops.map((t) => [t._id, t.name]));

    const grouped = raw.map(({ category, topics }) => ({
      id: category,
      name: catMap[category] || "Unknown",
      topics: topics
        .map((t) => {
          const tid = typeof t === "string" ? t : t._id;
          return topMap[tid] ? { id: tid, name: topMap[tid] } : null;
        })
        .filter(Boolean),
    }));

    const allGroups = cats.map((cat) => {
      const found = grouped.find((g) => g.id === cat._id);
      return found || {
        id: cat._id,
        name: cat.name,
        topics: [],
      };
    });

    setGroups(allGroups);
  });
}, [cats, tops]);


  
  const filtered = useMemo(() => {
    if (!q) return groups;
    const lc = q.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        topics: g.topics.filter((t) => t.name.toLowerCase().includes(lc)),
      }))
      .filter((g) => g.name.toLowerCase().includes(lc) || g.topics.length);
  }, [groups, q]);

  // Handlers
  const pickCat = (cid) => {
    onChange({ ...filters, category: cid, topic: "", page: 1 });
    setOpenCat(openCat === cid ? null : cid);
  };
  const pickTopic = (tid) => onChange({ ...filters, topic: tid, page: 1 });

  return (
    <aside
  className={`
    flex flex-col
    bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-800
    rounded-xl shadow
    w-56 min-w-[13.5rem] max-w-xs
    p-3
    mt-4
    mr-4
    sticky top-24
    h-fit
    transition
  `}
>
  {/* Search */}
  <div className="relative mb-4">
    <span className="absolute left-2 top-2 text-gray-400">
      <FiSearch className="w-4 h-4" />
    </span>
    <input
      value={q}
      onChange={e => setQ(e.target.value)}
      placeholder="Search topics…"
      className="w-full pl-8 pr-2 py-1.5 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
    />
  </div>
  {/* Categories/Topics */}
  <nav className="space-y-1">
    {filtered.length === 0 && (
      <div className="text-center text-gray-400 text-xs py-10">
        No categories found.
      </div>
    )}
    {filtered.map((group) => {
      const isOpen = openCat === group.id;
      const isActive = filters.category === group.id;
      return (
        <div key={group.id}>
          <button
            onClick={() => pickCat(group.id)}
            className={`
              flex items-center w-full px-2 py-1.5 rounded-lg text-left transition
              font-semibold text-sm
              ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              }
            `}
          >
            {isOpen ? (
              <FiChevronDown className="mr-1" />
            ) : (
              <FiChevronRight className="mr-1" />
            )}
            {group.name}
            {isActive && (
              <span className="ml-auto px-2 py-0.5 bg-indigo-200 dark:bg-indigo-900 text-xs rounded-xl">
                Active
              </span>
            )}
          </button>
          {isOpen && group.topics.length > 0 && (
            <ul className="ml-4 mt-1 space-y-1">
              {group.topics.map((t) => {
                const act = filters.topic === t.id;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => pickTopic(t.id)}
                      className={`
                        w-full text-left px-2 py-1 rounded-md text-xs transition
                        ${
                          act
                            ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white"
                            : "hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                        }
                      `}
                    >
                      {t.name}
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
  <div className="mt-6">
    <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
      Level
    </label>
    <select
      value={filters.level || ""}
      onChange={e =>
        onChange({ ...filters, level: e.target.value, page: 1 })
      }
      className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 text-xs bg-gray-50 dark:bg-gray-800 focus:ring-indigo-300"
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
