// src/components/admin/UserDetailsCard.jsx
import React from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaShareAlt,
} from 'react-icons/fa';

export default function UserDetailsCard({ user }) {
  if (!user) return null;

  const shareUrl = `${window.location.origin}/admin/users/${user._id}`;
  const shareText = encodeURIComponent(
    `Check out ${user.name}'s profile on JobNeura Admin`
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100 dark:ring-gray-700"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ring-4 ring-indigo-100 dark:ring-gray-700">
              <FaUserCircle className="text-5xl text-gray-400" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </h2>
          <p className="mt-1 inline-flex items-center text-gray-600 dark:text-gray-300">
            <FaEnvelope className="mr-2" /> {user.email}
          </p>
          {user.phone && (
            <p className="mt-1 inline-flex items-center text-gray-600 dark:text-gray-300">
              <FaPhoneAlt className="mr-2" /> {user.phone}
            </p>
          )}
          {user.location && (
            <p className="mt-1 inline-flex items-center text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt className="mr-2" /> {user.location}
            </p>
          )}

          {/* Role Badge */}
          <div className="mt-4">
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </div>

        {/* Share Button */}
        <div className="mt-6 md:mt-0 md:ml-6 flex items-start">
          <button
            className="relative group bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={() => {
              // toggle the small “share menu”
              const menu = document.getElementById('share-menu');
              menu?.classList.toggle('hidden');
            }}
          >
            <FaShareAlt className="text-gray-600 dark:text-gray-300" />
            <div
              id="share-menu"
              className="hidden absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
            >
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-green-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}&quote=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FaFacebookF className="mr-2" /> Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FaLinkedinIn className="mr-2" /> LinkedIn
              </a>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
