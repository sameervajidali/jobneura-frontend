// import { useState, useEffect } from 'react';
// import API from '../services/axios.js';

// export default function useQuizList(filters = {}) {
//   const [quizzes, setQuizzes] = useState([]);
//   const [total, setTotal]     = useState(0);
//   const [page, setPage]       = useState(filters.page);
//   const [limit, setLimit]     = useState(filters.limit);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState('');

//   useEffect(() => {
//     setLoading(true);
//     API.get('/quizzes', { params: filters })
//       .then(res => {
//         setQuizzes(res.data.quizzes);
//         setTotal(res.data.total);
//         setPage(res.data.page);
//         setLimit(res.data.limit);
//       })
//       .catch(err => setError(err.response?.data?.message || err.message))
//       .finally(() => setLoading(false));
//   }, [JSON.stringify(filters)]);

//   return { quizzes, total, page, limit, loading, error };
// }


import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(filters = {}) {
  const [quizzes, setQuizzes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(filters.page || 1);
  const [limit, setLimit] = useState(filters.limit || 12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    const cleanedFilters = {};
    for (const key in filters) {
      if (filters[key]) cleanedFilters[key] = filters[key];
    }

    API.get('/quizzes', { params: cleanedFilters })
      .then(res => {
        setQuizzes(Array.isArray(res.data.quizzes) ? res.data.quizzes : []);
        setTotal(res.data.total ?? 0);
        setPage(res.data.page ?? 1);
        setLimit(res.data.limit ?? 12);
      })
      .catch(err => {
        console.error('Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { quizzes, total, page, limit, loading, error };
}
