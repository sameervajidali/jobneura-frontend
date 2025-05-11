// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(rawFilters = {}) {
  // ✔︎ Pull out page and explicitly discard any incoming limit
  const { page: initialPage = 1, limit: _discarded, ...otherFilters } = rawFilters;

  // ✔︎ Always 12 per page
  const [page,  setPage]  = useState(initialPage);
  const [limit] = useState(12);

  const [quizzes, setQuizzes] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // Build params: fixed limit + page + only non-empty filters
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
        // If your API echoes back page (but probably not limit):
        setPage(d.page ?? page);
      })
      .catch(err => {
        console.error('❌ Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, JSON.stringify(otherFilters)]); // limit never changes so omit it

  return { quizzes, total, page, limit, loading, error };
}
