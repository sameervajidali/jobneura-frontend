// import React, { useState } from 'react';
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL
// } from 'firebase/storage';
// import { storage } from '../firebaseConfig';

// export default function FileUploader({ onUpload }) {
//   const [file, setFile]       = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError]     = useState(null);

//   const handleChange = async (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setError(null);
//     setIsUploading(true);

//     try {
//       // name it fileRef to avoid shadowing
//       const fileRef = storageRef(storage, `uploads/${Date.now()}_${f.name}`);
//       await uploadBytes(fileRef, f);
//       const url = await getDownloadURL(fileRef);
//       onUpload?.(url);
//     } catch (err) {
//       console.error('Upload error:', err);
//       setError('Upload failed');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         disabled={isUploading}
//         onChange={handleChange}
//       />
//       {isUploading && <p>Uploading “{file.name}”…</p>}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// }



// src/components/FileUploader.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { storage } from '../firebase/config';

export default function FileUploader({ accept, onUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const path = `uploads/${Date.now()}_${file.name}`;
      const fileRef = storageRef(storage, path);

      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // pass both URL and original File if caller wants a preview
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
        disabled={isUploading}
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

