// src/components/quizzes/QuizHighlights.jsx
import React, { useState, useEffect } from 'react';
import quizService from '../../services/quizService';
import { SparklesIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function QuizHighlights() {
  const [daily, setDaily] = useState(null);
  const [trending, setTrending] = useState([]);
  const [justAdded, setJustAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([
      quizService.fetchDailySpotlight(),
      quizService.fetchTrending(5),
      quizService.fetchJustAdded(3)
    ])
      .then(([dailyData, trendingData, justAddedData]) => {
        setDaily(dailyData);
        setTrending(trendingData);
        setJustAdded(justAddedData);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load highlights.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <p>Loading highlights…</p>
      </div>
    );
  }
  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  return (
    <div className="space-y-12 px-6 py-8">
      {/* Daily Spotlight */}
      {daily && (
        <section>
          <h2 className="text-xl font-semibold mb-2">✨ Daily Spotlight</h2>
          <div className="border rounded-lg p-4 flex items-center space-x-4 bg-indigo-50">
            <SparklesIcon className="w-8 h-8 text-indigo-600" />
            <div>
              <h3 className="font-medium">{daily.title}</h3>
              <div className="text-sm text-gray-600 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>{daily.duration} min</span>
                <span>•</span>
                <span>{daily.level}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Now */}
      {trending.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">📈 Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map(q => (
              <div key={q._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <h4 className="font-medium">{q.title}</h4>
                <div className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{q.duration} min</span>
                  <span>•</span>
                  <span>{q.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Just Added */}
      {justAdded.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">🆕 Just Added</h2>
          <div className="space-y-3">
            {justAdded.map(q => (
              <div key={q._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{q.title}</h4>
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{q.duration} min</span>
                    <span>•</span>
                    <span>{q.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
