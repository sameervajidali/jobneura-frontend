// src/hooks/useQuizList.js
import { useState, useEffect } from "react";
import API from "../services/axios.js";

export default function useQuizList({ page = 1, limit = 12, ...otherFilters }) {
  const [quizzes, setQuizzes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    // build query params
    const params = { page, limit };
    Object.entries(otherFilters).forEach(([k, v]) => {
      if (v != null && v !== "") params[k] = v;
    });

    API.get("/quizzes", { params })
      .then((res) => {
        console.log("API RAW RESPONSE", res.data);

        // CHECK *THE DATA YOU RECEIVED* DIRECTLY
        res.data.quizzes.forEach((q) => {
          if (typeof q.subTopic === "string") {
          } else {
          }
        });

        setQuizzes(res.data.quizzes || []);
        setTotal(res.data.total || 0);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch quizzes");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit, JSON.stringify(otherFilters)]);

  return { quizzes, total, page, limit, loading, error };
}
