// // QuizResultPage.jsx (simplified)
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import quizService from '../services/quizService';

// export default function QuizResultPage() {
//   const { quizId, attemptId } = useParams();
//   const [attempt, setAttempt]     = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     // 1️⃣ Load attempt details
//     quizService.getAttemptById(attemptId)
//       .then(setAttempt)
//       .catch(console.error);

//     // 2️⃣ Load fresh leaderboard
//     quizService.getQuizById(quizId)
//       .then(quiz => {
//         return quizService.getLeaderboard({
//           category: quiz.category,
//           topic:    quiz.topic,
//           level:    quiz.level,
//           timePeriod: 'all-time'
//         });
//       })
//       .then(setLeaderboard)
//       .catch(console.error);
//   }, [quizId, attemptId]);

//   if (!attempt) return <p>Loading result…</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <h2 className="text-2xl font-bold">Your Score: {attempt.score}/{attempt.totalQuestions}</h2>

//       {/* … your existing attempt breakdown … */}

//       <section>
//         <h3 className="text-xl font-semibold">Leaderboard</h3>
//         <ul className="mt-2 space-y-1">
//           {leaderboard.map((entry, i) => (
//             <li key={entry._id} className="flex justify-between">
//               <span>{i+1}. {entry.user.name}</span>
//               <span>{entry.score} pts</span>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }


// src/pages/QuizResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import quizService from '../services/quizService';

export default function QuizResultPage() {
  const { quizId, attemptId } = useParams();
  const [attempt, setAttempt]       = useState(null);
  const [stats,   setStats]         = useState({});
  const [chartData, setChartData]   = useState([]);
  const [breakdown, setBreakdown]   = useState([]);
  const [topPerformers, setTopPerf] = useState([]);

  useEffect(() => {
    // 1. Load attempt + stats (rank, percentile, totalCount)
    quizService.getAttemptStats(attemptId).then(res => {
      setAttempt(res.attempt);
      setStats({
        rank: res.rank,
        total: res.totalCount,
        pct: res.percentile
      });

      // prepare bar chart data
      setChartData([
        { name: 'Correct',   value: res.attempt.correctAnswers },
        { name: 'Incorrect', value: res.attempt.totalQuestions - res.attempt.correctAnswers }
      ]);

      // question breakdown
      setBreakdown(res.attempt.answers.map((a, i) => ({
        question:    res.attempt.questions[i].text,
        options:     res.attempt.questions[i].options,
        selected:    a.selectedIndex,
        correctIdx:  res.attempt.questions[i].correctIndex,
        explanation: res.attempt.questions[i].explanation
      })));
    });

    // 2. Load top-3 performers (weekly)
    quizService.getQuizTopThree(quizId).then(setTopPerf);
  }, [quizId, attemptId]);

  if (!attempt) return <p className="text-center py-10">Loading result…</p>;

  const downloadReport = () => {
    const payload = {
      quiz: attempt.quiz._id,
      score: attempt.score,
      total: attempt.totalQuestions,
      rank: stats.rank,
      percentile: stats.pct,
      details: breakdown.map((b, i) => ({
        q: b.question,
        selected: b.options[b.selected] ?? 'No answer',
        correct: b.options[b.correctIdx]
      }))
    };
    const blob = new Blob([JSON.stringify(payload, null,2)], { type:'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `quiz-${quizId}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareText = `I just scored ${attempt.score}/${attempt.totalQuestions} on "${attempt.quiz.title}"!`;
  const shareUrl  = encodeURIComponent(window.location.href);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* 1) Header summary */}
      <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{attempt.quiz.title}</h1>
          <p className="mt-2 text-gray-600">
            Score <span className="font-semibold">{attempt.score}/{attempt.totalQuestions}</span> 
            &nbsp;–&nbsp; {((attempt.score/attempt.totalQuestions)*100).toFixed(1)}%
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Rank #{stats.rank} of {stats.total} &middot; Top {stats.pct}%
          </p>
        </div>
        <div className="space-y-2">
          <button 
            onClick={downloadReport}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Download Report
          </button>
          <div className="flex space-x-2">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Share Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(shareText)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Share LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* 2) Performance chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Performance Breakdown</h2>
        <BarChart width={300} height={200} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Bar dataKey="value" fill="#4F46E5" />
        </BarChart>
      </div>

      {/* 3) Question-by-question */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detailed Answers</h2>
        {breakdown.map((b, i) => {
          const correct = b.selected === b.correctIdx;
          return (
            <div 
              key={i}
              className={`p-4 rounded-lg ${correct ? 'bg-green-50' : 'bg-red-50'} shadow-sm`}
            >
              <p className="font-medium">Q{i+1}. {b.question}</p>
              {b.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 mt-1">
                  <input type="radio" checked={b.selected===idx} readOnly/>
                  <span className={
                    idx===b.correctIdx ? 'font-semibold text-green-700' :
                    b.selected===idx      ? 'text-red-600' :
                                            ''
                  }>
                    {opt}
                  </span>
                </div>
              ))}
              {!correct && b.explanation && (
                <p className="mt-2 text-sm italic text-gray-700">
                  Explanation: {b.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 4) Top performers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">This Week’s Top 3</h2>
        <ol className="space-y-2">
          {topPerformers.map((e,i) => (
            <li key={e._id} className="flex justify-between">
              <span>{i+1}. {e.user.name}</span>
              <span className="font-mono">{e.score} pts</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
