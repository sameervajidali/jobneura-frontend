import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function JobSearchSection({ onSearch }) {
  // You can later enhance this with controlled inputs and onSearch handler
  return (
    <section className="w-full flex flex-col items-center justify-center py-8 md:py-12">
      <form
        className="flex flex-wrap gap-3 md:gap-4 items-center justify-center p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-100 w-full max-w-4xl"
        onSubmit={e => {
          e.preventDefault();
          if (onSearch) onSearch();
        }}
      >
        {/* Keyword */}
        <div className="flex items-center bg-white rounded-xl shadow px-3 py-2 flex-1 min-w-[170px] max-w-[250px]">
          <FaSearch className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Search jobs, company..."
            className="w-full bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>
        {/* Location */}
        <div className="flex items-center bg-white rounded-xl shadow px-3 py-2 flex-1 min-w-[120px] max-w-[180px]">
          <FaMapMarkerAlt className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-transparent border-none outline-none placeholder-gray-400"
          />
        </div>
        {/* Work Type */}
        <select className="rounded-xl bg-white shadow px-4 py-2 min-w-[110px] border-none text-gray-600">
          <option>All Work Types</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
        {/* Job Type */}
        <select className="rounded-xl bg-white shadow px-4 py-2 min-w-[110px] border-none text-gray-600">
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
    </section>
  );
}
