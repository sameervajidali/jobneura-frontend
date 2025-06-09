import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/tutorials/Hero';
import CategoryFilter from '../components/tutorials/CategoryFilter';
import TutorialGrid from '../components/tutorials/TutorialGrid';
import Sidebar from '../components/tutorials/Sidebar';
import Pagination from '../components/tutorials/Pagination';

// Sample tutorials array (put your full 12 tutorials here)
const tutorials = [
  {
    title: 'Building Responsive Websites',
    description: 'A detailed walkthrough to building techniques development experts.',
    tags: ['Beginner', 'Web Dev', 'CSS'],
    author: {
      name: 'Emily Brown',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2025-03-04',
    thumbnail: 'https://via.placeholder.com/400x240?text=Responsive+Websites',
    level: 'Beginner',
  },
  {
    title: 'Introduction to Machine Learning',
    description: 'A learning step chat link machine strategies.',
    tags: ['Advanced', 'AI'],
    author: {
      name: 'Mark Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2025-02-28',
    thumbnail: 'https://via.placeholder.com/400x240?text=Machine+Learning',
    level: 'Advanced',
  },
  {
    title: 'UI Design Principles',
    description: 'Learn the fundamentals of user interface design.',
    tags: ['Beginner', 'Design'],
    author: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    date: '2025-04-03',
    thumbnail: 'https://via.placeholder.com/400x240?text=UI+Design',
    level: 'Beginner',
  },
  {
    title: 'Data Visualization Techniques',
    description: 'Create effective visualizations for data analysis.',
    tags: ['Intermediate', 'Data Science'],
    author: {
      name: 'Anna Lee',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    date: '2025-03-15',
    thumbnail: 'https://via.placeholder.com/400x240?text=Data+Visualization',
    level: 'Intermediate',
  },
  {
    title: 'Getting Started with SEO',
    description: 'Basic SEO strategies for beginners.',
    tags: ['Beginner', 'Marketing'],
    author: {
      name: 'Mark Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2025-02-28',
    thumbnail: 'https://via.placeholder.com/400x240?text=SEO',
    level: 'Beginner',
  },
  {
    title: 'Deep Learning Fundamentals',
    description: 'Understand core concepts of deep learning.',
    tags: ['Advanced', 'AI'],
    author: {
      name: 'Emily Brown',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2025-01-20',
    thumbnail: 'https://via.placeholder.com/400x240?text=Deep+Learning',
    level: 'Advanced',
  },
  {
    title: 'Typography for Designers',
    description: 'Practical typography tips for UI design.',
    tags: ['Design'],
    author: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    date: '2025-04-10',
    thumbnail: 'https://via.placeholder.com/400x240?text=Typography',
    level: 'Beginner',
  },
  {
    title: 'Mobile Development Basics',
    description: 'Getting started with building mobile apps.',
    tags: ['Beginner', 'Mobile'],
    author: {
      name: 'Anna Lee',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    date: '2025-03-25',
    thumbnail: 'https://via.placeholder.com/400x240?text=Mobile+Development',
    level: 'Beginner',
  },
  {
    title: 'Cybersecurity Essentials',
    description: 'Learn the basics of securing digital systems.',
    tags: ['Security'],
    author: {
      name: 'Mark Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2025-02-10',
    thumbnail: 'https://via.placeholder.com/400x240?text=Cybersecurity',
    level: 'Intermediate',
  },
  {
    title: 'Marketing Strategies 101',
    description: 'Foundational marketing strategies to grow your brand.',
    tags: ['Marketing'],
    author: {
      name: 'Emily Brown',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2025-03-30',
    thumbnail: 'https://via.placeholder.com/400x240?text=Marketing',
    level: 'Beginner',
  },
  {
    title: 'Advanced CSS Techniques',
    description: 'Take your CSS skills to the next level.',
    tags: ['Advanced', 'CSS'],
    author: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    date: '2025-04-15',
    thumbnail: 'https://via.placeholder.com/400x240?text=CSS+Advanced',
    level: 'Advanced',
  },
  {
    title: 'Data Science with Python',
    description: 'Analyze data efficiently with Python.',
    tags: ['Data Science', 'Python'],
    author: {
      name: 'Anna Lee',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    date: '2025-03-18',
    thumbnail: 'https://via.placeholder.com/400x240?text=Data+Science+Python',
    level: 'Intermediate',
  },
];

// Tutorials per page
const TUTORIALS_PER_PAGE = 6;

const TutorialsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);

  // Filter tutorials by category if selected
  const filteredTutorials = activeCategory
    ? tutorials.filter(tut =>
        tut.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
      )
    : tutorials;

  // Calculate total pages dynamically
  const totalPages = Math.ceil(filteredTutorials.length / TUTORIALS_PER_PAGE);

  // Handle page changes with bounds checking
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category selection and reset page
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Slice tutorials to show based on page
  const startIndex = (currentPage - 1) * TUTORIALS_PER_PAGE;
  const tutorialsToShow = filteredTutorials.slice(
    startIndex,
    startIndex + TUTORIALS_PER_PAGE
  );

  // SEO JSON-LD - update to only current tutorials
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "JobNeura Tutorials",
    "description": "Master in-demand skills with expert tutorials across Web Development, AI, Design, and more.",
    "numberOfItems": filteredTutorials.length,
    "itemListElement": tutorialsToShow.map((tut, idx) => ({
      "@type": "ListItem",
      "position": startIndex + idx + 1,
      "url": `https://jobneura.tech/tutorials/${encodeURIComponent(
        tut.title.toLowerCase().replace(/\s+/g, '-')
      )}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Expert Tutorials for Career Growth | JobNeura</title>
        <meta
          name="description"
          content="Explore over 200 tutorials on Web Development, AI, Design, and more. Boost your career with JobNeura's expert-led tutorials."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="pt-4 min-h-screen bg-gray-50 text-gray-900 w-full px-6 sm:px-10 lg:px-16">
        <Hero />
        <CategoryFilter onSelect={handleCategorySelect} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-10">
          <div className="lg:col-span-3">
            <TutorialGrid tutorials={tutorialsToShow} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              tutorialTitles={filteredTutorials.map(t => t.title)}
            />
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default TutorialsPage;
