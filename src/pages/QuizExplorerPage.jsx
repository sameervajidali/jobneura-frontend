// // src/pages/QuizExplorerPage.jsx
// import React, { useState } from 'react';
// import QuizSidebar from '../components/quizzes/QuizSidebar.jsx';
// import QuizList    from '../components/quizzes/QuizList.jsx';
// import QuizLeaderboard from '../components/quizzes/QuizLeaderboard.jsx';

// export default function QuizExplorerPage() {
//   // filter state: category, topic, level, page, limit
//   const [filters, setFilters] = useState({
//     category: '',
//     topic:    '',
//     level:    '',
//     page:     1,
//     limit:    10
//   });

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       {/* 1) Left sidebar */}
//       <QuizSidebar filters={filters} onChange={setFilters} />

//       {/* 2) Center: list of quiz cards */}
//       <main className="flex-1 p-6 space-y-6">
//         <header className="bg-white p-4 rounded shadow">
//           <h1 className="text-2xl font-bold">All Quizzes</h1>
//           <p className="text-gray-600">Browse by category, topic or level.</p>
//         </header>
//         <QuizList filters={filters} onPageChange={newPage => setFilters(f => ({ ...f, page: newPage }))} />
//       </main>

//       {/* 3) Right: weekly leaderboard */}
//       <aside className="w-80 p-6">
//         <QuizLeaderboard filters={{ ...filters, timePeriod: 'week' }} />
//       </aside>
//     </div>
//   );
// }


// src/pages/QuizExplorerPage.jsx
import React, { useState } from 'react'
import QuizSidebar from '../components/quizzes/QuizSidebar.jsx'
import QuizList    from '../components/quizzes/QuizList.jsx'
import QuizLeaderboard from '../components/quizzes/QuizLeaderboard.jsx'
import QuizTitleLeaderboard from '../components/quizzes/QuizTitleLeaderboard.jsx'

export default function QuizExplorerPage() {
  // filter state: category, topic, level, page, limit
  const [filters, setFilters] = useState({
    category: '',
    topic:    '',
    level:    '',
    page:     1,
    limit:    9,
  })

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* 1) Sidebar */}
      <QuizSidebar
        filters={filters}
        onChange={newFilters => setFilters({ ...newFilters, page: 1 })}
      />

      {/* 2) Main: Quizzes and top scorers */}
      <main className="flex-1 p-6 space-y-6">
        <header className="bg-white p-4 rounded shadow">
          <h1 className="text-2xl font-bold">All Quizzes</h1>
          <p className="text-gray-600">Browse by category, topic or level.</p>
        </header>

        {/* Top Scorers (Weekly / Monthly) */}
        <QuizLeaderboard filters={filters} />

        {/* Leaderboard by Quiz Title */}
        <QuizTitleLeaderboard timePeriod="week" />

        {/* Quiz cards */}
        <QuizList
          filters={filters}
          onPageChange={newPage => setFilters(f => ({ ...f, page: newPage }))}
        />
      </main>
    </div>
  )
}
