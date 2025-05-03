import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Gradient Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Company Section */}
        <div>
          <h3 className="text-white text-2xl font-extrabold mb-4">JobNeura<span className="text-indigo-400">.tech</span></h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering your career with smarter AI tools. Build, enhance, and find your dream job faster.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-indigo-400 transition">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-indigo-400 transition">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400 transition">Blog</Link></li>
          </ul>
        </div>

        {/* Products Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Products</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/features" className="hover:text-indigo-400 transition">Features</Link></li>
            <li><Link to="/jobs" className="hover:text-indigo-400 transition">Find Jobs</Link></li>
            <li><Link to="/quizzes" className="hover:text-indigo-400 transition">Skill Quizzes</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400 transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Resources & Socials */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-6 underline decoration-indigo-500">Resources</h4>
          <ul className="space-y-3 text-sm mb-6">
            <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
            <li><Link to="/help" className="hover:text-indigo-400 transition">Help Center</Link></li>
          </ul>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm px-6">
        <div className="text-gray-500">© {new Date().getFullYear()} JobNeura.tech. All rights reserved.</div>
        <div className="mt-4 md:mt-0">
          <button className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs hover:text-white hover:bg-indigo-500 transition">
            🌐 English
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
