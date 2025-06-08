// src/components/Certificate.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Helmet } from "react-helmet-async";

/**
 * @param {object} props
 * @param {string} props.recipient - User's name
 * @param {string} props.quiz - Quiz title/achievement
 * @param {number|string} props.score - Score achieved (e.g., 94)
 * @param {string} props.date - Date of award (e.g., "8 June 2025")
 * @param {string} props.certId - Unique certificate ID (e.g., "JN-QUIZ-20250608-0001")
 * @param {string} props.issued - Place of issue (e.g., "Lucknow, India")
 * @param {string} props.qrUrl - URL to QR image for verification
 * @param {string} [props.leftSign="Khushboo Tiwari"] - Left signature name
 * @param {string} [props.rightSign="Vajid Ali"] - Right signature name
 * @param {string} [props.leftRole="Head of Department"] - Left role
 * @param {string} [props.rightRole="Co-Founder"] - Right role
 */
export default function Certificate({
  recipient,
  quiz,
  score,
  date,
  certId,
  issued,
  qrUrl,
  leftSign = "Khushboo Tiwari",
  rightSign = "Vajid Ali",
  leftRole = "Head of Department",
  rightRole = "Co-Founder",
}) {
  const certRef = useRef();

  // Download as PDF
  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${recipient || "certificate"}_JobNeura_Certificate.pdf`);
  };

  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&family=Great+Vibes&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
        <title>Certificate of Excellence | JobNeura</title>
      </Helmet>
      <style>{`
        .certificate-bg { min-height: 100vh; background: #f3f4f8; display: flex; align-items: center; justify-content: center; padding: 2vw;}
        .certificate-wrap { width: 900px; max-width: 98vw; min-height: 650px; background: #fff; border-radius: 20px; box-shadow: 0 8px 36px #6366f123; position: relative; overflow: hidden;}
        .corner-svg { position: absolute; width: 84px; height: 84px; pointer-events: none; z-index: 3; opacity: 0.18;}
        .corner-tl { top: 0; left: 0; }
        .corner-tr { top: 0; right: 0; transform: scaleX(-1);}
        .corner-bl { bottom: 0; left: 0; transform: scaleY(-1);}
        .corner-br { bottom: 0; right: 0; transform: scale(-1,-1);}
        .cert-border { position: absolute; inset: 0; border: 3.5px solid #bfc4db; border-radius: 20px; pointer-events: none; z-index: 1;}
        .cert-border-inner { position: absolute; inset: 20px; border: 2.2px solid #6366f1; border-radius: 12px; pointer-events: none; z-index: 2;}
        .cert-watermark { position: absolute; top: 54%; left: 50%; z-index: 2; transform: translate(-50%, -50%); opacity: 0.09; font-size: 8rem; font-family: 'Playfair Display', serif; color: #6366f1; white-space: nowrap; letter-spacing: 0.14em; user-select: none; text-align: center; width: 90%; font-weight: 700; pointer-events: none;}
        .cert-content { position: relative; z-index: 4; padding: 52px 68px 30px 68px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;}
        .cert-header { display: flex; flex-direction: column; align-items: center; gap: 7px;}
        .cert-brand { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #6366f1; letter-spacing: 0.17em; margin-bottom: 5px; text-transform: uppercase; opacity: 0.97;}
        .cert-title { font-family: 'Playfair Display', serif; color: #18181b; font-size: 2.7rem; font-weight: 700; letter-spacing: 1.1px; margin-bottom: 0.15rem;}
        .cert-subtitle { color: #6366f1; font-size: 1.16rem; font-family: 'Inter', sans-serif; margin-bottom: 1.1rem; letter-spacing: 0.6px; font-weight: 600;}
        .cert-body { text-align: center; margin-bottom: 12px;}
        .cert-label { font-size: 1.13rem; color: #333; font-family: 'Inter', sans-serif; margin-bottom: 0.14rem; letter-spacing: 0.38px;}
        .cert-recipient { font-family: 'Playfair Display', serif; font-size: 2.1rem; font-weight: 700; color: #18181b; margin: 0.38rem 0 0.7rem 0; letter-spacing: 1.4px;}
        .cert-achievement { font-size: 1.13rem; color: #0c2e75; margin-bottom: 1.1rem; font-family: 'Inter', sans-serif; font-weight: 600;}
        .cert-meta { font-size: 1.08rem; color: #1e293b; font-family: 'Inter', sans-serif; margin-bottom: 0.13rem;}
        .cert-id { font-size: 1.04rem; color: #6366f1; font-weight: 700; font-family: 'Inter', sans-serif; letter-spacing: 0.8px;}
        .cert-issued { color: #666; font-size: 0.99rem; font-family: 'Inter',sans-serif; margin-bottom: 1.2rem;}
        .cert-footer { display: grid; grid-template-columns: 1fr 135px 1fr; align-items: end; justify-content: center; margin-top: 1.7rem; gap: 0.6rem; padding: 0 2vw;}
        .footer-left, .footer-right { display: flex; flex-direction: column; align-items: center; text-align: center; font-size: 1.01rem; color: #555; position: relative; min-width: 160px;}
        .cert-signature-text { font-family: 'Great Vibes', 'Dancing Script', cursive; font-size: 2.2rem; color: #222; line-height: 1; margin-bottom: 0.35rem; font-weight: 400; letter-spacing: 0.02em; text-shadow: 0 2px 6px #bfc4db19; user-select: none;}
        .cert-sign-line { width: 100%; border-bottom: 2px solid #6366f1; margin-bottom: 8px; margin-top: 18px; min-width: 135px; max-width: 205px; opacity: 0.44;}
        .cert-sign-label { font-size: 1.12rem; font-weight: 700; color: #2d2d2d; font-family: 'Inter', sans-serif; margin-bottom: 2px;}
        .cert-sign-title { font-size: 0.98rem; color: #6b7280; margin-top: 0;}
        .footer-center { display: flex; flex-direction: column; align-items: center; text-align: center; color: #6366f1; font-size: 1.07rem; font-weight: 700;}
        .cert-qr { width: 61px; height: 61px; border-radius: 11px; border: 2px solid #6366f1; object-fit: contain; background: #f5f5fa; margin: 0 auto 4px auto; box-shadow: 0 1px 4px #6366f126; display: block;}
        .qr-label { color: #6366f1; font-size: 0.97rem; margin-top: 2px;}
        .download-btn { display: inline-block; margin: 28px auto 0 auto; padding: 8px 32px; font-size: 1.07rem; font-weight: 700; background: linear-gradient(90deg, #6366f1, #6475e6 70%); color: #fff; border: none; border-radius: 6px; cursor: pointer; transition: background 0.2s; box-shadow: 0 3px 12px #6366f140; letter-spacing: 0.7px;}
        .download-btn:active { background: #6366f1;}
        @media (max-width: 650px) {
          .certificate-wrap { width: 99vw; height: auto; min-height: 90vw;}
          .cert-content { padding: 10vw 2vw 4vw 2vw;}
          .cert-title { font-size: 1.3rem;}
          .cert-recipient { font-size: 1.05rem;}
          .cert-header { gap: 2px;}
          .cert-footer { grid-template-columns: 1fr; gap: 14px; padding: 0 1vw;}
          .footer-left, .footer-right, .footer-center { align-items: center !important; text-align: center !important;}
        }
        @media print {
          body { background: #fff !important; }
          .certificate-wrap { box-shadow: none !important; margin: 0 !important;}
          .download-btn { display: none !important; }
          .cert-watermark { opacity: 0.11;}
          .corner-svg { opacity: 0.13; }
        }
      `}</style>
      <div className="certificate-bg">
        <div ref={certRef} className="certificate-wrap" aria-label="JobNeura Certificate">
          {/* Artistic SVG Corners */}
          <svg className="corner-svg corner-tl" viewBox="0 0 80 80"><path d="M16 70 Q14 15 70 14" stroke="#6366f1" strokeWidth="3.3" fill="none"/><circle cx="16" cy="70" r="5" fill="#facc15"/><circle cx="70" cy="14" r="5" fill="#6366f1"/></svg>
          <svg className="corner-svg corner-tr" viewBox="0 0 80 80"><path d="M16 70 Q14 15 70 14" stroke="#6366f1" strokeWidth="3.3" fill="none"/><circle cx="16" cy="70" r="5" fill="#facc15"/><circle cx="70" cy="14" r="5" fill="#6366f1"/></svg>
          <svg className="corner-svg corner-bl" viewBox="0 0 80 80"><path d="M16 70 Q14 15 70 14" stroke="#6366f1" strokeWidth="3.3" fill="none"/><circle cx="16" cy="70" r="5" fill="#facc15"/><circle cx="70" cy="14" r="5" fill="#6366f1"/></svg>
          <svg className="corner-svg corner-br" viewBox="0 0 80 80"><path d="M16 70 Q14 15 70 14" stroke="#6366f1" strokeWidth="3.3" fill="none"/><circle cx="16" cy="70" r="5" fill="#facc15"/><circle cx="70" cy="14" r="5" fill="#6366f1"/></svg>
          <div className="cert-border"></div>
          <div className="cert-border-inner"></div>
          <div className="cert-watermark">JOBNEURA</div>
          <div className="cert-content">
            <div className="cert-header">
              <div className="cert-brand">JOBNEURA</div>
              <div className="cert-title">Certificate of Excellence</div>
              <div className="cert-subtitle">Quiz Achievement Award</div>
            </div>
            <div className="cert-body">
              <div className="cert-label">This is to certify that</div>
              <div className="cert-recipient">{recipient}</div>
              <div className="cert-label">has achieved an outstanding result in</div>
              <div className="cert-achievement">{quiz}</div>
              <div className="cert-meta">Score: <b>{score}%</b> &nbsp;|&nbsp; Date: <b>{date}</b></div>
              <div className="cert-id">Certificate ID: {certId}</div>
              <div className="cert-issued">Issued in {issued}</div>
            </div>
            <div className="cert-footer">
              <div className="footer-left">
                <div className="cert-signature-text">{leftSign}</div>
                <div className="cert-sign-line"></div>
                <div className="cert-sign-label">{leftRole}</div>
                <div className="cert-sign-title">Signature</div>
              </div>
              <div className="footer-center">
                <img src={qrUrl} className="cert-qr" alt="Verify QR Code" />
                <div className="qr-label">jobneura.tech/verify</div>
              </div>
              <div className="footer-right">
                <div className="cert-signature-text">{rightSign}</div>
                <div className="cert-sign-line"></div>
                <div className="cert-sign-label">{rightRole}</div>
                <div className="cert-sign-title">Signature</div>
              </div>
            </div>
          </div>
        </div>
        {/* Download Button */}
        <button className="download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </>
  );
}
