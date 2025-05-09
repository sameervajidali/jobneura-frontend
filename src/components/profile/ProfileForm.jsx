// src/components/profile/ProfileForm.jsx
import React, { useState, useEffect, useRef } from 'react'
import API from '../../services/axios'

export default function ProfileForm({ user, onRefresh }) {
  const [form, setForm] = useState({
    name:     '',
    phone:    '',
    location: '',
    bio:      '',
  })
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()

  useEffect(() => {
    if (user) {
      setForm({
        name:     user.name     || '',
        phone:    user.phone    || '',
        location: user.location || '',
        bio:      user.bio      || '',
      })
      setAvatarUrl(user.avatar || '/default-avatar.png')
    }
  }, [user])

  const handleFieldChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await API.put('/auth/profile', form)
      onRefresh()
      alert('Profile updated!')
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const handleAvatarChange = async e => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const data = new FormData()
      data.append('avatar', file)
      const res = await API.put('/auth/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const newUrl = res.data.user.avatar
      setAvatarUrl(newUrl)
      onRefresh()
    } catch (err) {
      alert('Upload failed: ' + (err.message || err))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded">
          {uploading ? 'Uploading…' : 'Change Photo'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleFieldChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleFieldChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleFieldChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleFieldChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}
