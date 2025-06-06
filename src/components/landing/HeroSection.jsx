// src/components/landing/HeroSection.jsx
import React from "react";
import { FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="
        relative z-10 w-full min-h-[550px] flex flex-col items-center justify-center
        text-center px-4 pt-16 pb-12
        bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500
        rounded-b-[2.5rem] shadow-2xl
        overflow-hidden
        "
      style={{
        background:
          "radial-gradient(circle at 60% 40%, #7f9cf5 0%, #b794f4 50%, #5a67d8 100%)",
      }}
    >
      {/* Floating Quiz Badge */}
      <div className="absolute left-6 top-24 md:left-16 md:top-32 animate-float">
        <div className="bg-white/80 shadow-2xl rounded-2xl px-7 py-5 flex flex-col items-center border-4 border-indigo-400">
          <span className="text-[1.6rem] font-bold text-indigo-700 mb-2">QUIZ</span>
          <FaCertificate className="text-5xl text-yellow-400 mb-1" />
          <span className="text-indigo-500 font-semibold">Earn Certificate</span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
        Start Learning &amp; <span className="text-yellow-300">Get Certified</span>
      </h1>
      <p className="max-w-xl mx-auto text-lg md:text-xl text-indigo-100 font-medium mb-8 drop-shadow">
        AI-powered career platform. Take skill quizzes, read expert tutorials, and earn real certificates to boost your journey!
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-7">
        <Link
          to="/quizzes"
          className="px-7 py-3 rounded-full bg-yellow-400 text-indigo-900 font-bold shadow-lg hover:bg-yellow-300 transition text-lg"
        >
          Start Quiz
        </Link>
        <Link
          to="/tutorials"
          className="px-7 py-3 rounded-full bg-white/90 text-indigo-800 font-bold shadow hover:bg-indigo-50 transition text-lg"
        >
          Explore Tutorials
        </Link>
      </div>

      {/* Resume Builder Coming Soon */}
      <div className="flex items-center gap-2 mx-auto bg-indigo-700/80 text-white px-4 py-1 rounded-full w-fit text-base font-semibold shadow border-2 border-indigo-200 mb-2">
        <span>Resume Builder</span>
        <span className="bg-yellow-400 text-indigo-900 rounded-full px-3 py-0.5 text-xs font-bold ml-2 animate-pulse">
          Coming Soon
        </span>
      </div>
    </section>
  );
}
