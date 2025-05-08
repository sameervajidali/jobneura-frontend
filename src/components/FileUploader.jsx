// src/components/FileUploader.jsx
import React, { useState } from 'react';
import { storage, storageRef, uploadBytes, getDownloadURL } from '../firebase';

export default function FileUploader({ onUpload }) {
  const [file, setFile]     = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]   = useState('');

  const handleChange = e => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setUploading(true);
    try {
      // Create a unique path: e.g. "uploads/userId/timestamp_filename"
      const path = `uploads/${Date.now()}_${file.name}`;
      const ref  = storageRef(storage, path);

      // Upload
      await uploadBytes(ref, file);

      // Get public URL
      const url = await getDownloadURL(ref);

      // Callback to parent
      onUpload({ path, url });
    } catch (err) {
      console.error(err);
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleChange} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading…' : 'Upload File'}
      </button>
    </div>
  );
}
