// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { bulkUploadQuestionsFile } from '../../../services/quizService';
// import { saveAs } from 'file-saver';
// import { Parser } from 'json2csv';


// export default function BulkUploadQuestionsPage() {
//   const { quizId } = useParams();
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = e => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     setStatus('');
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setStatus('Please select a CSV or XLSX file first.');
//       return;
//     }
//     setUploading(true);
//     setStatus('Uploading…');
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       await bulkUploadQuestionsFile(quizId, formData);
//       setStatus('✅ Bulk upload successful!');
//     } catch (err) {
//       console.error('Bulk upload error:', err);
//       const msg = err.response?.data?.message || err.message;
//       setStatus(`❌ Upload failed: ${msg}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const downloadCSV = (resultArray) => {
//   try {
//     const parser = new Parser();
//     const csv = parser.parse(resultArray);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
//     saveAs(blob, 'quiz_upload_report.csv');
//   } catch (err) {
//     console.error('CSV export error:', err);
//   }
// };


//   return (
//     <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Bulk Upload Questions</h2>
//       <p className="text-sm text-gray-600 mb-2">
//         Upload a CSV or XLSX file to add multiple questions at once.
//       </p>
//       <input
//         type="file"
//         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         onChange={handleFileChange}
//         disabled={uploading}
//         className="block w-full text-sm mb-4"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition"
//       >
//         {uploading ? 'Uploading…' : 'Upload Questions'}
//       </button>
//       {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bulkUploadQuestionsFile } from '../../../services/quizService';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse'; // ✅ Use papaparse instead of json2csv

export default function BulkUploadQuestionsPage() {
  const { quizId } = useParams();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = e => {
    const selected = e.target.files[0];
    setFile(selected);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a CSV or XLSX file first.');
      return;
    }
    setUploading(true);
    setStatus('Uploading…');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await bulkUploadQuestionsFile(quizId, formData);
      setStatus('✅ Bulk upload successful!');
      
      // Optional: download report
      if (result?.data?.report) {
        downloadCSV(result.data.report);
      }
    } catch (err) {
      console.error('Bulk upload error:', err);
      const msg = err.response?.data?.message || err.message;
      setStatus(`❌ Upload failed: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  const downloadCSV = (resultArray) => {
    try {
      const csv = unparse(resultArray); // ✅ Convert JSON to CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'quiz_upload_report.csv');
    } catch (err) {
      console.error('CSV export error:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Bulk Upload Questions</h2>
      <p className="text-sm text-gray-600 mb-2">
        Upload a CSV or XLSX file to add multiple questions at once.
      </p>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {uploading ? 'Uploading…' : 'Upload Questions'}
      </button>
      {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
