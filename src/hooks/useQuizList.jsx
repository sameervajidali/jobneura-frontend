// // src/hooks/useQuizList.js
// import { useState, useEffect } from 'react';
// import API from '../services/axios.js';

// export default function useQuizList(rawFilters = {}) {
//   // ✔︎ Pull out page and explicitly discard any incoming limit
//   const { page: initialPage = 1, limit: _discarded, ...otherFilters } = rawFilters;

//   // ✔︎ Always 12 per page
//   const [page,  setPage]  = useState(initialPage);
//   const [limit] = useState(12);

//   const [quizzes, setQuizzes] = useState([]);
//   const [total,   setTotal]   = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setError('');

//     // Build params: fixed limit + page + only non-empty filters
//     const params = { page, limit };
//     for (const [key, value] of Object.entries(otherFilters)) {
//       if (value != null && value !== '') {
//         params[key] = value;
//       }
//     }

//     console.log('🌐 Fetching /quizzes with', params);

//     API.get('/quizzes', { params })
//       .then(res => {
//         const d = res.data;
//         setQuizzes(Array.isArray(d.quizzes) ? d.quizzes : []);
//         setTotal(typeof d.total === 'number' ? d.total : 0);
//         // If your API echoes back page (but probably not limit):
//         setPage(d.page ?? page);
//       })
//       .catch(err => {
//         console.error('❌ Quiz list fetch error:', err);
//         setError(err.response?.data?.message || err.message);
//       })
//       .finally(() => setLoading(false));
//   }, [page, JSON.stringify(otherFilters)]); // limit never changes so omit it

//   return { quizzes, total, page, limit, loading, error };
// }




// src/hooks/useQuizList.js
import { useState, useEffect } from 'react';
import API from '../services/axios.js';

export default function useQuizList(rawFilters = {}) {
  // Pull out page and explicitly discard any incoming limit
  const { page: initialPage = 1, limit: _discarded, ...otherFilters } = rawFilters;

  // Always 12 per page
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(12);

  const [quizzes, setQuizzes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');


    const getCategoryName = (categoryId) => {
  const category = categories.find((cat) => cat._id === categoryId);
  console.log(`Category Name for ${categoryId}:`, category);  // Debugging line
  return category ? category.name : categoryId;  // Safeguard if name is missing
};

const getTopicName = (topicId) => {
  const topic = topics.find((t) => t._id === topicId);
  console.log(`Topic Name for ${topicId}:`, topic);  // Debugging line
  return topic ? topic.name : topicId;  // Safeguard if name is missing
};


    // Build params: fixed limit + page + only non-empty filters
    const params = { page, limit };
    for (const [key, value] of Object.entries(otherFilters)) {
      if (value != null && value !== '') {
        params[key] = value;
      }
    }

    // Log parameters that are being sent to the API
    console.log('🌐 Fetching /quizzes with params:', params);

    API.get('/quizzes', { params })
      .then(res => {
        const d = res.data;

        // Log response to ensure the correct data is returned
        console.log('API Response:', d);

        // Set quizzes and total
        setQuizzes(Array.isArray(d.quizzes) ? d.quizzes : []);
        setTotal(typeof d.total === 'number' ? d.total : 0);

        // If the API includes the current page, set it
        setPage(d.page ?? page);
      })
      .catch(err => {
        // Log the error details to debug if there's an issue with the API request
        console.error('❌ Quiz list fetch error:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  }, [page, JSON.stringify(otherFilters)]); // limit never changes so omit it

  // Log quizzes data to help identify any issues with the quiz data
  useEffect(() => {
    console.log('🌐 Current quizzes data:', quizzes);
  }, [quizzes]);

  // Log any error messages
  useEffect(() => {
    if (error) {
      console.error('❌ Error:', error);
    }
  }, [error]);

  return { quizzes, total, page, limit, loading, error };
}
