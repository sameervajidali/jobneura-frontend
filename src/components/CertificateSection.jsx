import React, { useState } from "react";
import Certificate from "../components/Certificate";
import Confetti from "react-confetti"; // optional
import useWindowSize from "react-use/lib/useWindowSize"; // optional, for confetti

export default function CertificateSection({
  certificate,
  onDownloadPDF,
  onCopyLink,
  onShare,
}) {
  const [showModal, setShowModal] = useState(false);
  const { width, height } = useWindowSize();

  if (!certificate) return null;

 

  return (
    <>
      {/* Celebration Confetti */}
      {showModal && (
        <Confetti width={width} height={height} numberOfPieces={180} recycle={false} />
      )}

      {/* Top Certificate Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 border border-indigo-200 rounded-2xl shadow-lg p-7 mb-8 flex flex-col md:flex-row gap-6 items-center animate-fadeIn">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-indigo-700 mb-1 flex items-center gap-2">
            <span role="img" aria-label="celebrate">🎉</span> Certificate Earned!
          </h2>
          <p className="text-gray-700 mb-3">
            Congratulations! You've earned a <b>{certificate.title}</b> certificate.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
            >
              View Certificate
            </button>
            <button
              onClick={onDownloadPDF}
              className="bg-white border border-indigo-600 text-indigo-700 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50"
            >
              Download PDF
            </button>
            <button
              onClick={onCopyLink}
              className="bg-gray-100 border border-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200"
            >
              Copy Link
            </button>
            <a
              href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-sky-100 border border-sky-300 text-sky-900 px-5 py-2 rounded-lg font-semibold hover:bg-sky-50"
            >
              Add to LinkedIn
            </a>
            <button
              onClick={onShare}
              className="bg-green-50 border border-green-400 text-green-800 px-5 py-2 rounded-lg font-semibold hover:bg-green-100"
            >
              Share
            </button>
          </div>
        </div>
        <img src="/certificate-illustration.svg" alt="Certificate Illustration" className="w-40 h-40 hidden md:block" />
      </div>

      {/* Certificate Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-7 relative animate-fadeIn">
            <button
              className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <Certificate cert={certificate} />
            <div className="flex justify-center gap-4 mt-7">
              <button onClick={onDownloadPDF} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700">
                Download PDF
              </button>
              <button onClick={onCopyLink} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300">
                Copy Link
              </button>
              <a href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.title)}`} target="_blank" rel="noopener noreferrer"
                className="bg-sky-100 border border-sky-300 text-sky-900 px-5 py-2 rounded-lg font-semibold hover:bg-sky-50"
              >
                Add to LinkedIn
              </a>
              <button onClick={onShare} className="bg-green-50 border border-green-400 text-green-800 px-5 py-2 rounded-lg font-semibold hover:bg-green-100">
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
