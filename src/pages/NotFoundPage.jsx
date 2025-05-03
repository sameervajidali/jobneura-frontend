// src/pages/NotFoundPage.jsx
import React, { useState } from 'react';

function NotFoundPage() {
  const [formData, setFormData] = useState({ name: '', email: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send formData to your backend, Google Sheet, or email service
    console.log('Waitlist submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="h-[85vh] flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          But don’t worry — you can still be part of something exciting!
        </p>

        {submitted ? (
          <div className="text-green-600 font-semibold">
            🎉 You’ve joined the waitlist. We’ll be in touch!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select
              name="interest"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={formData.interest}
              onChange={handleChange}
              required
            >
              <option value="">I'm most interested in...</option>
              <option value="Resume Builder">AI Resume Builder</option>
              <option value="Skill Quizzes">Skill Quizzes</option>
              <option value="Job Matching">Smart Job Matching</option>
              <option value="All features">All features</option>
            </select>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default NotFoundPage;
