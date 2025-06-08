// src/components/CertificatePreviewCompact.jsx
import React from "react";

export default function CertificatePreviewCompact({
  recipient = "User Name",
  quiz = "Quiz Title",
  score = 100,
  date = "8 June 2025",
  certId = "",
  issued = "Location",
  qrUrl = "",
}) {
  return (
    <div className="w-[300px] h-[200px] border-2 border-indigo-300 rounded-xl p-3 bg-white shadow-sm text-xs font-sans">
      <div className="text-center text-indigo-600 font-bold text-sm mb-1">
        JOBNEURA
      </div>
      <div className="text-center font-semibold text-gray-800">
        Certificate of Excellence
      </div>
      <div className="mt-2 text-center text-gray-600">
        Awarded to <b>{recipient}</b> for <b>{quiz}</b>
      </div>
      <div className="mt-2 flex justify-between text-gray-500 text-xs">
        <div>Score: {score}%</div>
        <div>Date: {date}</div>
      </div>
      <div className="mt-1 text-gray-400 text-[10px]">
        Certificate ID: {certId}
      </div>
      {qrUrl && (
        <div className="mt-1 flex justify-center">
          <img src={qrUrl} alt="QR Code" className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
