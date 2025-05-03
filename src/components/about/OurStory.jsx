// src/components/about/OurStory.jsx
import React from "react";

export default function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Our Story
        </h2>

        {/* Paragraph */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          At JobNeura, we believe that finding the right career should be 
          simple, empowering, and inspiring. We saw a world where talent 
          was overlooked, and outdated hiring processes held people back. 
          So we created JobNeura — an intelligent platform where opportunity 
          meets preparation.
        </p>

        {/* (Optional) Second paragraph */}
        <p className="text-gray-600 text-lg leading-relaxed">
          Today, thousands of users trust us to guide their professional journey —
          from enhancing resumes, to mastering skills, to landing their dream job.
        </p>
      </div>
    </section>
  );
}
