import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden py-20 px-6 text-center text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600"
    >
      {/* Background animation */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 bg-gradient-to-r from-indigo-500 via-purple-700 to-blue-500 animate-gradient-x"
        style={{ backgroundSize: '200% 200%' }}
      ></div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto text-4xl sm:text-5xl font-extrabold mb-8 leading-tight drop-shadow-lg"
      >
        Master In-Demand Skills with <br /> Our Expert Tutorials
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 max-w-xl mx-auto mb-8"
      >
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          <input
            type="search"
            aria-label="Search tutorials"
            placeholder="Search tutorials..."
            className="w-full rounded-full px-12 py-3 text-gray-900 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="relative z-10 flex justify-center gap-12 text-lg font-semibold max-w-md mx-auto"
      >
        <span className="inline-block drop-shadow-md">
          200+ <strong className="font-extrabold">tutorials</strong>
        </span>
        <span className="inline-block drop-shadow-md">20+ Topics</span>
        <button
          type="button"
          className="rounded-full bg-white px-8 py-3 font-bold text-indigo-700 shadow-lg hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 transition"
        >
          Get Started Free
        </button>
      </motion.div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
