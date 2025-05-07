import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(filters) {
  const [quizzes, setQuizzes] = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(filters.page);
  const [limit, setLimit]     = useState(filters.limit);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    setLoading(true);
    API.get('/quizzes', { params: filters })
      .then(res => {
        setQuizzes(res.data.quizzes);
        setTotal(res.data.total);
        setPage(res.data.page);
        setLimit(res.data.limit);
      })
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { quizzes, total, page, limit, loading, error };
}
