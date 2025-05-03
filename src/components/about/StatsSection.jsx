// src/components/about/StatsSection.jsx
import React from "react";

export default function StatsSection() {
  const stats = [
    { number: "10K+", label: "Resumes Enhanced" },
    { number: "5K+", label: "Skill Quizzes Taken" },
    { number: "1.2K+", label: "Jobs Matched" },
    { number: "50+", label: "Companies Trust Us" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Impact So Far
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-4xl font-extrabold text-indigo-600">{item.number}</h3>
              <p className="text-gray-600 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
