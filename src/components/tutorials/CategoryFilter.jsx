import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'Web Development',
  'AI',
  'Design',
  'Data Science',
  'Marketing',
  'Mobile Development',
  'Cybersecurity',
];

const CategoryFilter = ({ onSelect }) => {
  const [active, setActive] = useState(null);

  const handleSelect = (category) => {
    const newCategory = active === category ? null : category;
    setActive(newCategory);
    if (onSelect) onSelect(newCategory);
  };

  return (
    <nav
      aria-label="Tutorial Categories"
      className="bg-white py-4 px-6 overflow-x-auto border-b border-gray-200"
    >
      <ul className="flex max-w-7xl mx-auto gap-6 whitespace-nowrap snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <li key={cat} className="relative snap-start">
            <button
              onClick={() => handleSelect(cat)}
              className={`relative px-5 py-2 font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition ${
                active === cat
                  ? 'text-indigo-700'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
              aria-pressed={active === cat}
            >
              {cat}
              {/* Animated underline */}
              <AnimatePresence>
                {active === cat && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-1 bg-indigo-600 rounded"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryFilter;
