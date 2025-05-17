// src/components/quizzes/QuizLeaderboard.jsx
import React, { useState, useEffect } from "react";
import quizService from "../../services/quizService.js";
import { Award } from "lucide-react";

const TAB_OPTIONS = [
  { key: "week", label: "Weekly" },
  { key: "month", label: "Monthly" },
];

const RANK_ICONS = [
  <Award className="w-6 h-6 text-yellow-400 drop-shadow-sm" aria-label="Gold Trophy" />,
  <Award className="w-6 h-6 text-gray-400 drop-shadow-sm" aria-label="Silver Trophy" />,
  <Award className="w-6 h-6 text-amber-700 drop-shadow-sm" aria-label="Bronze Trophy" />,
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function QuizLeaderboard({ filters = {} }) {
  const { category, topic, level } = filters;
  const [tab, setTab] = useState("week");
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    const params = { timePeriod: tab, page, limit };
    if (category) params.category = category;
    if (topic) params.topic = topic;
    if (level) params.level = level;

    quizService
      .getLeaderboard(params)
      .then(({ items, total: tot }) => {
        if (!mounted) return;
        setEntries(Array.isArray(items) ? items : []);
        setTotal(typeof tot === "number" ? tot : 0);
      })
      .catch((err) => {
        console.error("Leaderboard fetch error:", err);
        if (mounted)
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load leaderboard."
          );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [category, topic, level, tab, page, limit]);

  return (
    <aside
      className="
        w-full lg:w-72 shrink-0
        bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
        rounded-2xl p-4
        font-sans text-base
        sticky top-22 h-fit
        transition
      "
    >
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
        Leaderboard
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        {TAB_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => {
              setTab(opt.key);
              setPage(1);
            }}
            className={`flex-1 py-1.5 text-sm font-semibold rounded-xl transition-all
              ${
                tab === opt.key
                  ? "bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500 py-4">Loading…</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}

      {/* Entries */}
      {!loading && !error && entries.length > 0 && (
        <ol className="space-y-3">
          {entries.map((e, i) => (
            <li
              key={e._id || i}
              className={`
                grid grid-cols-[32px_1fr_auto] items-center gap-3
                px-3 py-3 rounded-xl
                bg-white dark:bg-gray-800
                ${i < 3 ? "border border-indigo-200 dark:border-indigo-800 shadow-md" : "border border-gray-100 dark:border-gray-800 shadow-sm"}
                hover:shadow-lg transition
              `}
            >
              {/* Rank Icon or Number */}
              <div className="flex items-center justify-center w-8 h-8">
                {i < 3
                  ? RANK_ICONS[i]
                  : <span className="text-gray-400 font-semibold">{i + 1}</span>}
              </div>
              {/* Avatar & Name/Attempts */}
              <div className="flex items-center gap-2 min-w-0">
                {e.user?.avatar ? (
                  <img
                    src={e.user.avatar}
                    alt={e.user.name || "User"}
                    className={`
                      w-8 h-8 rounded-full border-2 object-cover
                      ${i === 0
                        ? "border-yellow-400"
                        : i === 1
                        ? "border-gray-400"
                        : i === 2
                        ? "border-amber-700"
                        : "border-indigo-200"}
                      shadow
                    `}
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold shadow">
                    {getInitials(e.user?.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <span className="font-medium text-gray-900 dark:text-gray-100 truncate block">
                    {e.user?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    {e.attempts ?? 1} attempt{(e.attempts ?? 1) > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              {/* Points */}
              <div className="flex flex-col items-end">
                <span className="text-indigo-700 dark:text-indigo-300 font-bold text-base">
                  {e.score ?? 0} pts
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* Empty */}
      {!loading && !error && entries.length === 0 && (
        <p className="text-center text-gray-500 py-4">No results yet.</p>
      )}

      {/* Pagination */}
      {!loading && total > limit && (
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
            disabled={page * limit >= total}
            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </aside>
  );
}
