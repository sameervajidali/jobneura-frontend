
import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaArrowRight, FaWhatsapp, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    location: "Remote",
    type: "Full-time",
    minExp: "2 Years",
    skills: ["React", "TailwindCSS", "Vite"],
    package: "₹6-8 LPA",
    link: "https://example.com/frontend-developer"
  },
  {
    title: "AI Research Intern",
    company: "BrainTech Labs",
    location: "Bangalore, India",
    type: "Internship",
    minExp: "0-1 Years",
    skills: ["Python", "ML", "TensorFlow"],
    package: "₹2-3 LPA",
    link: "https://example.com/ai-research-intern"
  },
  {
    title: "Marketing Specialist",
    company: "MarketWave",
    location: "New York, USA",
    type: "Contract",
    minExp: "3 Years",
    skills: ["SEO", "Google Ads", "Content Marketing"],
    package: "$60K-$75K",
    link: "https://example.com/marketing-specialist"
  },
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    location: "Remote",
    type: "Full-time",
    minExp: "2 Years",
    skills: ["React", "TailwindCSS", "Vite"],
    package: "₹6-8 LPA",
    link: "https://example.com/frontend-developer"
  },
  {
    title: "AI Research Intern",
    company: "BrainTech Labs",
    location: "Bangalore, India",
    type: "Internship",
    minExp: "0-1 Years",
    skills: ["Python", "ML", "TensorFlow"],
    package: "₹2-3 LPA",
    link: "https://example.com/ai-research-intern"
  },
  {
    title: "Marketing Specialist",
    company: "MarketWave",
    location: "New York, USA",
    type: "Contract",
    minExp: "3 Years",
    skills: ["SEO", "Google Ads", "Content Marketing"],
    package: "$60K-$75K",
    link: "https://example.com/marketing-specialist"
  }
];

function JobsPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-800">
          Explore New Career Opportunities
        </h2>

        {/* Carded Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200 hover:border-indigo-400 duration-300 ease-in-out"
            >
              <div className="text-left space-y-3">
                <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                  <FaBriefcase /> {job.title}
                </h3>
                <p className="text-gray-800 font-medium">{job.company}</p>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <FaMapMarkerAlt /> {job.location}
                </p>
                <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.type}
                </span>
                <p className="text-sm text-gray-600">
                  Min Exp: <strong>{job.minExp}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Skills: {job.skills.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Package: <strong>{job.package}</strong>
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-2 text-indigo-600">
                  <a href="#" title="Share on WhatsApp">
                    <FaWhatsapp className="hover:text-green-500 transition" />
                  </a>
                  <a href="#" title="Share on Facebook">
                    <FaFacebookF className="hover:text-blue-500 transition" />
                  </a>
                  <a href="#" title="Share on LinkedIn">
                    <FaLinkedinIn className="hover:text-blue-700 transition" />
                  </a>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full text-sm font-semibold hover:scale-105 hover:shadow-lg transition-all"
                >
                  Apply Now <FaArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs */}
        <div className="mt-8 mb-0">
  <a
    href="/jobs"
    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full hover:scale-105 hover:shadow-xl transition-all font-bold text-lg"
  >
    View All Jobs
  </a>
</div>

      </div>
    </section>
  );
}

export default JobsPreview;
