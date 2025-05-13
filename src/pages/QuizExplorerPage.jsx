// src/pages/QuizExplorerPage.jsx
import React, { useState } from 'react'
import {
  Bars3Icon as MenuIcon,
  XMarkIcon  as XIcon,
} from '@heroicons/react/24/outline'
import QuizSidebar     from '../components/quizzes/QuizSidebar'
import QuizHighlights  from '../components/quizzes/QuizHighlights'
import QuizList        from '../components/quizzes/QuizList'
import QuizLeaderboard from '../components/quizzes/QuizLeaderboard'

export default function QuizExplorerPage() {
  const [filters, setFilters] = useState({
    category: '',
    topic:    '',
    level:    '',
    page:     1,
    limit:    12,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePageChange = newPage => {
    setFilters(f => ({ ...f, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile header with “hamburger” */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-semibold text-gray-800">Quizzes</h1>
        <button
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Toggle filters"
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {sidebarOpen
            ? <XIcon className="w-6 h-6 text-gray-700"/>
            : <MenuIcon className="w-6 h-6 text-gray-700"/>
          }
        </button>
      </div>

      {/* Container */}
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-x-6 py-6">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64
            transform bg-white border border-gray-200 rounded-lg p-4
            lg:relative lg:transform-none lg:h-auto lg:sticky lg:top-24
            transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <QuizSidebar
            filters={filters}
            onChange={newFilters => {
              setFilters({ ...newFilters, page: 1 })
              setSidebarOpen(false)
            }}
          />
        </aside>

        {/* Main content */}
        <main className="
          flex-1
          bg-white border border-gray-200 rounded-lg p-6
          overflow-y-auto sticky top-24 h-[calc(100vh-6rem)]
          font-sans text-base
        ">
          {/* <QuizHighlights /> */}

          <header className="mt-8 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">All Quizzes</h2>
            <p className="text-gray-600">Browse by category, topic or level.</p>
          </header>

          <QuizList
            filters={filters}
            onPageChange={handlePageChange}
          />
        </main>

        {/* Leaderboard */}
        <aside className="
          w-full lg:w-60
          bg-white border 
          sticky md:top-24 h-[calc(100vh-6rem)]
          font-sans text-base
        ">
          <QuizLeaderboard
            filters={{ ...filters, timePeriod: 'week', page: 1, limit: 5 }}
          />
        </aside>
      </div>
    </>
  )
}
