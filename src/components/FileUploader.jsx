import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { storage } from '../firebase/config';
import API from '../services/axios';

export default function FileUploader({ accept, onUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Get current authenticated user from backend (trusted)
  useEffect(() => {
    API.get('/auth/me')
      .then(res => setUserId(res.data?.user?._id))
      .catch(() => setUserId(null));
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    setError(null);
    setIsUploading(true);

    try {
      // ✅ Secure path includes user ID
      const path = `uploads/${userId}/${Date.now()}_${file.name}`;
      const fileRef = storageRef(storage, path);

      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      onUpload?.({ url, file });
    } catch (err) {
      console.error('Firebase upload error', err);
      setError('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={isUploading || !userId}
        className="mb-2"
      />
      {isUploading && <p>Uploading…</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
};

FileUploader.defaultProps = {
  accept: '*/*',
};
