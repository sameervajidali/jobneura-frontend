// src/pages/dashboard/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/axios";
import { Search, Repeat, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended"); // 'recommended' | 'newest' | 'popular'
  const [filters, setFilters] = useState({ categories: [], difficulties: [] });

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        setLoading(true);
        const response = await API.get("/quizzes");
        setQuizzes(response.data.quizzes || []);
      } catch (err) {
        console.error(err);
        setError("Could not load quizzes.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  // Filter and sort
  const displayed = useMemo(() => {
    let list = [...quizzes];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (q) =>
          q.title.toLowerCase().includes(term) ||
          q.description.toLowerCase().includes(term)
      );
    }
    if (filters.categories.length) {
      list = list.filter(q => filters.categories.includes(q.category.name));
    }
    if (filters.difficulties.length) {
      list = list.filter(q => filters.difficulties.includes(q.difficulty.name));
    }
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "popular") {
      list.sort((a, b) => (b.attempts || 0) - (a.attempts || 0));
    }
    return list;
  }, [quizzes, searchTerm, filters, sortBy]);

  const toggleFilter = (key, value) => {
    setFilters((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(value)
          ? arr.filter((x) => x !== value)
          : [...arr, value],
      };
    });
  };

  if (loading)
    return (
      <div className="py-8 text-center text-gray-500">Loading quizzes…</div>
    );
  if (error)
    return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="flex gap-6">
      {/* Filters Sidebar */}
      <aside className="hidden lg:block w-60 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Filters
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Category
            </h4>
            {["Programming", "DevOps", "Data Science"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleFilter("categories", cat)}
                  className="form-checkbox"
                />
                {cat}
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Difficulty
            </h4>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.difficulties.includes(level)}
                  onChange={() => toggleFilter("difficulties", level)}
                  className="form-checkbox"
                />
                {level}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Available Quizzes
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sharpen your skills with bite-sized tests
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes…"
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 border rounded-lg text-sm bg-white dark:bg-gray-700"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "solid" : "outline"}
                onClick={() => setViewMode("grid")}
              >
                <Repeat size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "solid" : "outline"}
                onClick={() => setViewMode("list")}
              >
                <Clock size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Listing */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {displayed.map((q) => (
            <div key={q.id} className="…">
              <h3 className="…">{q.title}</h3>
              <p className="…">{q.description}</p>

              <div className="flex items-center justify-between mt-4 text-sm">
                {/* ← FIXED: render the name string, not the object */}
                <Badge variant="outline">{q.category.name}</Badge>
                <Badge variant="solid">{q.difficulty.name}</Badge>
              </div>

              {/* … rest of card … */}
            </div>
          ))}
        </div>

        {/* Quick Start Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/quizzes/random")}
          >
            <Repeat size={16} className="mr-2" /> Take Random Quiz
          </Button>
          <Button onClick={() => navigate("/dashboard/quizzes/resume")}>
            <Clock size={16} className="mr-2" /> Resume Last Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
