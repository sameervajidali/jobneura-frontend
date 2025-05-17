import React from "react";
import JobCard from "../components/jobs/JobCard";
import JobSearchSection from "../components/jobs/JobSearchSection";

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
];

export default function JobsPage() {
  return (
    <section className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#e0e7ff] via-[#eef2ff] to-[#c7d2fe]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Bar Section */}
        <JobSearchSection />

        {/* 3-Card Premium Row */}
        <div className="flex flex-row gap-8 justify-center items-stretch w-full max-w-7xl mx-auto py-10">
          {dummyJobs.slice(0, 3).map((job, idx) => (
            <JobCard job={job} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
