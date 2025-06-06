// src/components/landing/FeaturesSection.jsx
import React from "react";
import { FaCertificate, FaBook, FaUserEdit, FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Quiz",
    description: "Receive a certificate after completing a quiz.",
    icon: <FaCertificate className="text-3xl text-yellow-400" />,
    link: "/quizzes",
    cta: "Take Quiz",
    badge: "Certificate",
  },
  {
    title: "Tutorials",
    description: "Expert guides & hands-on coding lessons.",
    icon: <FaBook className="text-3xl text-blue-400" />,
    link: "/tutorials",
    cta: "View Tutorials",
    badge: null,
  },
  {
    title: "Blogs",
    description: "Trending insights, career tips & news.",
    icon: <FaBlog className="text-3xl text-pink-400" />,
    link: "/blogs",
    cta: "View Blogs",
    badge: "Trending",
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with AI assistance.",
    icon: <FaUserEdit className="text-3xl text-indigo-400" />,
    link: "#",
    cta: "Coming Soon",
    badge: "Coming Soon",
    disabled: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((f, idx) => (
        <div
          key={idx}
          className={`
            rounded-2xl shadow-xl bg-white dark:bg-gray-900 p-7 flex flex-col items-start
            border-t-4 ${
              f.badge === "Certificate"
                ? "border-yellow-400"
                : f.badge === "Trending"
                ? "border-pink-400"
                : f.badge === "Coming Soon"
                ? "border-indigo-400"
                : "border-blue-200"
            }
            relative
            ${f.disabled ? "opacity-60 pointer-events-none" : ""}
          `}
        >
          {/* Icon & Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span>{f.icon}</span>
            {f.badge && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  f.badge === "Certificate"
                    ? "bg-yellow-400 text-indigo-900"
                    : f.badge === "Trending"
                    ? "bg-pink-400 text-white"
                    : f.badge === "Coming Soon"
                    ? "bg-indigo-400 text-white"
                    : "bg-blue-400 text-white"
                }`}
              >
                {f.badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2 text-indigo-800 dark:text-indigo-100">{f.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{f.description}</p>
          {f.cta && (
            <Link
              to={f.link}
              className={`
                mt-auto px-5 py-2 rounded-full font-bold text-base shadow transition
                ${
                  f.disabled
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : f.badge === "Certificate"
                    ? "bg-yellow-400 text-indigo-900 hover:bg-yellow-300"
                    : f.badge === "Trending"
                    ? "bg-pink-400 text-white hover:bg-pink-300"
                    : f.badge === "Coming Soon"
                    ? "bg-indigo-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }
              `}
              tabIndex={f.disabled ? -1 : 0}
              aria-disabled={f.disabled}
            >
              {f.cta}
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}
