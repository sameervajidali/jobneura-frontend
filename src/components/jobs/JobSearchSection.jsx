import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import LocationComboBox from "../ui/LocationComboBox"; // Path may differ

export default function JobSearchSection({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("All Work Types");
  const [jobType, setJobType] = useState("All Job Types");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch)
      onSearch({
        keyword,
        location,
        workType,
        jobType,
      });
  };

  return (
    <section className="relative w-full bg-[#f8fafb] pt-14 md:pt-24 pb-8 ">
      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0"
        style={{
          width: "80vw",
          height: "340px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, #a5b4fc88 0%, #e0e7ff00 100%)",
          filter: "blur(20px)",
        }}
      />
      {/* Headline */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <span className="animate-bounce w-2 h-2 bg-indigo-500 rounded-full mb-2" />
        <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
          <Sparkles className="w-7 h-7 text-indigo-400 animate-pulse" />
          Explore Top Job Openings
        </h1>
        <span className="w-2 h-2 bg-violet-400 rounded-full mb-2" />
        <p className="text-slate-500 text-base md:text-lg font-medium mb-2">
          Updated daily from trusted sources and leading companies.
        </p>
      </div>
      {/* Glass Search Bar */}
      <div className="relative z-10 flex w-full justify-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-5xl bg-white/90 backdrop-blur-md
            border border-slate-100 shadow-xl
            rounded-2xl flex flex-row items-center gap-x-3
            px-4 md:px-8 py-5 md:py-6
            transition-all
          "
        >
          {/* Keyword */}
          <div className="flex items-center h-12 bg-slate-50 rounded-xl px-3 border border-transparent focus-within:border-indigo-400 flex-1 min-w-[160px] max-w-[260px]">
            <FaSearch className="text-indigo-400 mr-2" />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search jobs, company…"
              className="w-full bg-transparent border-none outline-none placeholder-slate-400 text-base"
            />
          </div>
          {/* Location - Custom ComboBox */}
          <div className="flex-1 min-w-[120px] max-w-[200px]">
            <LocationComboBox
              value={location}
              onChange={setLocation}
              placeholder="Location"
            />
          </div>
          {/* Work Type */}
          <select
            value={workType}
            onChange={e => setWorkType(e.target.value)}
            className="h-12 rounded-xl bg-slate-50 px-4 border border-transparent text-gray-600 focus:border-indigo-400 min-w-[110px] text-base"
          >
            <option>All Work Types</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>
          {/* Job Type */}
          <select
            value={jobType}
            onChange={e => setJobType(e.target.value)}
            className="h-12 rounded-xl bg-slate-50 px-4 border border-transparent text-gray-600 focus:border-indigo-400 min-w-[110px] text-base"
          >
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
            className="
              h-12 px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
              text-white font-bold shadow-lg hover:scale-105
              focus:ring-2 focus:ring-indigo-200 transition
              text-base
            "
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
