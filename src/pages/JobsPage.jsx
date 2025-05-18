import React from "react";
import JobSearchSection from "../components/jobs/JobSearchSection";
import JobCard from "../components/jobs/JobCard";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Engineer (React)",
    company: "NextGenTech",
    location: "Remote",
    workType: "Remote",
    jobType: "Full-time",
    skills: ["React", "JavaScript", "UI/UX", "Tailwind"],
    salaryRange: "$2,000 – $3,500/mo",
    applyLink: "#",
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    company: "CloudNet",
    location: "Bangalore, India",
    workType: "Onsite",
    jobType: "Full-time",
    skills: ["Node.js", "Express", "MongoDB", "API"],
    salaryRange: "₹10L – ₹18L PA",
    applyLink: "#",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "PixelWorks",
    location: "Hybrid (Mumbai)",
    workType: "Hybrid",
    jobType: "Contract",
    skills: ["Figma", "Sketch", "Branding", "Design Systems"],
    salaryRange: "₹6,000 – ₹12,000/mo",
    applyLink: "#",
  },
  {
    id: 4,
    title: "AI Research Intern",
    company: "BrainTech Labs",
    location: "Bangalore, India",
    workType: "Onsite",
    jobType: "Internship",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    salaryRange: "₹20,000/mo",
    applyLink: "#",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "OpsGenie",
    location: "Remote",
    workType: "Remote",
    jobType: "Full-time",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    salaryRange: "$3,500 – $5,000/mo",
    applyLink: "#",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "MarketWave",
    location: "New York, USA",
    workType: "Onsite",
    jobType: "Contract",
    skills: ["SEO", "Google Ads", "Content Marketing"],
    salaryRange: "$60K–$75K",
    applyLink: "#",
  },
  {
    id: 7,
    title: "QA Automation Engineer",
    company: "Testify",
    location: "Delhi, India",
    workType: "Onsite",
    jobType: "Full-time",
    skills: ["Selenium", "Cypress", "Java", "Jest"],
    salaryRange: "₹7L – ₹14L PA",
    applyLink: "#",
  },
  {
    id: 8,
    title: "Full Stack Developer",
    company: "WebPro",
    location: "Chennai, India",
    workType: "Hybrid",
    jobType: "Full-time",
    skills: ["React", "Node.js", "GraphQL", "MongoDB"],
    salaryRange: "₹14L – ₹25L PA",
    applyLink: "#",
  },
  {
    id: 9,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Remote",
    workType: "Remote",
    jobType: "Contract",
    skills: ["Figma", "Adobe XD", "Wireframing"],
    salaryRange: "$1,500 – $2,500/mo",
    applyLink: "#",
  },
  {
    id: 10,
    title: "Cloud Solutions Architect",
    company: "CloudBase",
    location: "Bangalore, India",
    workType: "Onsite",
    jobType: "Full-time",
    skills: ["AWS", "Azure", "Microservices"],
    salaryRange: "₹24L – ₹35L PA",
    applyLink: "#",
  },
  {
    id: 11,
    title: "Content Strategist",
    company: "Contently",
    location: "Pune, India",
    workType: "Hybrid",
    jobType: "Full-time",
    skills: ["Content Writing", "SEO", "Analytics"],
    salaryRange: "₹5L – ₹10L PA",
    applyLink: "#",
  },
  {
    id: 12,
    title: "Business Analyst",
    company: "DataMinds",
    location: "Remote",
    workType: "Remote",
    jobType: "Contract",
    skills: ["SQL", "Excel", "Power BI", "Data Visualization"],
    salaryRange: "$2,200 – $3,000/mo",
    applyLink: "#",
  },
];

export default function JobsPage() {
  return (
    <main className="w-full min-h-screen bg-[#f8fafb] pb-20">
      <JobSearchSection />
      <div className="w-full flex items-center justify-center mt-12 mb-7">
        <div className="flex items-center gap-4 w-full max-w-4xl">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="text-lg font-semibold text-indigo-400 bg-[#f8fafb] px-5 select-none">
            Featured Jobs
          </span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>
      </div>
      <section className="w-full">
        <div className="w-full max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
            {dummyJobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
