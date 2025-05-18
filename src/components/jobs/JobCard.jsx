import React from "react";
import { FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Briefcase } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <article
      tabIndex={0}
      className="
        rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-indigo-50/60 to-slate-50/60
        p-7 flex flex-col shadow-sm transition-all duration-200
        hover:shadow-2xl hover:border-indigo-300 hover:bg-white/90
        focus-within:border-indigo-400 focus-within:shadow-xl
        group relative overflow-hidden
        outline-none
      "
      aria-label={`${job.title} at ${job.company}`}
    >

      {/* Company Icon or Logo */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-100 mb-3 shadow-sm">
        <Briefcase className="w-7 h-7 text-indigo-400" />
      </div>

      {/* Job Title + Company */}
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-1">
          {job.title}
        </h2>
        <div className="text-slate-500 font-semibold text-sm">{job.company}</div>
      </div>

      {/* Location & Job Type */}
      <div className="flex items-center gap-2 text-slate-400 text-[15px] mb-2">
        <FaMapMarkerAlt className="text-indigo-400" />
        <span>{job.location}</span>
        <span className={`
          ml-3 px-2 py-0.5 rounded-full text-xs font-semibold
          ${job.jobType === "Full-time"
            ? "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700"
            : "bg-gradient-to-r from-violet-100 to-violet-200 text-violet-700"}
        `}>
          {job.jobType}
        </span>
      </div>

      {/* Experience */}
      <div className="mb-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-400">Min Exp:</span>
        <span className="ml-2">{job.experience || "—"}</span>
      </div>

      {/* Skills/Tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {job.skills.map((skill, i) => (
          <span
            key={i}
            tabIndex={0}
            className="
              bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium border border-indigo-100
              transition-all duration-150
              hover:bg-indigo-500 hover:text-white hover:border-indigo-500
              focus:bg-indigo-500 focus:text-white focus:border-indigo-500
              cursor-pointer shadow-sm outline-none
            "
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Salary */}
      <div className="mb-4 text-xs text-slate-500">
        <span className="font-semibold text-slate-400">Package:</span>
        <span className="ml-2 font-bold text-indigo-700">{job.salaryRange}</span>
      </div>

      <div className="flex-1"></div>

      {/* Divider */}
      <div className="w-full border-t border-slate-100 my-3" />

      {/* Socials + Apply */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(job.title + " at " + job.company)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/social inline-flex items-center justify-center w-8 h-8 rounded-full
              bg-white border border-slate-200 text-slate-400
              hover:bg-green-50 hover:text-green-600 hover:border-green-200
              focus:bg-green-50 focus:text-green-600 focus:border-green-400
              transition-all duration-150 shadow outline-none
            "
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/social inline-flex items-center justify-center w-8 h-8 rounded-full
              bg-white border border-slate-200 text-slate-400
              hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200
              focus:bg-blue-50 focus:text-blue-600 focus:border-blue-400
              transition-all duration-150 shadow outline-none
            "
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/social inline-flex items-center justify-center w-8 h-8 rounded-full
              bg-white border border-slate-200 text-slate-400
              hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300
              focus:bg-blue-100 focus:text-blue-800 focus:border-blue-500
              transition-all duration-150 shadow outline-none
            "
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            ml-auto px-8 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500
            text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105
            focus:ring-2 focus:ring-indigo-200 transition-all duration-150
            text-base tracking-wide flex items-center gap-2
            outline-none
          "
        >
          Apply Now
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
