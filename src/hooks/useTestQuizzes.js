// src/hooks/useTestQuizzes.js
import { useState, useEffect } from 'react';
import API from '../services/axios';

export default function useTestQuizzes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/quizzes/test-quizzes').then(res => {
  console.log("DATA FROM TEST API", res.data.quizzes);
});

  }, []);

  return data;
}
