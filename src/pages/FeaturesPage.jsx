// import React from 'react';
// import {
//   FileText,
//   Rocket,
//   GraduationCap,
//   Briefcase,
//   Search,
//   Bot,
//   Globe,
//   Brain,
// } from 'lucide-react';

// const features = [
//   {
//     title: 'AI Resume Builder',
//     description: 'Craft professional resumes in minutes using AI-generated content.',
//     icon: <FileText className="w-8 h-8 text-indigo-600" />,
//   },
//   {
//     title: 'Resume Enhancer',
//     description: 'Upload and enhance your resume with expert-level feedback and optimization.',
//     icon: <Rocket className="w-8 h-8 text-pink-500" />,
//   },
//   {
//     title: 'Skill Quizzes',
//     description: 'Test your skills with smart quizzes and earn certifications to boost your profile.',
//     icon: <GraduationCap className="w-8 h-8 text-green-500" />,
//   },
//   {
//     title: 'Job Recommendations',
//     description: 'Get personalized job suggestions based on your skills and goals.',
//     icon: <Briefcase className="w-8 h-8 text-blue-500" />,
//   },
//   {
//     title: 'Skill Gap Analyzer',
//     description: 'Know what skills you lack for your dream job — and how to bridge the gap.',
//     icon: <Search className="w-8 h-8 text-yellow-500" />,
//   },
//   {
//     title: 'Auto Job Apply',
//     description: 'Save time with automated job applications — hands-free job hunting.',
//     icon: <Bot className="w-8 h-8 text-red-500" />,
//   },
//   {
//     title: 'Portfolio Builder',
//     description: 'Build and share a beautiful portfolio to showcase your work.',
//     icon: <Globe className="w-8 h-8 text-cyan-500" />,
//   },
//   {
//     title: 'Career Coaching AI',
//     description: 'Get customized advice to accelerate your career growth.',
//     icon: <Brain className="w-8 h-8 text-purple-500" />,
//   },
// ];

// function FeaturesPage() {
//   return (
//     <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-20">
//       <div className="max-w-screen-xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
//           Everything You Need to Land Your Dream Job
//         </h2>
//         <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
//           JobNeura.tech is your AI-powered career assistant — built to help you build, improve, and grow your professional journey.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl p-6 transition-all duration-300 ease-in-out hover:scale-[1.02]"
//             >
//               <div className="mb-4">{feature.icon}</div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
//               <a
//                 href="/register"
//                 className="text-indigo-600 hover:underline text-sm font-medium"
//               >
//                 Try this feature →
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeaturesPage;



import React from 'react';
import {
  FileText,
  Rocket,
  GraduationCap,
  Briefcase,
  Search,
  Bot,
  Globe,
  Brain,
} from 'lucide-react';

const heroFeatures = [
  {
    title: 'AI Resume Builder',
    description: 'Craft job-winning resumes instantly with AI-generated content, templates, and formatting.',
    icon: <FileText className="w-10 h-10 text-white" />,
    bg: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Resume Enhancer',
    description: 'Get expert-level enhancements for your uploaded resumes with AI feedback and optimization.',
    icon: <Rocket className="w-10 h-10 text-white" />,
    bg: 'from-pink-500 to-red-500',
  },
];

const coreFeatures = [
  {
    title: 'Skill Quizzes',
    description: 'Test and certify your skills with role-specific quizzes and earn badges.',
    icon: <GraduationCap className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Job Recommendations',
    description: 'AI-driven job suggestions tailored to your experience, skills, and career goals.',
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Skill Gap Analyzer',
    description: 'Understand which skills you’re missing and how to improve to reach your dream role.',
    icon: <Search className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: 'Auto Job Apply',
    description: 'Automatically apply to job listings that match your profile and preferences.',
    icon: <Bot className="w-8 h-8 text-red-600" />,
  },
  {
    title: 'Portfolio Builder',
    description: 'Create and publish a beautiful portfolio to showcase your projects and achievements.',
    icon: <Globe className="w-8 h-8 text-cyan-600" />,
  },
  {
    title: 'Career Coaching AI',
    description: 'Get personalized AI-driven guidance for interviews, skill-building, and career growth.',
    icon: <Brain className="w-8 h-8 text-purple-600" />,
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Everything You Need to Land Your Dream Job
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          JobNeura.tech gives you professional tools to build, enhance, and grow your career — powered by AI.
        </p>

        {/* Hero Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {heroFeatures.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 text-white shadow-xl bg-gradient-to-br ${feature.bg} transition-transform hover:scale-[1.02] duration-300`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
              <a href="/register" className="mt-4 inline-block text-sm underline opacity-90">
                Try this feature →
              </a>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-50 border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
              <a href="/register" className="mt-3 inline-block text-indigo-600 text-sm font-medium hover:underline">
                Try this feature →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
