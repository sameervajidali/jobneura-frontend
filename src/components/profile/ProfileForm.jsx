// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import API from '../../services/axios'
// import FileUploader from '../FileUploader'

// export default function ProfileForm({ initialData, onRefresh }) {
//   const [profile, setProfile] = useState({
//     name: '',
//     phone: '',
//     location: '',
//     bio: '',
//     website: '',
//     linkedin: '',
//     // … any other fields …
//     avatar: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState(null)

//   // populate form when initialData arrives
//   useEffect(() => {
//     if (initialData) {
//       setProfile({
//         name:     initialData.name     || '',
//         phone:    initialData.phone    || '',
//         location: initialData.location || '',
//         bio:      initialData.bio      || '',
//         website:  initialData.website  || '',
//         linkedin: initialData.linkedin || '',
//         avatar:   initialData.avatar   || ''
//       })
//     }
//   }, [initialData])

//   // Generic change handler
//   const handleChange = e => {
//     const { name, value } = e.target
//     setProfile(p => ({ ...p, [name]: value }))
//   }

//   // When FileUploader gives us a URL, stick it into `profile.avatar`
//   const handleUpload = ({ url }) => {
//     setProfile(p => ({ ...p, avatar: url }))
//   }

//  const handleSubmit = async e => {
//   e.preventDefault()
//   setLoading(true)
//   setMessage(null)

//   // ① Log the entire profile object
//   console.log("About to send payload:", profile)

//   try {
//     await API.put('/auth/profile', profile)
//     await onRefresh()
//     setMessage({ type: 'success', text: 'Profile updated!' })
//   } catch (err) {
//     setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' })
//   } finally {
//     setLoading(false)
//   }
// }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Avatar uploader */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Avatar
//         </label>
//         <FileUploader
//           accept="image/*"
//           onUpload={handleUpload}
//         />
//         {profile.avatar && (
//           <img
//             src={profile.avatar}
//             alt="Preview"
//             className="mt-2 w-24 h-24 rounded-full object-cover"
//           />
//         )}
//       </div>

//       {/* Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Name</label>
//         <input
//           name="name"
//           value={profile.name}
//           onChange={handleChange}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Phone</label>
//         <input
//           name="phone"
//           value={profile.phone}
//           onChange={handleChange}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Location</label>
//         <input
//           name="location"
//           value={profile.location}
//           onChange={handleChange}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* Bio */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Bio</label>
//         <textarea
//           name="bio"
//           value={profile.bio}
//           onChange={handleChange}
//           rows={3}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* Website */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Website</label>
//         <input
//           name="website"
//           value={profile.website}
//           onChange={handleChange}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* LinkedIn */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
//         <input
//           name="linkedin"
//           value={profile.linkedin}
//           onChange={handleChange}
//           className="mt-1 block w-full border rounded px-3 py-2"
//         />
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//       >
//         {loading ? 'Saving…' : 'Save Changes'}
//       </button>

//       {message && (
//         <p
//           className={`text-center mt-2 ${
//             message.type === 'success' ? 'text-green-600' : 'text-red-600'
//           }`}
//         >
//           {message.text}
//         </p>
//       )}
//     </form>
//   )
// }

// ProfileForm.propTypes = {
//   initialData: PropTypes.object.isRequired,
//   onRefresh:   PropTypes.func.isRequired
// }



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

  // populate when we get initialData
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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow">
      {/* Avatar */}
      <div className="flex items-center space-x-6">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">Avatar</div>
          <FileUploader accept="image/*" onUpload={handleUpload} />
        </div>
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt="Avatar preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Basic Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="San Francisco, CA"
              value={profile.location}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="A few sentences about yourself..."
              value={profile.bio}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Social & Links */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Online Presence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Personal Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://yourdomain.com"
              value={profile.website}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={profile.linkedin}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white
            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
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
    avatar:   PropTypes.string
  }).isRequired,
  onRefresh: PropTypes.func.isRequired
}
