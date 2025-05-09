import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import API from '../../services/axios'
import FileUploader from '../FileUploader'

export default function ProfileForm({ initialData, onRefresh }) {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    linkedin: '',
    // … any other fields …
    avatar: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // populate form when initialData arrives
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

  // Generic change handler
  const handleChange = e => {
    const { name, value } = e.target
    setProfile(p => ({ ...p, [name]: value }))
  }

  // When FileUploader gives us a URL, stick it into `profile.avatar`
  const handleUpload = ({ url }) => {
    setProfile(p => ({ ...p, avatar: url }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // include avatar in the payload
      const payload = { ...profile }
      await API.put('/auth/profile', payload)

      // re-fetch the fresh user and update context
      await onRefresh()
      setMessage({ type: 'success', text: 'Profile updated!' })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Update failed'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar uploader */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Avatar
        </label>
        <FileUploader
          accept="image/*"
          onUpload={handleUpload}
        />
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt="Preview"
            className="mt-2 w-24 h-24 rounded-full object-cover"
          />
        )}
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          name="location"
          value={profile.location}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          name="website"
          value={profile.website}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          name="linkedin"
          value={profile.linkedin}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {loading ? 'Saving…' : 'Save Changes'}
      </button>

      {message && (
        <p
          className={`text-center mt-2 ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}

ProfileForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onRefresh:   PropTypes.func.isRequired
}
