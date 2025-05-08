// src/components/FileUploader.jsx
import React, { useState } from 'react';
import { 
  getStorage, 
  ref as storageRef,      // <— alias here 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

export default function FileUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const storage = getStorage();  // you can also import a pre-configured instance

  const handleChange = async e => {
    const f = e.target.files[0];
    setFile(f);

    // 1) create a reference in your bucket
    const path = `uploads/${Date.now()}_${f.name}`;
    const ref = storageRef(storage, path);

    // 2) upload
    await uploadBytes(ref, f);

    // 3) get its public URL
    const url = await getDownloadURL(ref);

    // 4) hand it back up
    onUpload && onUpload(url);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {file && <p>Uploading “{file.name}”…</p>}
    </div>
  );
}
