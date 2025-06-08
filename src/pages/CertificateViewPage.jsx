// // src/pages/CertificateViewPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { verifyCertificate } from "../services/certificateService";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// // Your real JSX certificate template
// import CertificateTemplate from "../components/Certificate"; // (Move your JSX here for full modularity!)

// export default function CertificateViewPage() {
//   const { certificateId } = useParams();
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const certRef = useRef();

//   useEffect(() => {
//     verifyCertificate(certificateId)
//       .then(res => {
//         if (res.valid) setCertificate(res.certificate);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [certificateId]);

//   const handleDownload = async () => {
//     if (!certRef.current) return;
//     const canvas = await html2canvas(certRef.current, {
//       scale: 2, // sharp output
//       useCORS: true,
//       backgroundColor: "#fff"
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [canvas.width, canvas.height]
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//     pdf.save(`JobNeura-Certificate-${certificateId}.pdf`);
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-[60vh] text-xl text-gray-700">Loading certificate…</div>;
//   }

//   if (!certificate) {
//     return <div className="flex justify-center items-center h-[60vh] text-red-600 text-xl">Certificate not found or invalid.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-2">
//       <div className="flex flex-col items-center">
//         <div ref={certRef} className="mb-7">
//           <CertificateTemplate {...certificate} />
//         </div>
//         <button
//           className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow transition"
//           onClick={handleDownload}
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/CertificateViewPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyCertificate } from "../services/certificateService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload, FaImage, FaPrint, FaShareAlt, FaCheckCircle, FaCopy, FaLink } from "react-icons/fa";
import CertificateTemplate from "../components/Certificate";

const getCertificateUrl = (id) => `${window.location.origin}/certificate/${id}`;

export default function CertificateViewPage() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const certRef = useRef();

  useEffect(() => {
    verifyCertificate(certificateId)
      .then(res => {
        if (res.valid) setCertificate(res.certificate);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [certificateId]);

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setFeedback("Preparing PDF...");
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: "#fff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`JobNeura-Certificate-${certificateId}.pdf`);
    setFeedback("PDF downloaded!");
    setTimeout(() => setFeedback(""), 1800);
  };

  // Download as Image (PNG)
  const handleDownloadImage = async () => {
    if (!certRef.current) return;
    setFeedback("Preparing Image...");
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: "#fff" });
    const img = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = img;
    a.download = `JobNeura-Certificate-${certificateId}.png`;
    a.click();
    setFeedback("Image downloaded!");
    setTimeout(() => setFeedback(""), 1800);
  };

  // Print Certificate
  const handlePrint = async () => {
    if (!certRef.current) return;
    setFeedback("Opening print dialog…");
    const printWindow = window.open("", "PRINT", "height=700,width=1100");
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, backgroundColor: "#fff" });
    const img = canvas.toDataURL("image/png");
    printWindow.document.write(`
      <html><head><title>Print Certificate</title></head>
      <body style="margin:0;padding:0;">
        <img src="${img}" style="width:100%;max-width:900px;display:block;margin:0 auto;"/>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      setFeedback("");
    }, 700);
  };

  // Copy Share Link
  const handleCopyLink = () => {
    const url = getCertificateUrl(certificateId);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setFeedback("Link copied!");
    setTimeout(() => { setCopied(false); setFeedback(""); }, 1400);
  };

  // Social Share (WhatsApp, Twitter, LinkedIn)
  const handleShare = (platform) => {
    const url = encodeURIComponent(getCertificateUrl(certificateId));
    const text = encodeURIComponent(
      `Check out my JobNeura Certificate of Excellence: "${certificate?.title || "Certificate"}" – ${certificate?.recipient || ""}`
    );
    let shareUrl = "";
    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl text-gray-700">
        Loading certificate…
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-600 text-xl">
        Certificate not found or invalid.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 animate-fade-in">
      <div className="flex flex-col items-center gap-7">
        <div
          ref={certRef}
          className="mb-5 bg-white rounded-2xl shadow-lg overflow-hidden"
          style={{ border: "2.5px solid #d1d5db" }}
        >
          <CertificateTemplate {...certificate} />
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-2 px-5 py-2 bg-violet-500 hover:bg-violet-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FaImage /> Download Image
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-slate-500 hover:bg-slate-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FaPrint /> Print
          </button>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition ${copied ? "opacity-80" : ""}`}
          >
            <FaLink /> {copied ? "Copied!" : "Copy Link"}
          </button>
          {/* Social Share */}
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition"
          >
            <FaShareAlt /> WhatsApp
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2 px-5 py-2 bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition"
          >
            <FaShareAlt /> Twitter
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="flex items-center gap-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition"
          >
            <FaShareAlt /> LinkedIn
          </button>
        </div>
        {/* Feedback Message */}
        {feedback && (
          <div className="text-center flex items-center gap-2 mt-2 text-lg text-indigo-700 font-semibold">
            <FaCheckCircle /> {feedback}
          </div>
        )}
        {/* Verification QR */}
        <div className="mt-6 flex flex-col items-center">
          <span className="text-xs text-gray-500">Scan to verify certificate</span>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(getCertificateUrl(certificateId))}&size=90x90`}
            alt="QR for verification"
            className="rounded-lg border mt-1"
            style={{ width: 70, height: 70 }}
          />
          <a
            href={getCertificateUrl(certificateId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-indigo-600 underline text-xs"
          >
            {getCertificateUrl(certificateId)}
          </a>
        </div>
      </div>
    </div>
  );
}

