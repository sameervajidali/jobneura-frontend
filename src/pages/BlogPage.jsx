// src/pages/BlogPage.jsx
import React from "react";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "AI in Job Search: The Future of Recruitment",
    date: "June 1, 2025",
    category: "Artificial Intelligence",
    summary:
      "Explore how artificial intelligence is transforming job search platforms, from smart matching to resume optimization.",
  },
  {
    id: 2,
    title: "Remote Work Trends in 2025",
    date: "May 25, 2025",
    category: "Remote Work",
    summary:
      "Discover the latest trends in remote work, hybrid teams, and global hiring as we move further into the digital workspace.",
  },
  {
    id: 3,
    title: "Top Skills Employers Look For in 2025",
    date: "May 15, 2025",
    category: "Career Advice",
    summary:
      "From AI literacy to communication, see what skills are most in-demand in the current job market.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        JobNeura Blog
      </h1>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition duration-300 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <Badge>{post.category}</Badge>
            </div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
