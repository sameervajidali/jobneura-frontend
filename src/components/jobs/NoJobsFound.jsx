// src/components/jobs/NoJobsFound.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function NoJobsFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24">
      <FaSearch className="text-5xl text-indigo-300 mb-3" />
      <p className="text-lg text-gray-400 font-medium">No jobs found.</p>
    </div>
  );
}
