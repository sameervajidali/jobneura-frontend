// // src/pages/QuizResultPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import quizService from '../services/quizService';

// export default function QuizResultPage() {
//   const { quizId, attemptId } = useParams();
//   const [attempt, setAttempt]       = useState(null);
//   const [stats,   setStats]         = useState({ rank: 0, total: 0, pct: 0 });
//   const [chartData, setChartData]   = useState([]);
//   const [breakdown, setBreakdown]   = useState([]);
//   const [topPerformers, setTopPerf] = useState([]);

//  // QuizResultPage.jsx
// useEffect(() => {
//   quizService.getAttemptStats(attemptId)
//     .then(({ attempt, rank, totalCount, percentile }) => {
//       setAttempt(attempt);
//       setStats({ rank, total: totalCount, pct: percentile });

//       setChartData([
//         { name: 'Correct', value: attempt.correctAnswers },
//         { name: 'Incorrect', value: attempt.totalQuestions - attempt.correctAnswers }
//       ]);

//       // Now use the populated `answers` array directly:
//       setBreakdown(
//         attempt.answers.map(ans => ({
//           text:        ans.question.text,
//           options:     ans.question.options,
//           selected:    ans.selectedIndex,
//           correctIdx:  ans.question.correctIndex,
//           explanation: ans.question.explanation
//         }))
//       );
//     })
//     .catch(console.error);

//     // 2️⃣ Load top-3 performers for this quiz this week
//     quizService.getQuizTopThree(quizId)
//       .then(setTopPerf)
//       .catch(console.error);
//   }, [quizId, attemptId]);

//   if (!attempt) {
//     return <p className="text-center py-12 text-gray-600">Loading your result…</p>;
//   }

//   // Download a JSON report
//   const downloadReport = () => {
//     const payload = {
//       quiz:        attempt.quiz._id,
//       title:       attempt.quiz.subTopic.name,
//       score:       attempt.score,
//       total:       attempt.totalQuestions,
//       rank:        stats.rank,
//       percentile:  stats.pct,
//       breakdown:   breakdown.map((b, i) => ({
//         question: b.text,
//         selected: b.options[b.selected] ?? 'No answer',
//         correct:  b.options[b.correctIdx]
//       }))
//     };
//     const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement('a');
//     a.href     = url;
//     a.download = `quiz-${quizId}-report.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Social share text & URL
//   const shareText = `I scored ${attempt.score}/${attempt.totalQuestions} on "${attempt.quiz.subTopic.name}"!`;
//   const shareUrl  = encodeURIComponent(window.location.href);

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8">
//       {/* 1️⃣ Header Summary */}
//       <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">{attempt.quiz.subTopic.name}</h1>
//           <p className="mt-2 text-lg text-gray-700">
//             Score{' '}
//             <span className="font-semibold text-indigo-600">
//               {attempt.score}/{attempt.totalQuestions}
//             </span>{' '}
//             &ndash;{' '}
//             <span className="text-indigo-600">
//               {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
//             </span>
//           </p>
//           <p className="mt-1 text-sm text-gray-500">
//             Rank <span className="font-medium">#{stats.rank}</span> of {stats.total}{' '}
//             &middot; Top {stats.pct}%
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//           <button
//             onClick={downloadReport}
//             className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//           >
//             Download Report
//           </button>
//           <div className="flex gap-2">
//             <a
//               href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Share Twitter
//             </a>
//             <a
//               href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(shareText)}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
//             >
//               Share LinkedIn
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 2️⃣ Performance Chart */}
//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Breakdown</h2>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
//             <YAxis allowDecimals={false} tick={{ fill: '#4B5563' }} />
//             <Tooltip />
//             <Bar dataKey="value" fill="#4F46E5" radius={[4,4,0,0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 3️⃣ Question-by-Question Review */}
//       <div className="space-y-6">
//         <h2 className="text-xl font-semibold text-gray-800">Detailed Answers</h2>
//         {breakdown.map((b, i) => {
//           const isCorrect = b.selected === b.correctIdx;
//           return (
//             <div
//               key={i}
//               className={`p-5 rounded-2xl shadow-sm ${
//                 isCorrect ? 'bg-green-50' : 'bg-red-50'
//               }`}
//             >
//               <p className="font-medium text-gray-800 mb-3">
//                 Q{i+1}. {b.text}
//               </p>
//               <div className="space-y-2">
//                 {b.options.map((opt, idx) => (
//                   <div key={idx} className="flex items-center">
//                     <input
//                       type="radio"
//                       checked={b.selected === idx}
//                       readOnly
//                       className="form-radio text-indigo-600"
//                     />
//                     <span
//                       className={`ml-3 ${
//                         idx === b.correctIdx
//                           ? 'font-semibold text-green-800'
//                           : b.selected === idx
//                           ? 'text-red-600'
//                           : 'text-gray-700'
//                       }`}
//                     >
//                       {opt}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               {!isCorrect && b.explanation && (
//                 <p className="mt-3 text-sm italic text-gray-600">
//                   Explanation: {b.explanation}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* 4️⃣ This Week’s Top 3 */}
//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">This Week’s Top 3</h2>
//         <ol className="space-y-2">
//           {topPerformers.map((u, idx) => (
//             <li key={u._id} className="flex justify-between">
//               <span className="font-medium text-gray-700">
//                 {idx + 1}. {u.user.name}
//               </span>
//               <span className="font-mono text-indigo-600">{u.score} pts</span>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import quizService from '../services/quizService';
import certificateService from '../services/certificateService';
import Certificate from '../components/Certificate'; // Your JSX certificate component

export default function QuizResultPage() {
  const { quizId, attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [stats, setStats] = useState({ rank: 0, total: 0, pct: 0 });
  const [chartData, setChartData] = useState([]);
  const [breakdown, setBreakdown] = useState([]);
  const [topPerformers, setTopPerf] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [showCert, setShowCert] = useState(false);
  const [recommended, setRecommended] = useState([]);

  // Fetch main data
  useEffect(() => {
    quizService.getAttemptStats(attemptId)
      .then(({ attempt, rank, totalCount, percentile }) => {
        setAttempt(attempt);
        setStats({ rank, total: totalCount, pct: percentile });
        setChartData([
          { name: 'Correct', value: attempt.correctAnswers },
          { name: 'Incorrect', value: attempt.totalQuestions - attempt.correctAnswers }
        ]);
        setBreakdown(
          attempt.answers.map(ans => ({
            text: ans.question.text,
            options: ans.question.options,
            selected: ans.selectedIndex,
            correctIdx: ans.question.correctIndex,
            explanation: ans.question.explanation
          }))
        );
        // 2️⃣ Fetch certificate for this attempt if eligible
        certificateService.getUserCertificates(attempt.user._id)
          .then((certs) => {
            // Find by quiz/title or however you link
            const cert = certs.find(c => c.title === attempt.quiz.subTopic.name);
            setCertificate(cert || null);
          });
      })
      .catch(console.error);
    quizService.getQuizTopThree(quizId).then(setTopPerf).catch(console.error);
    // 3️⃣ Recommended quizzes (from category, topic, or random)
    quizService.getRecommendedQuizzes(quizId).then(setRecommended).catch(() => {});
  }, [quizId, attemptId]);

  if (!attempt) {
    return <p className="text-center py-12 text-gray-600">Loading your result…</p>;
  }

  // Download certificate as PDF
  const handleDownloadCertificate = () => {
    // Option 1: Use your PDF utility with JSX certificate rendering
    window.print(); // Replace with real PDF logic!
  };

  // Download a JSON report
  const downloadReport = () => { /* ... same as before ... */ };

  // Social share text & URL
  const shareText = `I scored ${attempt.score}/${attempt.totalQuestions} on "${attempt.quiz.subTopic.name}"!`;
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-8">
      {/* ==== SIDEBAR: Recommendations ==== */}
      <aside className="md:w-72 w-full flex-shrink-0">
        <div className="sticky top-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Recommended Quizzes</h2>
            <ul className="space-y-3">
              {recommended.map(q => (
                <li key={q._id}>
                  <Link
                    to={`/quiz/${q._id}`}
                    className="block rounded-lg px-3 py-2 hover:bg-indigo-50 transition"
                  >
                    <span className="font-semibold text-indigo-700">{q.name}</span>
                    <span className="block text-xs text-gray-500">{q.topic?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ==== MAIN CONTENT ==== */}
      <main className="flex-1 space-y-8">
        {/* 1️⃣ Header Summary + Certificate */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:justify-between gap-6 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{attempt.quiz.subTopic.name}</h1>
            <div className="mt-2 text-lg text-gray-700">
              Score&nbsp;
              <span className="font-semibold text-indigo-600">
                {attempt.score}/{attempt.totalQuestions}
              </span>
              &nbsp;&ndash;&nbsp;
              <span className="text-indigo-600">
                {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Rank <span className="font-medium">#{stats.rank}</span> of {stats.total} &middot; Top {stats.pct}%
            </div>
          </div>
          {/* CERTIFICATE BLOCK */}
          {certificate && (
            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-green-50 text-green-700 font-semibold mb-1 text-sm shadow">
                <svg width="20" height="20" fill="none" stroke="currentColor" className="inline mr-1"><path d="M7 12l3 3 7-7" strokeWidth="2" /></svg>
                Certificate Earned
              </span>
              <button onClick={() => setShowCert(true)} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm">
                View Certificate
              </button>
              <button onClick={handleDownloadCertificate} className="px-4 py-2 rounded-md bg-gray-200 text-indigo-700 hover:bg-gray-300 font-medium text-sm">
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* CERTIFICATE MODAL */}
        {showCert && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl w-full relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowCert(false)}>&times;</button>
              <Certificate cert={certificate} />
            </div>
          </div>
        )}

        {/* 2️⃣ Performance Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#4B5563' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3️⃣ Q-by-Q Review */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Detailed Answers</h2>
          {breakdown.map((b, i) => {
            const isCorrect = b.selected === b.correctIdx;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl shadow-sm ${
                  isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <p className="font-medium text-gray-800 mb-3">
                  Q{i + 1}. {b.text}
                </p>
                <div className="space-y-2">
                  {b.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        checked={b.selected === idx}
                        readOnly
                        className="form-radio text-indigo-600"
                      />
                      <span
                        className={`ml-3 ${
                          idx === b.correctIdx
                            ? 'font-semibold text-green-800'
                            : b.selected === idx
                            ? 'text-red-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {opt}
                      </span>
                    </div>
                  ))}
                </div>
                {!isCorrect && b.explanation && (
                  <p className="mt-3 text-sm italic text-gray-600">
                    Explanation: {b.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 4️⃣ Top 3 Block */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">This Week’s Top 3</h2>
          <ol className="space-y-2">
            {topPerformers.map((u, idx) => (
              <li key={u._id} className="flex justify-between">
                <span className="font-medium text-gray-700">
                  {idx + 1}. {u.user.name}
                </span>
                <span className="font-mono text-indigo-600">{u.score} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
