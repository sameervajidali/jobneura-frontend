// frontend/src/components/landing/FeaturesSection.jsx
import React from 'react';
import { FaMagic, FaBolt, FaBrain, FaSearch, FaAward, FaRocket } from 'react-icons/fa';

const features = [
  {
    icon: <FaMagic size={28} />,
    title: "AI Resume Builder",
    description: "Create professional resumes instantly powered by AI.",
  },
  {
    icon: <FaBolt size={28} />,
    title: "Resume Enhancer",
    description: "Upgrade and polish your resumes for better visibility.",
  },
  {
    icon: <FaBrain size={28} />,
    title: "Skill Quizzes",
    description: "Test and strengthen your skills with targeted quizzes.",
  },
  {
    icon: <FaSearch size={28} />,
    title: "Smart Job Matching",
    description: "Get job recommendations based on your skills and interests.",
  },
  {
    icon: <FaAward size={28} />,
    title: "Career Insights",
    description: "Personalized tips and feedback to boost your career growth.",
  },
  {
    icon: <FaRocket size={28} />,
    title: "Auto Apply Feature",
    description: "Save time by automatically applying to matching jobs.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
          Features to Boost Your Career
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200 hover:border-indigo-400 duration-300 ease-in-out"
            >
              {/* Icon Circle with Frosted Glass Effect */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-indigo-600 mb-6 text-2xl shadow-inner">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
