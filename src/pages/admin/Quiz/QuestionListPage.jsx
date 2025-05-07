// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import qsService from '../../../services/questionService.js';

// export default function QuestionListPage() {
//   const { quizId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState('');

//   useEffect(() => {
//     setLoading(true);
//     qsService.getQuestionsByQuizId(quizId)
//       .then(setQuestions)
//       .catch(err => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [quizId]);

//   const handleDelete = id => {
//     if (!window.confirm('Delete this question?')) return;
//     qsService.deleteQuestion(quizId, id)
//       .then(() => setQuestions(qs => s => s.filter(q => q._id !== id)))
//       .catch(err => alert(err.message));
//   };

//   if (loading) return <p>Loading questions…</p>;
//   if (error)   return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Manage Questions</h2>
//         <Link
//           to={`/admin/quizzes/${quizId}/questions/new`}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >+ New Question</Link>
//       </div>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             {['Text','Topic','Difficulty','Actions'].map(h => (
//               <th key={h} className="p-2 text-left">{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map(q => (
//             <tr key={q._id} className="border-t">
//               <td className="p-2">{q.text}</td>
//               <td className="p-2">{q.topicTag}</td>
//               <td className="p-2">{q.difficulty}</td>
//               <td className="p-2 space-x-2">
//                 <Link
//                   to={`/admin/quizzes/${quizId}/questions/${q._id}/edit`}
//                   className="text-blue-600 hover:underline"
//                 >Edit</Link>
//                 <button
//                   onClick={() => handleDelete(q._id)}
//                   className="text-red-600 hover:underline"
//                 >Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Link to="/admin/quizzes" className="mt-4 inline-block text-sm text-gray-600 hover:underline">
//         ← Back to Quizzes
//       </Link>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import qsService from '../../../services/questionService.js';

export default function QuestionListPage() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    qsService.getQuestionsByQuizId(quizId)
      .then(data => setQuestions(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleDelete = id => {
    if (!window.confirm('Delete this question?')) return;
    qsService.deleteQuestion(quizId, id)
      .then(() => setQuestions(prev => prev.filter(q => q._id !== id)))
      .catch(err => alert(err.message));
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading questions…</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Questions</h2>
        <Link
          to={`/admin/quizzes/${quizId}/questions/new`}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          + New Question
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((q, idx) => (
              <tr key={q._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{q.text}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{q.topicTag || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{q.difficulty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                  <Link
                    to={`/admin/quizzes/${quizId}/questions/${q._id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <Link to="/admin/quizzes" className="text-sm text-gray-600 hover:underline">
          ← Back to Quizzes
        </Link>
      </div>
    </div>
  );
}
