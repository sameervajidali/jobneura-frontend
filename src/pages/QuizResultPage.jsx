import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import html2canvas from "html2canvas";

import quizService from "../services/quizService";
import certificateService from "../services/certificateService";
import Certificate from "../components/Certificate";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function QuizResultPage() {
  const { quizId, attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [stats, setStats] = useState({ rank: 0, total: 0, pct: 0 });
  const [chartData, setChartData] = useState([]);
  const [breakdown, setBreakdown] = useState([]);
  const [topPerformers, setTopPerf] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recLoading, setRecLoading] = useState(true);

  const { width, height } = useWindowSize();

  useEffect(() => {
    setLoading(true);
    quizService
      .getAttemptStats(attemptId)
      .then(({ attempt, rank, totalCount, percentile }) => {
        setAttempt(attempt);
        setStats({ rank, total: totalCount, pct: percentile });
        setChartData([
          { name: "Correct", value: attempt.correctAnswers },
          {
            name: "Incorrect",
            value: attempt.totalQuestions - attempt.correctAnswers,
          },
        ]);
        setBreakdown(
          (attempt.answers ?? []).map((ans) => ({
            text: ans.question?.text ?? "No Question Text",
            options: ans.question?.options ?? [],
            selected: ans.selectedIndex,
            correctIdx: ans.question?.correctIndex,
            explanation: ans.question?.explanation,
          }))
        );
        // Fetch certificate for this attempt
        certificateService
          .getUserCertificates(attempt?.user?._id)
          .then((certs = []) => {
            // Match by title or subtopic name
            const quizSubTopic = (attempt?.quiz?.subTopic?.name || "")
              .toLowerCase()
              .trim();
            const quizTitle = (attempt?.quiz?.title || "").toLowerCase().trim();
            const cert = certs.find(
              (c) =>
                (c.title || "").toLowerCase().trim() === quizSubTopic ||
                (c.title || "").toLowerCase().trim() === quizTitle
            );
            setCertificate(cert || null);
          });
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load quiz results.");
        setLoading(false);
      });

    quizService
      .getQuizTopThree(quizId)
      .then(setTopPerf)
      .catch(() => {});
    setRecLoading(true);
    quizService
      .getRecommendedQuizzes?.(quizId)
      .then((rec) => {
        setRecommended(rec || []);
        setRecLoading(false);
      })
      .catch(() => setRecLoading(false));
  }, [quizId, attemptId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-xl text-gray-600">
        Loading your result…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-600 text-xl">
        {error}
      </div>
    );
  }
  if (!attempt) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-xl">
        Attempt data not found.
      </div>
    );
  }

  // Certificate share/copy/download
  const certUrl = certificate
    ? `${window.location.origin}/certificates/${certificate.certificateId}`
    : window.location.href;

  const handleCopyLink = () => {
    if (certificate) {
      navigator.clipboard.writeText(certUrl);
      alert("Certificate link copied!");
    }
  };

  // Download certificate preview as image (PNG)
  const handleDownloadImage = () => {
    const el = document.getElementById("certificate-preview");
    if (!el) return;
    html2canvas(el, { backgroundColor: "#fff", scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Certificate-${certificate.certificateId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const percentage =
  attempt && attempt.score && attempt.totalQuestions
    ? Math.round((attempt.score / attempt.totalQuestions) * 100)
    : 0;

  // Print (simple for preview, PDF should be from view page)
  const handleDownloadCertificate = () => window.print();

  // Social share text & URL
  const shareText = `🎉 I just earned a "${
    certificate?.title
  }" certificate for "${
    attempt.quiz?.subTopic?.name ?? attempt.quiz?.title ?? "Quiz"
  }" on JobNeura!
View my certificate: ${certUrl}
Try this quiz: ${window.location.origin}/quiz/${quizId}`;

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-8 px-2">
      {/* Test Banner */}

      {/* ==== SIDEBAR: Recommendations ==== */}
      <aside className="md:w-72 w-full flex-shrink-0">
        <div className="sticky top-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Recommended Quizzes
            </h2>
            <ul className="space-y-3">
              {recLoading && <li className="text-gray-400">Loading...</li>}
              {!recLoading && recommended.length === 0 && (
                <li className="text-gray-500 text-sm">
                  No recommendations yet.
                </li>
              )}
              {recommended
                ?.filter((q) => q && (q.name || q.title))
                .map((q) => (
                  <li key={q._id || q.id || Math.random()}>
                    <Link
                      to={`/quiz/${q._id || q.id}`}
                      className="block rounded-lg px-3 py-2 hover:bg-indigo-50 transition"
                    >
                      <span className="font-semibold text-indigo-700">
                        {q.name || q.title || "Untitled Quiz"}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.topic?.name || q.subTopic?.name || "General"}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* ==== MAIN CONTENT ==== */}
      <main className="flex-1 space-y-8">
        {/* 🎉 Certificate Banner (preview + actions) */}
        {certificate && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl shadow-lg p-7 mb-3 flex flex-col md:flex-row gap-8 items-center relative">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 mb-1 flex items-center gap-2">
                <span role="img" aria-label="celebrate">
                  🎉
                </span>{" "}
                Certificate Earned!
              </h2>
              <p className="text-gray-700 mb-3">
                Congratulations! You've earned a <b>{certificate.quiz}</b>{" "}
                certificate for <b>{certificate.quiz}</b>.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  to={`/certificates/${certificate.certificateId}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
                >
                  View Full Page
                </Link>
                <button
                  onClick={handleCopyLink}
                  className="bg-gray-100 border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Copy Link
                </button>
              </div>
              {/* Social Share Buttons */}
              <div className="flex gap-2 mt-4">
                <FacebookShareButton url={certUrl} quote={shareText}>
                  <FacebookIcon round />
                </FacebookShareButton>
                <TwitterShareButton url={certUrl} title={shareText}>
                  <TwitterIcon round />
                </TwitterShareButton>
                <LinkedinShareButton url={certUrl} summary={shareText}>
                  <LinkedinIcon round />
                </LinkedinShareButton>
                <WhatsappShareButton url={certUrl} title={shareText}>
                  <WhatsappIcon round />
                </WhatsappShareButton>
              </div>
            </div>
            <div>
              <Link to={`/certificates/${certificate.certificateId}`}>
                <div
                  id="certificate-preview"
                  className="rounded-xl shadow overflow-hidden bg-white"
                >
                  
                  <Certificate
                    recipient={attempt?.user?.name || "User Name"}
                    quiz={attempt.quiz?.subTopic?.name || attempt.quiz?.title}
                    score={percentage}
                    rawScore={attempt.score}
                    totalQuestions={attempt.totalQuestions}
                    date={new Date(attempt.createdAt).toLocaleDateString()}
                    certId={certificate.certificateId}
                    issued={certificate.location || "Lucknow, India"}
                    qrUrl={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}/certificates/${certificate.certificateId}&size=80x80`}
                  />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* 1️⃣ Quiz Title + Score Block */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:justify-between gap-6 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {attempt.quiz?.subTopic?.name ?? attempt.quiz?.title ?? "Quiz"}
            </h1>
            <div className="mt-2 text-lg text-gray-700">
              Score&nbsp;
              <span className="font-semibold text-indigo-600">
                {attempt.score}/{attempt.totalQuestions}
              </span>
              &nbsp;&ndash;&nbsp;
              <span className="text-indigo-600">
                {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Rank <span className="font-medium">#{stats.rank}</span> of{" "}
              {stats.total} &middot; Top {stats.pct}%
            </div>
          </div>
        </div>

        {/* 2️⃣ Performance Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Performance Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
              <YAxis allowDecimals={false} tick={{ fill: "#4B5563" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3️⃣ Q-by-Q Review */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Detailed Answers
          </h2>
          {breakdown.map((b, i) => {
            const isCorrect = b.selected === b.correctIdx;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl shadow-sm ${
                  isCorrect ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <p className="font-medium text-gray-800 mb-3">
                  Q{i + 1}. {b.text}
                </p>
                <div className="space-y-2">
                  {(b.options || []).map((opt, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        checked={b.selected === idx}
                        readOnly
                        className="form-radio text-indigo-600"
                      />
                      <span
                        className={`ml-3 ${
                          idx === b.correctIdx
                            ? "font-semibold text-green-800"
                            : b.selected === idx
                            ? "text-red-600"
                            : "text-gray-700"
                        }`}
                      >
                        {opt}
                      </span>
                    </div>
                  ))}
                </div>
                {!isCorrect && b.explanation && (
                  <p className="mt-3 text-sm italic text-gray-600">
                    Explanation: {b.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 4️⃣ Top 3 Block */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            This Week’s Top 3
          </h2>
          <ol className="space-y-2">
            {topPerformers?.length === 0 && (
              <li className="text-gray-400">No data yet.</li>
            )}
            {topPerformers?.filter(Boolean).map((u, idx) => (
              <li key={u._id || idx} className="flex justify-between">
                <span className="font-medium text-gray-700">
                  {idx + 1}. {u.user?.name || u.name || "User"}
                </span>
                <span className="font-mono text-indigo-600">{u.score} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
