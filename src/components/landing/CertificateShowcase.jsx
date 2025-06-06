// src/components/landing/CertificateShowcase.jsx
import React from "react";
import { FaLinkedin } from "react-icons/fa";

export default function CertificateShowcase() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-tr from-indigo-100/60 via-white/70 to-blue-100/70 dark:from-gray-900/60 dark:to-gray-900/80">
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 dark:text-white mb-8 text-center">
        Your Certificate <span className="text-blue-500">Awaits</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Certificate Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 shadow-2xl rounded-2xl p-8 min-w-[320px] border border-blue-200 relative glassy">
          <div className="text-lg font-bold text-indigo-700 mb-1">CERTIFICATE</div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">OF ACHIEVEMENT</div>
          <div className="my-6 text-xl font-bold text-blue-700">Anita Sharma</div>
          <div className="mb-2 text-gray-700 dark:text-gray-300 text-base">Web Development</div>
          <div className="flex gap-2 items-center mt-3">
            <FaLinkedin className="text-blue-500 text-xl" />
            <span className="text-sm text-gray-500">Share on LinkedIn</span>
          </div>
        </div>
        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["JS", "HTML", "CSS", "React", "SQL", "Python", "AI", "AWS"].map((badge, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-300 to-blue-400 text-white font-semibold shadow"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
