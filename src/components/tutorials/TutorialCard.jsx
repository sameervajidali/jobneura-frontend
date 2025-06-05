import React from 'react';
import { motion } from 'framer-motion';

const TutorialCard = ({ tutorial }) => {
  const { title, description, tags, author, date, thumbnail, level } = tutorial;

  return (
    <motion.article
      tabIndex={0}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
      whileFocus={{ scale: 1.03, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col focus:outline-none focus:ring-4 focus:ring-indigo-300"
    >
      <img
        src={thumbnail}
        alt={`Thumbnail for ${title}`}
        className="w-full h-44 object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 text-xs rounded-full px-3 py-1 font-medium select-none"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {level && (
            <span
              className="bg-indigo-200 text-indigo-900 text-xs rounded-full px-3 py-1 font-semibold select-none"
              title={level}
            >
              {level}
            </span>
          )}
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover border border-indigo-200"
              loading="lazy"
            />
            <span className="font-medium text-gray-700">{author.name}</span>
          </div>
          <time
            dateTime={date}
            className="font-mono text-gray-400"
            title={new Date(date).toLocaleString()}
          >
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </motion.article>
  );
};

export default TutorialCard;
