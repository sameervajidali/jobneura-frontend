
import React from 'react';
import { FaCode, FaDatabase, FaPython, FaJsSquare, FaJava } from 'react-icons/fa';

const quizzes = [
  {
    title: "JavaScript Basics",
    category: "Programming",
    icon: <FaJsSquare />,
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    title: "Python Intermediate",
    category: "Programming",
    icon: <FaPython />,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "React Essentials",
    category: "Frontend",
    icon: <FaCode />,
    color: "bg-indigo-100 text-indigo-500",
  },
  {
    title: "Data Structures",
    category: "CS Fundamentals",
    icon: <FaDatabase />,
    color: "bg-green-100 text-green-500",
  },
  {
    title: "SQL Queries",
    category: "Database",
    icon: <FaDatabase />,
    color: "bg-purple-100 text-purple-500",
  },
  {
    title: "Java",
    category: "Programming",
    icon: <FaJava />,
    color: "bg-red-100 text-red-500",
  },
];

function QuizzesPreview() {
  return (
    <section className="pt-0 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Card Panel */}
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">
            Sharpen Your Skills
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon Section */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl ${quiz.color}`}>
                  {quiz.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {quiz.subTopic.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-500">{quiz.category}</p>
              </div>
            ))}
          </div>

          {/* View All Quizzes Button */}
          <div className="mt-14 text-center">
            <a
              href="/quizzes"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all text-lg font-semibold"
            >
              View All Quizzes
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default QuizzesPreview;
