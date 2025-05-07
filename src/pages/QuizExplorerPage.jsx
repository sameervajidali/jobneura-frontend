// src/pages/QuizExplorerPage.jsx
import React, { useState } from "react";
import QuizSidebar       from "../components/quizzes/QuizSidebar.jsx";
import QuizHero          from "../components/quizzes/QuizHero.jsx";
import QuizList          from "../components/quizzes/QuizList.jsx";
import QuizLeaderboard   from "../components/quizzes/QuizLeaderboard.jsx";

export default function QuizExplorerPage() {
  // shared filters state
  const [filters, setFilters] = useState({
    category: "",
    topic:    "",
    level:    ""
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <QuizSidebar filters={filters} onChange={setFilters} />
      <main className="flex-1 p-6">
        <QuizHero filters={filters} />
        <div className="flex gap-6 mt-6">
          <div className="w-3/5">
            <QuizList filters={filters} />
          </div>
          <div className="w-2/5">
            <QuizLeaderboard filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
}
