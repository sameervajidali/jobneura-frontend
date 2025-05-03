import React from "react";
import { Cpu, BarChart3, Brain, CloudSun, Shield, BadgeCheck, Flame, Users, Code2,FileCode2,Cloud, ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { title: "Web Development", icon: <Cpu className="w-6 h-6 text-indigo-500" /> },
  { title: "Data Science", icon: <BarChart3 className="w-6 h-6 text-blue-500" /> },
  { title: "AI & ML", icon: <Brain className="w-6 h-6 text-purple-500" /> },
  { title: "Cloud Computing", icon: <CloudSun className="w-6 h-6 text-sky-500" /> },
  { title: "Cybersecurity", icon: <Shield className="w-6 h-6 text-red-500" /> },
  { title: "Product Management", icon: <BadgeCheck className="w-6 h-6 text-yellow-500" /> },
];

const skills = [
    { label: "React.js", color: "text-sky-500", bg: "bg-sky-100", icon: <Code2 className="w-6 h-6" /> },
    { label: "Python", color: "text-yellow-600", bg: "bg-yellow-100", icon: <FileCode2 className="w-6 h-6" /> },
    { label: "AWS", color: "text-orange-500", bg: "bg-orange-100", icon: <Cloud className="w-6 h-6" /> },
    { label: "Node.js", color: "text-green-600", bg: "bg-green-100", icon: <Cpu className="w-6 h-6" /> },
    { label: "Prompt Engineering", color: "text-purple-600", bg: "bg-purple-100", icon: <Brain className="w-6 h-6" /> },
    { label: "Blockchain", color: "text-indigo-600", bg: "bg-indigo-100", icon: <Shield className="w-6 h-6" /> },
  ];
  
const programmingLanguages = ["JavaScript", "Python", "Go", "C++", "Rust", "TypeScript"];

const popularQuizzes = [
  { title: "React.js Advanced Quiz", questions: 20, time: "30 minutes", attempts: "14k+" },
  { title: "Python Coding Challenges", questions: 15, time: "25 minutes", attempts: "18k+" },
  { title: "AWS Cloud Practitioner", questions: 22, time: "40 minutes", attempts: "9k+" },
];

export default function QuizLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero Banner */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sharpen Your Skills. Land Your Dream Job.</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Choose from our expertly crafted quizzes to assess and grow your skills. Whether you're a beginner or pro, we've got something for everyone.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow">
          Get Started
        </button>
      </section>

      {/* Quiz Categories */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-2">Quiz Categories</h2>
        <p className="text-center text-gray-500 mb-10">Explore skill areas and master your path.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer flex flex-col items-center justify-center text-center"
            >
              {cat.icon}
              <p className="mt-4 font-semibold text-gray-800">{cat.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Trending Skills */}
      <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Top Trending Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`rounded-xl border border-gray-200 shadow-sm ${skill.bg} p-6 hover:shadow-md transition flex flex-col items-center justify-center`}
            >
              <Flame size={28} className={`mb-2 ${skill.color}`} />
              <h3 className={`text-lg font-semibold ${skill.color}`}>{skill.label}</h3>
              <p className="text-xs text-gray-500 mt-1">🔥 Trending among learners</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Programming Languages */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">Programming Languages</h2>
    <p className="text-gray-500 mb-10">Explore coding languages relevant to today’s tech industry</p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {[
        { name: "JavaScript", color: "text-yellow-600", bg: "bg-yellow-100" },
        { name: "Python", color: "text-blue-700", bg: "bg-blue-100" },
        { name: "Go", color: "text-teal-700", bg: "bg-teal-100" },
        { name: "C++", color: "text-red-600", bg: "bg-red-100" },
        { name: "Rust", color: "text-orange-700", bg: "bg-orange-100" },
        { name: "TypeScript", color: "text-indigo-600", bg: "bg-indigo-100" },
        { name: "Java", color: "text-rose-600", bg: "bg-rose-100" },
        { name: "Kotlin", color: "text-violet-600", bg: "bg-violet-100" },
      ].map((lang, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-sm border hover:shadow-md transition ${lang.bg}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lang.color} mb-3 text-xl font-bold`}>
            {lang.name.charAt(0)}
          </div>
          <p className={`text-md font-semibold ${lang.color}`}>{lang.name}</p>
          <span className="text-xs text-gray-500 mt-1">Core Language</span>
        </div>
      ))}
    </div>
  </div>
</section>


{/* Most Popular Quizzes */}
<section className="bg-gray-50 py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-4">Most Popular Quizzes</h2>
    <p className="text-center text-gray-500 mb-10">
      Join thousands of professionals practicing these high-demand skills.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {popularQuizzes.map((quiz, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border hover:shadow-lg p-6 transition-all flex flex-col justify-between"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-indigo-700">{quiz.title}</h3>
            <p className="text-sm text-gray-600">{quiz.questions} Questions | {quiz.time}</p>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Users className="w-4 h-4" /> {quiz.attempts} attempts
            </div>
          </div>

          <div className="mt-6">
            <button className="text-indigo-600 font-semibold text-sm inline-flex items-center gap-1 hover:underline">
              Start Quiz <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* CTA Footer Section */}
      <section className="py-20 text-center bg-gradient-to-r from-purple-100 to-indigo-100">
        <h2 className="text-3xl font-bold mb-4">Not sure where to begin?</h2>
        <p className="text-gray-600 mb-6">Take our skill assessment quiz and get personalized recommendations.</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow inline-flex items-center gap-2">
          Start Skill Assessment <ArrowRightCircle className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}
