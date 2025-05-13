// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList({ page = 1, limit = 12, ...otherFilters }) {
  const [quizzes, setQuizzes] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // build query params
    const params = { page, limit };
    Object.entries(otherFilters).forEach(([k, v]) => {
      if (v != null && v !== '') params[k] = v;
    });

    console.log('🌐 Fetching /quizzes with', params);
    API.get('/quizzes', { params })
      .then(res => {
        setQuizzes(res.data.quizzes || []);
        setTotal(res.data.total || 0);
      })
      .catch(err => {
        console.error('❌ Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, limit, JSON.stringify(otherFilters)]);

  return { quizzes, total, page, limit, loading, error };
}
