// // src/pages/QuizResultPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// import quizService from '../services/quizService';

// export default function QuizResultPage() {
//   const { quizId, attemptId } = useParams();
//   const [attempt, setAttempt]       = useState(null);
//   const [stats,   setStats]         = useState({});
//   const [chartData, setChartData]   = useState([]);
//   const [breakdown, setBreakdown]   = useState([]);
//   const [topPerformers, setTopPerf] = useState([]);

//   useEffect(() => {
//     // 1. Load attempt + stats (rank, percentile, totalCount)
//     quizService.getAttemptStats(attemptId).then(res => {
//       setAttempt(res.attempt);
//       setStats({
//         rank: res.rank,
//         total: res.totalCount,
//         pct: res.percentile
//       });

//       // prepare bar chart data
//       setChartData([
//         { name: 'Correct',   value: res.attempt.correctAnswers },
//         { name: 'Incorrect', value: res.attempt.totalQuestions - res.attempt.correctAnswers }
//       ]);

//       // question breakdown
//       setBreakdown(res.attempt.answers.map((a, i) => ({
//         question:    res.attempt.questions[i].text,
//         options:     res.attempt.questions[i].options,
//         selected:    a.selectedIndex,
//         correctIdx:  res.attempt.questions[i].correctIndex,
//         explanation: res.attempt.questions[i].explanation
//       })));
//     });

//     // 2. Load top-3 performers (weekly)
//     quizService.getQuizTopThree(quizId).then(setTopPerf);
//   }, [quizId, attemptId]);

//   if (!attempt) return <p className="text-center py-10">Loading result…</p>;

//   const downloadReport = () => {
//     const payload = {
//       quiz: attempt.quiz._id,
//       score: attempt.score,
//       total: attempt.totalQuestions,
//       rank: stats.rank,
//       percentile: stats.pct,
//       details: breakdown.map((b, i) => ({
//         q: b.question,
//         selected: b.options[b.selected] ?? 'No answer',
//         correct: b.options[b.correctIdx]
//       }))
//     };
//     const blob = new Blob([JSON.stringify(payload, null,2)], { type:'application/json' });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement('a');
//     a.href     = url;
//     a.download = `quiz-${quizId}-report.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const shareText = `I just scored ${attempt.score}/${attempt.totalQuestions} on "${attempt.quiz.title}"!`;
//   const shareUrl  = encodeURIComponent(window.location.href);

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8">
//       {/* 1) Header summary */}
//       <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">{attempt.quiz.title}</h1>
//           <p className="mt-2 text-gray-600">
//             Score <span className="font-semibold">{attempt.score}/{attempt.totalQuestions}</span>
//             &nbsp;–&nbsp; {((attempt.score/attempt.totalQuestions)*100).toFixed(1)}%
//           </p>
//           <p className="mt-1 text-sm text-gray-500">
//             Rank #{stats.rank} of {stats.total} &middot; Top {stats.pct}%
//           </p>
//         </div>
//         <div className="space-y-2">
//           <button
//             onClick={downloadReport}
//             className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Download Report
//           </button>
//           <div className="flex space-x-2">
//             <a
//               href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Share Twitter
//             </a>
//             <a
//               href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(shareText)}`}
//               target="_blank" rel="noopener noreferrer"
//               className="px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//             >
//               Share LinkedIn
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 2) Performance chart */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Performance Breakdown</h2>
//         <BarChart width={300} height={200} data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis allowDecimals={false}/>
//           <Tooltip />
//           <Bar dataKey="value" fill="#4F46E5" />
//         </BarChart>
//       </div>

//       {/* 3) Question-by-question */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Detailed Answers</h2>
//         {breakdown.map((b, i) => {
//           const correct = b.selected === b.correctIdx;
//           return (
//             <div
//               key={i}
//               className={`p-4 rounded-lg ${correct ? 'bg-green-50' : 'bg-red-50'} shadow-sm`}
//             >
//               <p className="font-medium">Q{i+1}. {b.question}</p>
//               {b.options.map((opt, idx) => (
//                 <div key={idx} className="flex items-center gap-2 mt-1">
//                   <input type="radio" checked={b.selected===idx} readOnly/>
//                   <span className={
//                     idx===b.correctIdx ? 'font-semibold text-green-700' :
//                     b.selected===idx      ? 'text-red-600' :
//                                             ''
//                   }>
//                     {opt}
//                   </span>
//                 </div>
//               ))}
//               {!correct && b.explanation && (
//                 <p className="mt-2 text-sm italic text-gray-700">
//                   Explanation: {b.explanation}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* 4) Top performers */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">This Week’s Top 3</h2>
//         <ol className="space-y-2">
//           {topPerformers.map((e,i) => (
//             <li key={e._id} className="flex justify-between">
//               <span>{i+1}. {e.user.name}</span>
//               <span className="font-mono">{e.score} pts</span>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }


// src/pages/QuizResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import quizService from '../services/quizService';

export default function QuizResultPage() {
  const { quizId, attemptId } = useParams();
  const [attempt, setAttempt]       = useState(null);
  const [stats,   setStats]         = useState({ rank: 0, total: 0, pct: 0 });
  const [chartData, setChartData]   = useState([]);
  const [breakdown, setBreakdown]   = useState([]);
  const [topPerformers, setTopPerf] = useState([]);

  useEffect(() => {
    // 1️⃣ Load attempt & stats
    quizService.getAttemptStats(attemptId)
      .then(res => {
        const { attempt, rank, totalCount, percentile } = res;
        setAttempt(attempt);
        setStats({ rank, total: totalCount, pct: percentile });

        // Bar chart data
        setChartData([
          { name: 'Correct',   value: attempt.correctAnswers },
          { name: 'Incorrect', value: attempt.totalQuestions - attempt.correctAnswers }
        ]);

        // Detailed breakdown
        setBreakdown(attempt.answers.map((ans, i) => {
          const q = attempt.questions[i];
          return {
            text:        q.text,
            options:     q.options,
            selected:    ans.selectedIndex,
            correctIdx:  q.correctIndex,
            explanation: q.explanation
          };
        }));
      })
      .catch(console.error);

    // 2️⃣ Load top-3 performers for this quiz this week
    quizService.getQuizTopThree(quizId)
      .then(setTopPerf)
      .catch(console.error);
  }, [quizId, attemptId]);

  if (!attempt) {
    return <p className="text-center py-12 text-gray-600">Loading your result…</p>;
  }

  // Download a JSON report
  const downloadReport = () => {
    const payload = {
      quiz:        attempt.quiz._id,
      title:       attempt.quiz.title,
      score:       attempt.score,
      total:       attempt.totalQuestions,
      rank:        stats.rank,
      percentile:  stats.pct,
      breakdown:   breakdown.map((b, i) => ({
        question: b.text,
        selected: b.options[b.selected] ?? 'No answer',
        correct:  b.options[b.correctIdx]
      }))
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `quiz-${quizId}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Social share text & URL
  const shareText = `I scored ${attempt.score}/${attempt.totalQuestions} on "${attempt.quiz.title}"!`;
  const shareUrl  = encodeURIComponent(window.location.href);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* 1️⃣ Header Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{attempt.quiz.title}</h1>
          <p className="mt-2 text-lg text-gray-700">
            Score{' '}
            <span className="font-semibold text-indigo-600">
              {attempt.score}/{attempt.totalQuestions}
            </span>{' '}
            &ndash;{' '}
            <span className="text-indigo-600">
              {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Rank <span className="font-medium">#{stats.rank}</span> of {stats.total}{' '}
            &middot; Top {stats.pct}%
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={downloadReport}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Download Report
          </button>
          <div className="flex gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Share Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(shareText)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Share LinkedIn
            </a>
          </div>
        </div>
      </div>

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

      {/* 3️⃣ Question-by-Question Review */}
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
                Q{i+1}. {b.text}
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

      {/* 4️⃣ This Week’s Top 3 */}
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
    </div>
  );
}
