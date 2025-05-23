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
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const { data } = await API.get("/dashboard/stats");
        // Expecting data = { jobMatches, quizzesCompleted, resumeScore, certificates }
        setStats({
          jobMatches: data.jobMatches ?? 0,
          quizzesCompleted: data.quizzesCompleted ?? 0,
          resumeScore: data.resumeScore ?? 0,
          certificates: data.certificates ?? 0,
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
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Loading stats…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  const cards = [
    {
      label: "Job Matches",
      value: stats.jobMatches,
      icon: <FaBriefcase className="w-6 h-6 text-indigo-600" />, 
      bg: 'bg-indigo-50 dark:bg-indigo-900'
    },
    {
      label: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon: <FaBookOpen className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50 dark:bg-green-900'
    },
    {
      label: "Resume Score",
      value: `${stats.resumeScore}%`, 
      icon: <FaFileAlt className="w-6 h-6 text-yellow-600" />,
      bg: 'bg-yellow-50 dark:bg-yellow-900'
    },
    {
      label: "Certificates Earned",
      value: stats.certificates,
      icon: <FaAward className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50 dark:bg-purple-900'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, icon, bg }) => (
        <div
          key={label}
          className="flex items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200"
        >
          <div className={`p-3 rounded-lg ${bg}`}> {icon} </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {value}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
