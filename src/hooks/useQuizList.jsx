// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(rawFilters = {}) {
  // Pull out only page from incoming filters (if you ever want to control page externally)
  const { page: initialPage = 1, ...otherFilters } = rawFilters;

  // Always default to 12, never take a limit from filters
  const [page,  setPage]  = useState(initialPage);
  const [limit, setLimit] = useState(12);

  const [quizzes, setQuizzes] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // build params: page + fixed limit + any non-empty filters (category, topic, level…)
    const params = { page, limit };
    for (const [key, value] of Object.entries(otherFilters)) {
      if (value != null && value !== '') {
        params[key] = value;
      }
    }

    console.log('🌐 Fetching /quizzes with', params);

    API.get('/quizzes', { params })
      .then(res => {
        const d = res.data;
        setQuizzes(Array.isArray(d.quizzes) ? d.quizzes : []);
        setTotal(typeof d.total === 'number' ? d.total : 0);
        // Sync page/limit if your API echoes them back
        setPage(d.page  ?? page);
        setLimit(d.limit ?? limit);
      })
      .catch(err => {
        console.error('❌ Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, limit, JSON.stringify(otherFilters)]);

  return { quizzes, total, page, limit, loading, error };
}
