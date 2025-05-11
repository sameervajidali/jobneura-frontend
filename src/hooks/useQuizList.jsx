// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(filters = {}) {
  // Pull out any incoming page/limit (with our 1 & 12 fallbacks)
  const [page,  setPage]  = useState(filters.page  || 1);
  const [limit, setLimit] = useState(filters.limit || 12);

  const [quizzes, setQuizzes] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // Strip out empty filter values (category, topic, level, etc)
    const cleaned = {};
    for (const key in filters) {
      if (filters[key] != null && filters[key] !== '') {
        cleaned[key] = filters[key];
      }
    }

    // 👇 Include page & limit here
    const params = { page, limit, ...cleaned };

    console.log('Fetching /quizzes with', params);

    API.get('/quizzes', { params })
      .then(res => {
        const d = res.data;
        setQuizzes(Array.isArray(d.quizzes) ? d.quizzes : []);
        setTotal(typeof d.total === 'number' ? d.total : 0);

        // If your API echoes them back, sync state:
        setPage(d.page  ?? page);
        setLimit(d.limit ?? limit);
      })
      .catch(err => {
        console.error('Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, limit, JSON.stringify(filters)]);

  return { quizzes, total, page, limit, loading, error };
}
