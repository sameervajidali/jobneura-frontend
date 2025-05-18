
// src/pages/NotFoundPage.jsx
import React, { useState } from 'react';
import API from '../services/axios'; // make sure you're importing your API instance

function NotFoundPage() {
  const [formData, setFormData] = useState({ name: '', email: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/public/waitlist', formData); // ✅ correct usage
      setSubmitted(true);
    } catch (error) {
      console.error('Waitlist submission failed:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6 text-base">
          But you can still be part of something powerful — Join our exclusive waitlist.
        </p>

        {submitted ? (
          <div className="text-green-600 font-semibold text-lg">
            🎉 You’ve successfully joined the waitlist. We'll be in touch soon!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select
              name="interest"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.interest}
              onChange={handleChange}
              required
            >
              <option value="">What are you most interested in?</option>
              <option value="Resume Builder">AI Resume Builder</option>
              <option value="Skill Quizzes">Skill Quizzes</option>
              <option value="Job Matching">Smart Job Matching</option>
              <option value="All features">All features</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default NotFoundPage;

