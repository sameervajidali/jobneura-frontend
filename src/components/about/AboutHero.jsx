// src/components/about/AboutHero.jsx
import React from "react";

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-purple-50 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Building Careers with Purpose
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          At JobNeura, we're on a mission to simplify hiring, empower talent,
          and create a smarter path to professional growth.
        </p>

        {/* Optional CTA */}
        <a
          href="/register"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
