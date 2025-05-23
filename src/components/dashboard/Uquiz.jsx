
// src/pages/dashboard/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/axios";
import quizService from "../../services/quizService";
import { Search, RefreshCw, Clock } from "lucide-react";
import {Badge} from "../ui/badge";
import {Button} from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({ levels: [], categories: [] });

  useEffect(() => {
    // Fetch quizzes
    API.get("/quizzes")
      .then(({ data }) => setQuizzes(data.quizzes || []))
      .catch(() => setError("Could not load quizzes."));

    // Fetch categories
    quizService.fetchSidebarFilters()
      .then(({ categories }) => setCats(categories))
      .catch(() => {});

    setLoading(false);
  }, []);

  // Static levels
  const distinctLevels = ["Beginner", "Intermediate", "Advanced"];

  const displayed = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return quizzes
      .filter(q => {
        const title = (q.title || "").toLowerCase();
        const desc = (q.description || "").toLowerCase();
        if (term && !title.includes(term) && !desc.includes(term)) return false;
        if (filters.levels.length && !filters.levels.includes(q.level)) return false;
        const catId = q.category?._id;
        if (filters.categories.length && !filters.categories.includes(catId)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "popular") return (b.attempts || 0) - (a.attempts || 0);
        return 0;
      });
  }, [quizzes, searchTerm, filters, sortBy]);

  // Sort categories alphabetically for display
  const sortedCats = useMemo(
    () => [...cats].sort((a, b) => a.name.localeCompare(b.name)),
    [cats]
  );

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(x => x !== value)
        : [...prev[key], value]
    }));
  };

  if (loading) return <div className="py-8 text-center text-gray-500">Loading…</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <aside className="hidden xl:block w-64 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Filters</h3>
        <div className="space-y-6">
          {/* Levels */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Level</h4>
            {distinctLevels.map(lvl => (
              <label key={lvl} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={filters.levels.includes(lvl)}
                  onChange={() => toggleFilter('levels', lvl)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">{lvl}</span>
              </label>
            ))}
          </div>
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Category</h4>
            {cats.map(({ _id, name }) => (
              <label key={_id} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(_id)}
                  onChange={() => toggleFilter('categories', _id)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">{name}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Available Quizzes</h1>
            <p className="text-gray-600 dark:text-gray-400">Sharpen your skills…</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative flex-1 xl:flex-none">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search…"
                className="w-full xl:w-64 pl-12 py-2 pr-4 border rounded-lg focus:ring-indigo-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2 px-4 border rounded-lg text-sm"
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
          {displayed.map(q => (
            <div key={q._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{q.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" size="sm">{q.topic?.name || 'General'}</Badge>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${q.level==='Beginner'?'bg-green-100 text-green-800':q.level==='Advanced'?'bg-red-100 text-red-800':'bg-yellow-100 text-yellow-800'}`}>{q.level}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-500 mb-4">
                <span><strong>{Array.isArray(q.questions)?q.questions.length:0}</strong> Questions</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {q.duration?`${q.duration} min`:'– min'}</span>
              </div>
              <Button onClick={()=>navigate(`/dashboard/quizzes/${q._id}`)}>Start Quiz</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

