import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import qsService from '../../../services/questionService.js';

export default function QuestionListPage() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    setLoading(true);
    qsService.getQuestionsByQuizId(quizId)
      .then(setQuestions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleDelete = id => {
    if (!window.confirm('Delete this question?')) return;
    qsService.deleteQuestion(quizId, id)
      .then(() => setQuestions(qs => s => s.filter(q => q._id !== id)))
      .catch(err => alert(err.message));
  };

  if (loading) return <p>Loading questions…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Questions</h2>
        <Link
          to={`/admin/quizzes/${quizId}/questions/new`}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >+ New Question</Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {['Text','Topic','Difficulty','Actions'].map(h => (
              <th key={h} className="p-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q._id} className="border-t">
              <td className="p-2">{q.text}</td>
              <td className="p-2">{q.topicTag}</td>
              <td className="p-2">{q.difficulty}</td>
              <td className="p-2 space-x-2">
                <Link
                  to={`/admin/quizzes/${quizId}/questions/${q._id}/edit`}
                  className="text-blue-600 hover:underline"
                >Edit</Link>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="text-red-600 hover:underline"
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/quizzes" className="mt-4 inline-block text-sm text-gray-600 hover:underline">
        ← Back to Quizzes
      </Link>
    </div>
  );
}
