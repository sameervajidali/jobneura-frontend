// src/components/jobs/JobSearchBar.jsx
import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function JobSearchBar() {
  return (
    <div className="w-full mb-8">
      <form
        className="flex flex-wrap gap-3 md:gap-4 items-center justify-center p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-indigo-100"
        onSubmit={e => e.preventDefault()}
      >
        {/* Keyword */}
        <div className="flex items-center bg-white rounded-xl shadow px-3 py-2 flex-1 min-w-[200px] max-w-[350px]">
          <FaSearch className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Search jobs, company..."
            className="w-full bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>
        {/* Location */}
        <div className="flex items-center bg-white rounded-xl shadow px-3 py-2 flex-1 min-w-[120px] max-w-[200px]">
          <FaMapMarkerAlt className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>
        {/* Work Type */}
        <select className="rounded-xl bg-white shadow px-4 py-2 min-w-[120px] border-none text-gray-600">
          <option>All Work Types</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
        {/* Job Type */}
        <select className="rounded-xl bg-white shadow px-4 py-2 min-w-[120px] border-none text-gray-600">
          <option>All Job Types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
          <option>Freelance</option>
        </select>
        {/* Search Button */}
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
