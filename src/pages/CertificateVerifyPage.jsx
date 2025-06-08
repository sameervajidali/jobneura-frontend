import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyCertificate } from "../services/certificateService";
import CertificateTemplate from "../components/Certificate";
import { FaCheckCircle, FaExclamationTriangle, FaShareAlt, FaCopy, FaUser, FaClock } from "react-icons/fa";

const getCertificateUrl = (id) => `${window.location.origin}/certificate/${id}`;

export default function CertificateVerifyPage() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyCertificate(certificateId)
      .then(res => {
        if (res.valid) setCertificate(res.certificate);
        else setError("Certificate not found or invalid.");
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred during verification.");
        setLoading(false);
      });
  }, [certificateId]);

  // Copy shareable link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCertificateUrl(certificateId));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Social share
  const handleShare = (platform) => {
    const url = encodeURIComponent(getCertificateUrl(certificateId));
    const text = encodeURIComponent(
      `Verified JobNeura Certificate: "${certificate?.title}" awarded to ${certificate?.recipient}`
    );
    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-lg text-gray-600">
        <span className="animate-spin text-indigo-600 text-3xl mb-4">⏳</span>
        Verifying certificate…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-600">
        <FaExclamationTriangle className="text-3xl mb-4" />
        <div className="text-xl font-bold mb-1">{error}</div>
        <Link to="/" className="text-indigo-600 underline mt-2">Go back to Home</Link>
      </div>
    );
  }

  // Expired/Revoked warning (optional)
  const isExpired = certificate?.expirationDate && new Date(certificate.expirationDate) < new Date();

  return (
    <div className="max-w-4xl mx-auto py-10 px-2 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Certificate Preview */}
        <div className="flex-1">
          <CertificateTemplate {...certificate} />
        </div>
        {/* Right: Verification Panel */}
        <div className="w-full md:w-96 flex flex-col gap-6 mt-8 md:mt-0">
          {/* Verification Status */}
          <div className="flex items-center gap-3 bg-green-50 rounded-xl px-5 py-4 border border-green-200 shadow-sm">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <div>
              <div className="text-lg font-bold text-green-700">
                Certificate Verified
              </div>
              <div className="text-xs text-gray-600">
                Issued by <span className="font-semibold">{certificate.issuer}</span>
              </div>
            </div>
          </div>

          {/* Owner/Recipient */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border">
            <FaUser className="text-indigo-400 text-xl" />
            <div>
              <div className="font-semibold text-gray-800">{certificate.recipient}</div>
              <div className="text-xs text-gray-500">Certificate holder</div>
            </div>
          </div>

          {/* Expiry / Validity */}
          {certificate.expirationDate && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm border ${isExpired ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}>
              <FaClock className={`text-xl ${isExpired ? "text-red-400" : "text-blue-400"}`} />
              <div>
                {isExpired ? (
                  <div className="font-semibold text-red-600">Expired on {new Date(certificate.expirationDate).toLocaleDateString()}</div>
                ) : (
                  <div className="font-semibold text-blue-700">Valid until {new Date(certificate.expirationDate).toLocaleDateString()}</div>
                )}
                <div className="text-xs text-gray-500">Validity status</div>
              </div>
            </div>
          )}

          {/* Share/Copy */}
          <div className="flex flex-col gap-2 px-4 py-3 bg-white rounded-xl shadow-sm border">
            <div className="flex gap-2 mb-1">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow transition"
                onClick={handleCopyLink}
              >
                <FaCopy /> {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition"
                onClick={() => handleShare("linkedin")}
              >
                <FaShareAlt /> LinkedIn
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold shadow transition"
                onClick={() => handleShare("twitter")}
              >
                <FaShareAlt /> Twitter
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Share or embed this certificate to verify authenticity.
            </div>
          </div>

          {/* QR (always show, not just print) */}
          <div className="flex flex-col items-center mt-2">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(getCertificateUrl(certificateId))}&size=90x90`}
              alt="QR for verification"
              className="rounded-lg border"
              style={{ width: 74, height: 74 }}
            />
            <div className="mt-1 text-xs text-indigo-700 break-all font-mono">{getCertificateUrl(certificateId)}</div>
          </div>

          {/* Admin/Fraud Report (future-proof) */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800 flex items-center gap-2 mt-2">
            <FaExclamationTriangle className="text-yellow-500" />
            If you suspect this certificate is fake or misused, <a href="mailto:support@jobneura.tech" className="underline font-semibold">contact JobNeura support</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
