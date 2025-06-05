import React from 'react';

const trendingTutorials = [
  'Building RESTful APIs with Node.js',
  'Advanced SQL Queries',
  'Responsive Web Design Best Practices',
  'Time Series Analysis',
];

const popularCategories = [
  'Web Development',
  'AI',
  'Data Science',
  'Design',
  'Marketing',
];

const Sidebar = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="space-y-10 sticky top-20"
    >
      {/* Trending Tutorials */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-3 text-indigo-700">
          <span role="img" aria-label="fire" className="text-2xl">🔥</span>
          Trending Tutorials
        </h2>
        <ul className="space-y-4 text-gray-700">
          {trendingTutorials.map((title, i) => (
            <li key={i}>
              <a
                href="#"
                className="flex justify-between items-center rounded-md px-4 py-3 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                tabIndex={0}
              >
                <span className="font-medium">{title}</span>
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Categories */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-5 text-indigo-700">Popular Categories</h2>
        <ul className="space-y-4 text-gray-700">
          {popularCategories.map((cat, i) => (
            <li key={i}>
              <a
                href="#"
                className="flex justify-between items-center rounded-md px-4 py-3 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                tabIndex={0}
              >
                <span className="font-medium">{cat}</span>
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
