// src/components/dashboard/StatsCards.jsx
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBookOpen,
  FaFileAlt,
  FaAward,
} from "react-icons/fa";
import API from "../../services/axios";

export default function StatsCards() {
  const [stats, setStats] = useState({
    jobMatches: 0,
    quizzesCompleted: 0,
    resumeScore: 0,
    certificates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const { data } = await API.get("/dashboard/stats");
        // Expecting data = { jobMatches, quizzesCompleted, resumeScore, certificates }
        setStats({
          jobMatches:       data.jobMatches       ?? 0,
          quizzesCompleted: data.quizzesCompleted ?? 0,
          resumeScore:      data.resumeScore      ?? 0,
          certificates:     data.certificates     ?? 0,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-center text-gray-500">
        Loading stats…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  const cards = [
    {
      label: "Job Matches",
      value: stats.jobMatches,
      icon:  <FaBriefcase className="w-6 h-6 text-indigo-500" />,
    },
    {
      label: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon:  <FaBookOpen className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Resume Score",
      value: `${stats.resumeScore}%`,
      icon:  <FaFileAlt className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Certificates Earned",
      value: stats.certificates,
      icon:  <FaAward className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, icon }) => (
        <div
          key={label}
          className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition"
        >
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900 rounded-full">
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
