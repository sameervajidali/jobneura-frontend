// src/components/admin/UserDetailsCard.jsx
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTag,
  FaCalendarAlt,
  FaClock,
  FaShareAlt,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn
} from 'react-icons/fa';

export default function UserDetailsCard({ user }) {
  const [showShare, setShowShare] = useState(false);

  const shareUrl = window.location.href;
  const text = `Check out ${user.name}'s profile on JobNeura!`;

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 max-w-3xl mx-auto">
      {/* Share Button */}
      <button
        onClick={() => setShowShare(s => !s)}
        className="absolute top-4 right-4 p-2 bg-indigo-50 dark:bg-gray-700 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-600 transition"
        aria-label="Share profile"
      >
        <FaShareAlt className="text-indigo-600 dark:text-indigo-400" />
      </button>
      {showShare && (
        <div className="absolute top-12 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          {shareLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition space-x-2"
            >
              <span>{link.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{link.name}</span>
            </a>
          ))}
        </div>
      )}

      {/* Avatar & Name */}
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar || '/default-avatar.png'}
          alt={`${user.name} avatar`}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-600"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {user.name}
          </h1>
          <span className="inline-block mt-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-indigo-100 text-xs font-semibold rounded-full uppercase">
            {user.role}
          </span>
        </div>
      </div>

      {/* Contact & Location */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
        <li className="flex items-center space-x-2">
          <FaEnvelope /> <a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a>
        </li>
        <li className="flex items-center space-x-2">
          <FaPhone /> <a href={`tel:${user.phone}`} className="hover:underline">{user.phone}</a>
        </li>
        <li className="flex items-center space-x-2">
          <FaMapMarkerAlt /> <span>{user.location}</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaTag /> <span className="capitalize">{user.provider}</span>
        </li>
      </ul>

      {/* Meta Info */}
      <ul className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
        <li className="flex items-center space-x-2">
          <FaCalendarAlt /> <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
        </li>
        <li className="flex items-center space-x-2">
          <FaClock /> <span>Last login: {user.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : '—'}</span>
        </li>
      </ul>
    </div>
  );
}
