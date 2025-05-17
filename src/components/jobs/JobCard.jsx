import React from "react";

export default function JobCard({ job }) {
  const initial = job.company?.charAt(0).toUpperCase() || "?";
  return (
    <div className="min-w-[340px] max-w-[350px] bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between flex-shrink-0 hover:shadow-2xl transition">
      {/* Logo/Initial */}
      <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-xl bg-violet-100 text-violet-700 font-bold text-xl shadow">
        {initial}
      </div>
      {/* Title & Company */}
      <h2 className="text-lg font-semibold text-indigo-700">{job.title}</h2>
      <div className="text-gray-500 text-sm mb-1">{job.company}</div>
      <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
        <span>{job.location}</span>
      </div>
      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      {/* Details */}
      <div className="flex gap-2 text-xs text-gray-500 mb-4">
        <span>{job.workType}</span>
        <span>•</span>
        <span>{job.jobType}</span>
      </div>
      {/* Salary */}
      <div className="text-indigo-600 font-bold mb-4">{job.salaryRange}</div>
      {/* Apply Button */}
      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:scale-105 transition text-center"
      >
        Apply
      </a>
    </div>
  );
}
