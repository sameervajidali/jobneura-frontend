import React from 'react';
import TutorialCard from './TutorialCard';

// Expanded dummy data: 12 tutorials
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

const TutorialGrid = () => {
  return (
    <section aria-label="Tutorials List" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial, index) => (
        <TutorialCard key={index} tutorial={tutorial} />
      ))}
    </section>
  );
};

export default TutorialGrid;
