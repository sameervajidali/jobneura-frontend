// src/components/dashboard/QuickStats.jsx
import React from "react";
import { Briefcase, BookOpenCheck, FileText, Award } from "lucide-react";

const stats = [
  {
    icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
    label: "Job Matches",
    value: 24,
  },
  {
    icon: <BookOpenCheck className="w-6 h-6 text-green-600" />,
    label: "Quizzes Completed",
    value: 12,
  },
  {
    icon: <FileText className="w-6 h-6 text-yellow-600" />,
    label: "Resume Score",
    value: "82%",
  },
  {
    icon: <Award className="w-6 h-6 text-purple-600" />,
    label: "Certificates Earned",
    value: 5,
  },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition"
        >
          <div className="p-2 rounded-full bg-gray-100">{stat.icon}</div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
