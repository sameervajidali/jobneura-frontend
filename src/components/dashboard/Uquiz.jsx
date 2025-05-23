
// src/pages/dashboard/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/axios";
import { Search, RefreshCw, Clock } from "lucide-react";
import {Badge} from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({ categories: [], levels: [] });

  useEffect(() => {
    API.get("/quizzes")
      .then(({ data }) => setQuizzes(data.quizzes || []))
      .catch(() => setError("Could not load quizzes."))
      .finally(() => setLoading(false));
  }, []);

  const displayed = useMemo(() => {
    let list = [...quizzes];
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter(({ title, description }) =>
        title.toLowerCase().includes(term) ||
        description.toLowerCase().includes(term)
      );
    }
    if (filters.categories.length) {
      list = list.filter(q =>
        filters.categories.includes(q.category?.name)
      );
    }
    if (filters.levels.length) {
      list = list.filter(q =>
        filters.levels.includes(q.level)
      );
    }
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "popular") {
      list.sort((a, b) => (b.attempts || 0) - (a.attempts || 0));
    }
    return list;
  }, [quizzes, searchTerm, filters, sortBy]);

  const toggleFilter = (key, value) => {
    setFilters(f => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(value) ? arr.filter(x => x!==value) : [...arr, value] };
    });
  };

  if (loading)
    return <div className="py-8 text-center text-gray-500">Loading quizzes…</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="flex gap-8">
      {/* Filters Sidebar */}
      <aside className="hidden xl:block w-64 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Filters</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Category</h4>
            <div className="space-y-2">
              {quizzes.map(q => q.category?.name).filter((v,i,a)=>v && a.indexOf(v)===i).map(cat => (
                <label key={cat} className="flex items-center gap-3">
                  <input type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={()=>toggleFilter('categories',cat)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Level</h4>
            <div className="space-y-2">
              {quizzes.map(q=>q.level).filter((v,i,a)=>v && a.indexOf(v)===i).map(lvl=>(
                <label key={lvl} className="flex items-center gap-3">
                  <input type="checkbox"
                    checked={filters.levels.includes(lvl)}
                    onChange={()=>toggleFilter('levels',lvl)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  <span className="text-gray-700 dark:text-gray-300">{lvl}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Available Quizzes</h1>
            <p className="text-gray-600 dark:text-gray-400">Sharpen your skills with bite-sized tests</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative flex-1 xl:flex-none">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes…"
                className="w-full xl:w-64 pl-12 py-2 pr-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
              />
            </div>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              className="py-2 px-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant={viewMode==='grid'?'outline':'ghost'} onClick={()=>setViewMode('grid')}><RefreshCw size={16}/></Button>
              <Button size="sm" variant={viewMode==='list'?'outline':'ghost'} onClick={()=>setViewMode('list')}><Clock size={16}/></Button>
            </div>
          </div>
        </div>

        {/* Quiz Cards */}
        <div className={viewMode==='grid'?'grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3':'space-y-8'}>
          {displayed.map(q=>{
            const id = q._id;
            const title = q.title;
            const cat = q.category?.name||'Uncategorized';
            const top = q.topic?.name||'General';
            const lvl = q.level||'Intermediate';
            const count = q.questions?.length??0;
            const duration = q.timeEstimate ? `${q.timeEstimate} min`:'– min';

            const lvlClasses = lvl==='Beginner'? 'bg-green-100 text-green-800': lvl==='Advanced'? 'bg-red-100 text-red-800':'bg-yellow-100 text-yellow-800';

            return (
              <div key={id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs">{cat}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{top}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lvlClasses}`}>{lvl}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-500 mb-4">
                  <span><strong>{count}</strong> Questions</span>
                  <span className="flex items-center gap-1"><Clock size={14}/>{duration}</span>
                </div>
                <Button onClick={()=>navigate(`/dashboard/quizzes/${id}`)}>Start Quiz</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

