import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative" aria-label="Footer">
      {/* Top Gradient Border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-2xl font-extrabold mb-4">JobNeura
            <span className="text-indigo-400">.tech</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Empowering your career with smarter AI tools.<br />
            Build, enhance, and find your dream job—faster.
          </p>
        </div>

        {/* Company Links */}
        <nav aria-label="Company" className="min-w-[150px]">
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-indigo-400 transition focus-visible:underline">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-indigo-400 transition focus-visible:underline">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition focus-visible:underline">Contact</Link></li>
            <li><Link to="/blogs" className="hover:text-indigo-400 transition focus-visible:underline">Blog</Link></li>
          </ul>
        </nav>

        {/* Product Links */}
        <nav aria-label="Products" className="min-w-[150px]">
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Products</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/features" className="hover:text-indigo-400 transition focus-visible:underline">Features</Link></li>
            <li><Link to="/jobs" className="hover:text-indigo-400 transition focus-visible:underline">Find Jobs</Link></li>
            <li><Link to="/quizzes" className="hover:text-indigo-400 transition focus-visible:underline">Skill Quizzes</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400 transition focus-visible:underline">Pricing</Link></li>
          </ul>
        </nav>

        {/* Resources + Socials */}
        <nav aria-label="Resources" className="min-w-[150px]">
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Resources</h4>
          <ul className="space-y-3 text-sm mb-6">
            <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition focus-visible:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400 transition focus-visible:underline">Terms of Service</Link></li>
            <li><Link to="/help" className="hover:text-indigo-400 transition focus-visible:underline">Help Center</Link></li>
          </ul>
          {/* Social Buttons */}
          <div className="flex gap-3 mt-2" aria-label="Social media">
            <a href="https://facebook.com/jobneura" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/jobneura" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/jobneura" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm px-6 gap-2">
        <span className="text-gray-500 text-center">© {new Date().getFullYear()} JobNeura.tech. All rights reserved.</span>
        <button className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs hover:text-white hover:bg-indigo-500 transition focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label="Change language">
          🌐 English
        </button>
      </div>
    </footer>
  );
}

export default Footer;
