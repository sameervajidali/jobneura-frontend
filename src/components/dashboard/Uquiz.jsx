
// src/pages/dashboard/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import API from "../../services/axios";
import { Search, Repeat, Clock } from "lucide-react";
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
  const [filters, setFilters] = useState({ categories: [], difficulties: [] });

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
      list = list.filter(
        ({ title, description }) =>
          title.toLowerCase().includes(term) ||
          description.toLowerCase().includes(term)
      );
    }
    if (filters.categories.length) {
      list = list.filter(
        ({ category }) =>
          category?.name && filters.categories.includes(category.name)
      );
    }
    if (filters.difficulties.length) {
      list = list.filter(
        ({ difficulty }) =>
          difficulty?.name && filters.difficulties.includes(difficulty.name)
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
    return (
      <div className="py-8 text-center text-red-500">{error}</div>
    );

  return (
    <div className="flex gap-8">
      <aside className="hidden xl:block w-64 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Filters
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Category
            </h4>
            <div className="space-y-2">
              {['Programming', 'DevOps', 'Data Science'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleFilter('categories', cat)}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Difficulty
            </h4>
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <label key={level} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.difficulties.includes(level)}
                    onChange={() => toggleFilter('difficulties', level)}
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 space-y-8">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Available Quizzes
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Sharpen your skills with bite-sized tests
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative flex-1 xl:flex-none">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes…"
                className="w-full xl:w-64 pl-12 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'solid' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                <Repeat size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'solid' : 'outline'}
                onClick={() => setViewMode('list')}
                size="sm"
              >
                <Clock size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }>
          {displayed.map((q) => {
            const catName = q.category?.name || 'Uncategorized';
            const diffName = q.level?.name || 'Unknown';
            const duration = q.duration ? `${q.duration} min` : '– min';

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {q.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" size="sm">
                      {catName}
                    </Badge>
                    <Badge
                      variant={
                        diffName === 'Beginner'
                          ? 'success'
                          : diffName === 'Intermediate'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {diffName}
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {q.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{q.questionsCount}</span>
                    <span>Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{duration}</span>
                  </div>
                </div>

                <Button
                  className="mt-6"
                  onClick={() => navigate(`/dashboard/quizzes/${q.id}`)}
                >
                  {q.progress ? 'Continue Quiz' : 'Start Quiz'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

