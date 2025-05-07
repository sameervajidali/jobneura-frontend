// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import quizService from '../../../services/quizService';

// export default function BulkUploadQuestionsPage() {
//   const { quizId } = useParams();
//   const navigate = useNavigate();
//   const [mode, setMode] = useState('json'); // 'json' or 'csv'
//   const [jsonInput, setJsonInput] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleJsonSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');
//     try {
//       const parsed = JSON.parse(jsonInput);
//       if (!Array.isArray(parsed)) throw new Error('JSON must be an array of questions');
//       const res = await quizService.bulkUploadQuestions(quizId, parsed);
//       setMessage(`Successfully uploaded ${res.count} questions.`);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0] || null);
//   };

//   const handleFileSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a CSV or XLSX file');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setMessage('');
//     try {
//       const res = await quizService.bulkUploadQuestionsFile(quizId, file);
//       setMessage(`Successfully uploaded ${res.count} questions.`);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Bulk Upload Questions</h2>
//       <div className="flex mb-6">
//         <button
//           className={`px-4 py-2 mr-2 border-b-2 ${mode === 'json' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
//           onClick={() => setMode('json')}
//         >
//           JSON
//         </button>
//         <button
//           className={`px-4 py-2 border-b-2 ${mode === 'csv' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
//           onClick={() => setMode('csv')}
//         >
//           CSV / XLSX
//         </button>
//       </div>

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {message && <p className="text-green-600 mb-4">{message}</p>}

//       {mode === 'json' && (
//         <form onSubmit={handleJsonSubmit} className="space-y-4">
//           <textarea
//             value={jsonInput}
//             onChange={(e) => setJsonInput(e.target.value)}
//             rows={10}
//             placeholder="Paste JSON array of questions here"
//             className="w-full border rounded p-3 font-mono text-sm"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? 'Uploading…' : 'Upload JSON'}
//           </button>
//         </form>
//       )}

//       {mode === 'csv' && (
//         <form onSubmit={handleFileSubmit} className="space-y-4">
//           <input
//             type="file"
//             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//             onChange={handleFileChange}
//             className="block"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? 'Uploading…' : 'Upload File'}
//           </button>
//         </form>
//       )}

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-6 text-sm text-gray-600 hover:underline"
//       >
//         &larr; Back to Quiz List
//       </button>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../../../services/quizService.js';

export default function BulkUploadQuestionsPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState('json'); // 'json' or 'csv'
  const [jsonInput, setJsonInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Download a sample CSV template
  const downloadCsvTemplate = () => {
    const header = ['question','option1','option2','option3','option4','correctAnswer','topic','explanation','difficulty'];
    const rows = [
      ['What does Array.map() return?','A new array','Undefined','A string','An object','0','Arrays','map() always returns a new array of the same length.','easy'],
      ['Which keyword declares a block-scoped variable?','var','let','int','static','1','Variables','`let` and `const` are block scoped, whereas `var` is function scoped.','medium']
    ];
    const csvContent = [header, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'questions_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleJsonSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) throw new Error('JSON must be an array of questions');
      const res = await quizService.bulkUploadQuestions(quizId, parsed);
      setMessage(`Successfully uploaded ${res.count} questions.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV or XLSX file');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await quizService.bulkUploadQuestionsFile(quizId, file);
      setMessage(`Successfully uploaded ${res.count} questions.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Bulk Upload Questions</h2>
        <button
          type="button"
          onClick={downloadCsvTemplate}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Download CSV Template
        </button>
      </div>

      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 border-b-2 ${mode === 'json' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
          onClick={() => setMode('json')}
        >
          JSON
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${mode === 'csv' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
          onClick={() => setMode('csv')}
        >
          CSV / XLSX
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {mode === 'json' && (
        <form onSubmit={handleJsonSubmit} className="space-y-4">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={10}
            placeholder="Paste JSON array of questions here"
            className="w-full border rounded p-3 font-mono text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Uploading…' : 'Upload JSON'}
          </button>
        </form>
      )}

      {mode === 'csv' && (
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
            className="block"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Uploading…' : 'Upload File'}
          </button>
        </form>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-sm text-gray-600 hover:underline"
      >
        &larr; Back to Quiz List
      </button>
    </div>
  );
}
