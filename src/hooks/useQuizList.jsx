// src/hooks/useQuizList.jsx
import { useState, useEffect } from "react";
import { getQuizzes } from "../services/quizService.js";

export default function useQuizList(filters) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getQuizzes(filters)
      .then(list => setQuizzes(list))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { quizzes, loading, error };
}
