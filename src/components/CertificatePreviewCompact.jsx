// src/components/CertificatePreviewCompact.jsx
import React from "react";

export default function CertificatePreviewCompact({
  recipient = "User Name",
  quiz = "Quiz Title",
  score = 100,
  date = "8 June 2025",
  certId = "JN-QUIZ-XXXX",
  qrUrl = "",
}) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-white shadow-md px-6 py-5 max-w-xs text-sm text-gray-700 font-medium">
      <h3 className="text-center text-indigo-700 font-bold tracking-wide text-sm mb-1">
        JOBNEURA
      </h3>
      <p className="text-center text-gray-700 text-xs mb-2">
        Certificate of Excellence
      </p>

      <p className="text-xs text-gray-600 text-center">
        Awarded to <span className="font-semibold text-gray-900">{recipient}</span>
        <br />for <span className="font-semibold text-indigo-700">{quiz}</span>
      </p>

      <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
        <span>
          <strong>Score:</strong> {score}%
        </span>
        <span>
          <strong>Date:</strong> {date}
        </span>
      </div>

      <div className="text-xs mt-2 text-center">
        <p className="text-[10px] text-indigo-500 font-medium">
          Certificate ID: {certId}
        </p>
        {qrUrl && (
          <img
            src={qrUrl}
            alt="QR Code"
            className="mx-auto mt-1 w-14 h-14 rounded-sm border"
          />
        )}
      </div>
    </div>
  );
}
