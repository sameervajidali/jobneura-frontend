// src/pages/CertificateViewPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyCertificate } from "../services/certificateService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Your real JSX certificate template
import CertificateTemplate from "../components/CertificateTemplate"; // (Move your JSX here for full modularity!)

export default function CertificateViewPage() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const certRef = useRef();

  useEffect(() => {
    verifyCertificate(certificateId)
      .then(res => {
        if (res.valid) setCertificate(res.certificate);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [certificateId]);

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      scale: 2, // sharp output
      useCORS: true,
      backgroundColor: "#fff"
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`JobNeura-Certificate-${certificateId}.pdf`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh] text-xl text-gray-700">Loading certificate…</div>;
  }

  if (!certificate) {
    return <div className="flex justify-center items-center h-[60vh] text-red-600 text-xl">Certificate not found or invalid.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <div className="flex flex-col items-center">
        <div ref={certRef} className="mb-7">
          <CertificateTemplate {...certificate} />
        </div>
        <button
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
