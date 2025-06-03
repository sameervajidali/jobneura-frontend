// import React, { useState } from 'react';
// import { FaSearch, FaStar, FaBolt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const tutorials = [
//   { id: 1, title: 'How to Build a Portfolio Website', description: 'Learn how to create an elegant portfolio website.', level: 'Beginner', popularity: 98, trending: true },
//   { id: 2, title: 'How to Optimize Your Landing Page', description: 'Watch now and boost your conversions.', level: 'Advanced', popularity: 120, trending: true },
//   { id: 3, title: 'Getting Started with SEO', description: 'Learn the basics of search engine optimization.', level: 'Beginner', popularity: 90 },
//   { id: 4, title: 'React Basics for Beginners', description: 'Understand components, props, and state.', level: 'Beginner', popularity: 110 },
//   { id: 5, title: 'JavaScript Async Mastery', description: 'Master async/await and Promises.', level: 'Advanced', popularity: 85 },
//   { id: 6, title: 'CSS Grid vs Flexbox', description: 'Layout your pages the modern way.', level: 'Intermediate', popularity: 88 },
//   { id: 7, title: 'Git & GitHub Crash Course', description: 'Version control from scratch.', level: 'Beginner', popularity: 70 },
//   { id: 8, title: 'Build a REST API with Node.js', description: 'APIs with Express & MongoDB.', level: 'Advanced', popularity: 99 },
//   { id: 9, title: 'Understanding TypeScript', description: 'Type-safe JavaScript.', level: 'Intermediate', popularity: 95 },
//   { id: 10, title: 'Next.js for React Developers', description: 'SSR, API routes, deployment.', level: 'Advanced', popularity: 108 },
//   { id: 11, title: 'Tailwind CSS Quick Start', description: 'Modern utility-first styling.', level: 'Beginner', popularity: 76 },
//   { id: 12, title: 'Responsive Web Design', description: 'Design for all devices.', level: 'Intermediate', popularity: 89 },
// ];

// const TutorialsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('newest');
//   const [currentPage, setCurrentPage] = useState(1);
//   const tutorialsPerPage = 9;

//   const filtered = tutorials
//     .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => sortBy === 'newest' ? b.id - a.id : b.popularity - a.popularity);

//   const totalPages = Math.ceil(filtered.length / tutorialsPerPage);
//   const currentTutorials = filtered.slice((currentPage - 1) * tutorialsPerPage, currentPage * tutorialsPerPage);

//   const popular = [...tutorials].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
//   const trending = tutorials.filter(t => t.trending);

//   return (
//     <section className="w-full bg-white dark:bg-gray-900 py-16 px-6 md:px-16 lg:px-24">
//       <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
//         {/* Text content */}
//         <div className="text-center md:text-left flex-1 space-y-6">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//             Master Career Skills <br className="hidden sm:block" />
//             with World-Class Tutorials
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
//             Explore high-impact tutorials on SEO, resume building, portfolios, and more—crafted by experts to boost your career growth.
//           </p>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Link
//               to="/tutorials"
//               className="inline-block bg-violet-600 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:bg-violet-700 transition"
//             >
//               Browse Tutorials
//             </Link>
//           </motion.div>
//         </div>

//         {/* Image */}
//         <div className="flex-1">
//           <img
//             src="https://illustrations.popsy.co/gray/work-from-home.svg"
//             alt="Tutorial Hero"
//             className="w-full max-w-md mx-auto"
//           />
//         </div>
//       </div>
   
//     <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col md:flex-row gap-6">
//       <div className="w-full md:w-3/4">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//           <div className="relative w-full md:w-2/3">
//             <FaSearch className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search tutorials..."
//               className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <select
//             className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="newest">Newest</option>
//             <option value="popular">Most Popular</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentTutorials.map(tutorial => (
//             <div key={tutorial.id} className="border p-4 rounded-2xl shadow-sm hover:shadow-lg transition duration-300">
//               <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
//               <p className="text-gray-600 mb-3">{tutorial.description}</p>
//               <div className="flex justify-between items-center text-sm">
//                 <span className={`px-2 py-1 rounded-full text-white ${tutorial.level === 'Beginner' ? 'bg-blue-500' : tutorial.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>{tutorial.level}</span>
//                 <a href="#" className="text-blue-600 font-medium hover:underline">Explore</a>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-8">
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="w-full md:w-1/4 space-y-6">
//   <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
//     <h4 className="flex items-center text-yellow-600 font-bold mb-2">
//       <FaStar className="mr-2" /> Popular
//     </h4>
//     <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
//       {popular.map(t => (
//         <li key={t.id}>
//           <Link
//             to={`/tutorials/${t.slug}`}
//             className="no-underline text-inherit hover:underline"
//           >
//             {t.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>

//   <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-xl">
//     <h4 className="flex items-center text-pink-600 font-bold mb-2">
//       <FaBolt className="mr-2" /> Trending
//     </h4>
//     <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
//       {trending.map(t => (
//         <li key={t.id}>
//           <Link
//             to={`/tutorials/${t.slug}`}
//             className="no-underline text-inherit hover:underline"
//           >
//             {t.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>
//       </div>
//        </section>
//   );
// };

// export default TutorialsPage;

import React, { useState } from 'react';
import { FaSearch, FaStar, FaBolt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const tutorials = [
  { id: 1, title: 'How to Build a Portfolio Website', description: 'Learn how to create an elegant portfolio website.', level: 'Beginner', popularity: 98, trending: true },
  { id: 2, title: 'How to Optimize Your Landing Page', description: 'Watch now and boost your conversions.', level: 'Advanced', popularity: 120, trending: true },
  { id: 3, title: 'Getting Started with SEO', description: 'Learn the basics of search engine optimization.', level: 'Beginner', popularity: 90 },
  { id: 4, title: 'React Basics for Beginners', description: 'Understand components, props, and state.', level: 'Beginner', popularity: 110 },
  { id: 5, title: 'JavaScript Async Mastery', description: 'Master async/await and Promises.', level: 'Advanced', popularity: 85 },
  { id: 6, title: 'CSS Grid vs Flexbox', description: 'Layout your pages the modern way.', level: 'Intermediate', popularity: 88 },
  { id: 7, title: 'Git & GitHub Crash Course', description: 'Version control from scratch.', level: 'Beginner', popularity: 70 },
  { id: 8, title: 'Build a REST API with Node.js', description: 'APIs with Express & MongoDB.', level: 'Advanced', popularity: 99 },
  { id: 9, title: 'Understanding TypeScript', description: 'Type-safe JavaScript.', level: 'Intermediate', popularity: 95 },
  { id: 10, title: 'Next.js for React Developers', description: 'SSR, API routes, deployment.', level: 'Advanced', popularity: 108 },
  { id: 11, title: 'Tailwind CSS Quick Start', description: 'Modern utility-first styling.', level: 'Beginner', popularity: 76 },
  { id: 12, title: 'Responsive Web Design', description: 'Design for all devices.', level: 'Intermediate', popularity: 89 },
];

const TutorialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 9;

  const filtered = tutorials
    .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'newest' ? b.id - a.id : b.popularity - a.popularity);

  const totalPages = Math.ceil(filtered.length / tutorialsPerPage);
  const currentTutorials = filtered.slice((currentPage - 1) * tutorialsPerPage, currentPage * tutorialsPerPage);

  const popular = [...tutorials].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  const trending = tutorials.filter(t => t.trending);

  return (
    <section className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Master Career Skills with <br className="hidden md:block" />
            <span className="text-violet-600">World-Class Tutorials</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Boost your career with top-tier tutorials on resume building, portfolios, SEO, and more.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/tutorials"
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition"
            >
              Browse Tutorials
            </Link>
          </motion.div>
        </div>
        <div className="flex-1">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Hero Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
 


      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Tutorials List */}
        <div className="w-full lg:w-3/4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-2/3">
              <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTutorials.map(tutorial => (
              <div
                key={tutorial.id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl p-5 transition"
              >
                <h3 className="text-lg font-semibold mb-1 text-gray-900">{tutorial.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded-full text-white ${tutorial.level === 'Beginner' ? 'bg-blue-500' : tutorial.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {tutorial.level}
                  </span>
                  <a href="#" className="text-violet-600 font-medium hover:underline">Explore</a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 space-y-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-xl">
            <h4 className="flex items-center text-yellow-700 font-bold mb-3">
              <FaStar className="mr-2" /> Popular
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {popular.map(t => (
                <li key={t.id}>
                  <Link to="#" className="hover:underline">{t.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-50 border-l-4 border-pink-400 p-5 rounded-xl">
            <h4 className="flex items-center text-pink-700 font-bold mb-3">
              <FaBolt className="mr-2" /> Trending
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {trending.map(t => (
                <li key={t.id}>
                  <Link to="#" className="hover:underline">{t.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialsPage;
