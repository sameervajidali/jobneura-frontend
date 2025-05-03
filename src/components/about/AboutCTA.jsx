// src/components/about/AboutCTA.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Supercharge Your Career?
        </h2>

        {/* Subtext */}
        <p className="text-lg text-indigo-100 mb-8">
          Join thousands of users already enhancing their resumes, mastering new skills, and landing top jobs with JobNeura.
        </p>

        {/* CTA Button */}
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-all"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
