
// import { useState, useEffect } from 'react';
// import API from '../services/axios.js';

// export default function useQuizList(filters = {}) {
//   const [quizzes, setQuizzes] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(filters.page || 1);
//   const [limit, setLimit] = useState(filters.limit || 12);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setError('');

//     const cleanedFilters = {};
//     for (const key in filters) {
//       if (filters[key]) cleanedFilters[key] = filters[key];
//     }

//     API.get('/quizzes', { params: cleanedFilters })
//       .then(res => {
//         setQuizzes(Array.isArray(res.data.quizzes) ? res.data.quizzes : []);
//         setTotal(res.data.total ?? 0);
//         setPage(res.data.page ?? 1);
//         setLimit(res.data.limit ?? 12);
//       })
//       .catch(err => {
//         console.error('Quiz list fetch error:', err);
//         setError(err.response?.data?.message || err.message);
//       })
//       .finally(() => setLoading(false));
//   }, [JSON.stringify(filters)]);

//   return { quizzes, total, page, limit, loading, error };
// }


// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(filters = {}) {
  // initialize page & limit (defaults: 1 & 12)
  const [page,  setPage]  = useState(filters.page  || 1);
  const [limit, setLimit] = useState(filters.limit || 12);

  const [quizzes, setQuizzes] = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // strip out only the other filter keys (category, topic, level, etc)
    const cleaned = {};
    for (const key in filters) {
      if (filters[key] != null && filters[key] !== '') {
        cleaned[key] = filters[key];
      }
    }

    // build full params including page & limit
    const params = { page, limit, ...cleaned };
    console.log('Fetching quizzes with params →', params);
    API.get('/quizzes', { params })
      .then(res => {
        const data = res.data;
        // server should echo back quizzes, total, page, limit
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
        setTotal(typeof data.total === 'number' ? data.total : 0);
        setPage(data.page  ?? page);
        setLimit(data.limit ?? limit);
      })
      .catch(err => {
        console.error('Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, limit, JSON.stringify(filters)]);

  return { quizzes, total, page, limit, loading, error };
}
