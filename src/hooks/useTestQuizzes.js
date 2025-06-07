// src/hooks/useTestQuizzes.js
import { useState, useEffect } from 'react';
import API from '../services/axios';

export default function useTestQuizzes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/quizzes')
      .then(res => setData(res.data))
      .catch(err => setData({ error: err.message }));
  }, []);

  return data;
}
