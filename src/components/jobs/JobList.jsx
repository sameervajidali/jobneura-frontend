// src/components/jobs/JobList.jsx
import React from "react";

const dummyJobs = [
  { id: 1, title: "Frontend Engineer", company: "TestCorp", skills: [], workType: "Remote", jobType: "Full-time", location: "Remote", salaryRange: "$2k-$3.5k", applyLink: "#" },
  { id: 2, title: "Backend Dev", company: "CloudNet", skills: [], workType: "Onsite", jobType: "Full-time", location: "Bangalore", salaryRange: "$3k-$5k", applyLink: "#" },
  { id: 3, title: "Designer", company: "PixelWorks", skills: [], workType: "Hybrid", jobType: "Contract", location: "Mumbai", salaryRange: "$1.5k-$2k", applyLink: "#" },
  { id: 4, title: "AI Intern", company: "BrainTech", skills: [], workType: "Onsite", jobType: "Internship", location: "Delhi", salaryRange: "$500-$1k", applyLink: "#" },
  { id: 5, title: "DevOps", company: "OpsGenie", skills: [], workType: "Remote", jobType: "Full-time", location: "Remote", salaryRange: "$4k-$5k", applyLink: "#" },
  { id: 6, title: "Marketer", company: "MarketWave", skills: [], workType: "Onsite", jobType: "Contract", location: "NY, USA", salaryRange: "$60k-$75k", applyLink: "#" },
];

function JobCard({ job }) {
  return (
    <div className="min-w-[320px] max-w-[340px] bg-white rounded-2xl shadow-lg p-6 flex flex-col flex-shrink-0">
      <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
      <div className="text-sm mb-1">{job.company}</div>
      <div className="text-xs text-gray-400 mb-2">{job.location}</div>
      <div className="text-indigo-600 font-bold mb-2">{job.salaryRange}</div>
      <div className="text-xs mb-3">{job.workType} • {job.jobType}</div>
      <a href={job.applyLink} target="_blank" className="mt-auto px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center font-semibold shadow">
        Apply
      </a>
    </div>
  );
}

export default function JobList() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-row gap-8 justify-center  py-8">
      {dummyJobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
