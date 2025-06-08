// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { Helmet } from "react-helmet-async";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quiz/${quizId}`);
        setQuiz(data);
        setTimeLeft(data.duration * 60);
      } catch (err) {
        console.error("Failed to load quiz", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft <= 0) handleSubmit();
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = async () => {
    const payload = {
      quizId,
      answers,
      timeTaken: quiz.duration * 60 - timeLeft,
    };
    try {
      const { data } = await API.post("/quiz/submit", payload);
      navigate(`/quiz/${quizId}/result`, { state: data });
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!quiz) return <div className="p-6 text-center text-red-500">Quiz not found</div>;
  if (!quiz.questions || quiz.questions.length === 0) {
    return <div className="p-6 text-center text-red-600">No questions available in this quiz.</div>;
  }

  const current = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const currentAnswer = answers[current._id];

  const confirmAndSubmit = () => {
    if (window.confirm("Are you sure you want to submit the quiz?")) {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{quiz.subTopic.name} – Quiz | JobNeura</title>
        <meta name="description" content={`Take the ${quiz.subTopic.name} quiz on JobNeura and test your knowledge.`} />
      </Helmet>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">{quiz.subTopic.name}</h1>

        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <p>Question {currentIndex + 1} of {total}</p>
          <p>Time left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>
        </div>

        <h2 className="text-lg font-semibold mb-3">Q{currentIndex + 1}: {current.question}</h2>

        <div className="space-y-3">
          {current.options.map((opt, idx) => (
            <label key={idx} className={`block p-3 rounded border cursor-pointer ${currentAnswer === opt ? 'bg-indigo-100 border-indigo-500' : 'hover:bg-gray-50'}`}>
              <input
                type="radio"
                name={`q-${current._id}`}
                value={opt}
                checked={currentAnswer === opt}
                onChange={() => handleOptionChange(current._id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          {currentIndex + 1 < total ? (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={!currentAnswer}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              onClick={confirmAndSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
