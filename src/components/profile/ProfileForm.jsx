// src/components/profile/ProfileForm.jsx
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import API from '../../services/axios'
import FileUploader from '../FileUploader'

export default function ProfileForm({ initialData, onRefresh }) {
  const [profile, setProfile] = useState({
    name:     '',
    phone:    '',
    location: '',
    bio:      '',
    website:  '',
    linkedin: '',
    avatar:   ''
  })
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState(null)

  useEffect(() => {
    if (initialData) {
      setProfile({
        name:     initialData.name     || '',
        phone:    initialData.phone    || '',
        location: initialData.location || '',
        bio:      initialData.bio      || '',
        website:  initialData.website  || '',
        linkedin: initialData.linkedin || '',
        avatar:   initialData.avatar   || ''
      })
    }
  }, [initialData])

  const handleChange = e => {
    const { name, value } = e.target
    setProfile(p => ({ ...p, [name]: value }))
  }

  const handleUpload = ({ url }) => {
    setProfile(p => ({ ...p, avatar: url }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      await API.put('/auth/profile', profile)
      await onRefresh()
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto
        border border-gray-100 dark:border-gray-800"
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* Avatar upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <img
            src={profile.avatar || '/avatar-default.svg'}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 dark:border-gray-800 shadow"
          />
          {/* Upload button */}
          <div className="absolute bottom-1 right-1">
            <FileUploader
              accept="image/*"
              onUpload={handleUpload}
              renderTrigger={({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow transition border-2 border-white dark:border-gray-900"
                  aria-label="Upload new avatar"
                  tabIndex={0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              )}
            />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{profile.name || "Your Name"}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</div>
          {profile.location && <div className="text-sm text-gray-500 dark:text-gray-400">{profile.location}</div>}
        </div>
      </div>

      {/* Basic Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Delhi"
              value={profile.location}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="A few sentences about yourself..."
              value={profile.bio}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>
      </section>

      {/* Online Presence */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">Online Presence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Personal Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://yourdomain.com"
              value={profile.website}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              LinkedIn Profile
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={profile.linkedin}
              onChange={handleChange}
              className="mt-1 block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>
      </section>

      {/* Save Button & Message */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 rounded-xl text-base font-semibold shadow-sm
            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            transition text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${message.type === 'success'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  )
}

ProfileForm.propTypes = {
  initialData: PropTypes.shape({
    name:     PropTypes.string,
    phone:    PropTypes.string,
    location: PropTypes.string,
    bio:      PropTypes.string,
    website:  PropTypes.string,
    linkedin: PropTypes.string,
    avatar:   PropTypes.string,
    email:    PropTypes.string,  // Add this so you can display in avatar card
  }).isRequired,
  onRefresh: PropTypes.func.isRequired
}
