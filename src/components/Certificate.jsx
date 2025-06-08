// import React, { forwardRef } from "react";
// import { Helmet } from "react-helmet-async";

// /**
//  * @typedef {Object} CertificateProps
//  * @property {string} [recipient] - Name of recipient (user).
//  * @property {string} [quiz] - Quiz or achievement name/title.
//  * @property {number|string} [score] - Score percent (0–100) or raw (calculated).
//  * @property {string|Date} [date] - Date awarded.
//  * @property {string} [certId] - Unique certificate ID.
//  * @property {string} [issued] - Location issued (e.g., 'Lucknow, India').
//  * @property {string} [qrUrl] - QR code image URL for verification.
//  * @property {string} [leftSign] - Left-side signer name.
//  * @property {string} [rightSign] - Right-side signer name.
//  * @property {string} [leftRole] - Left-side signer role.
//  * @property {string} [rightRole] - Right-side signer role.
//  * @property {boolean} [preview] - If true, show compact preview.
//  */

// /**
//  * World-class, robust certificate component for JobNeura.
//  * - Handles all common edge cases.
//  * - Handles both new and legacy cert data.
//  * - Easy to extend.
//  */
// const Certificate = forwardRef(
//   (
//     {
//       recipient,
//       quiz,
//       score,
//       date,
//       certId,
//       issued,
//       qrUrl,
//       leftSign = "Khushboo Tiwari",
//       rightSign = "Vajid Ali",
//       leftRole = "Head of Department",
//       rightRole = "Co-Founder",
//       preview = false,
//       compact = false, // 👈 Add this
//       // Accept full certificate object for legacy support
//       certificate = null,
//     },
//     ref
//   ) => {
//     // Support legacy or incomplete props via `certificate`
//     const cert = certificate || {};
//     // Prefer explicit props, fallback to cert object
//     const recipientVal =
//       recipient ||
//       cert.recipient ||
//       cert.user?.name ||
//       "User Name";
//     const quizVal =
//       quiz ||
//       cert.title ||
//       cert.quizName ||
//       cert.quiz?.title ||
//       cert.quiz?.name ||
//       "Quiz Title";
//     // Score handling (percent or raw)
//     let scoreVal = score ?? cert.score ?? "";
//     if (
//       typeof scoreVal === "number" &&
//       cert.totalQuestions &&
//       cert.totalQuestions > 0 &&
//       scoreVal <= cert.totalQuestions // Raw score, so calc %
//     ) {
//       scoreVal = Math.round((scoreVal / cert.totalQuestions) * 100);
//     }
//     // Format date
//     const dateVal =
//       date ||
//       cert.issueDate ||
//       cert.createdAt ||
//       "";
//     const dateStr =
//       dateVal
//         ? new Date(dateVal).toLocaleDateString("en-IN", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })
//         : "";

//     // QR code
//     const qr =
//       qrUrl ||
//       `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
//         window.location.origin +
//           "/certificates/" +
//           (certId || cert.certificateId || "")
//       )}&size=${preview ? "60x60" : "90x90"}`;

//     return (
//       <>
//         <Helmet>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&family=Great+Vibes&family=Dancing+Script:wght@700&display=swap"
//             rel="stylesheet"
//           />
//         </Helmet>
//         <div
//           ref={ref}
//           className="certificate-wrap"
//           style={{
//             width: preview ? 340 : 900,
//             minHeight: preview ? 240 : 650,
//             fontSize: preview ? "0.78rem" : "1rem",
//             background: "#fff",
//             borderRadius: 20,
//             boxShadow: preview
//               ? "0 2px 8px #6366f130"
//               : "0 8px 36px #6366f123",
//             overflow: "hidden",
//             position: "relative",
//             margin: "auto",
//             transition: "box-shadow 0.18s",
//           }}
//         >
//           {/* SVG Corners */}
//           <svg
//             className="corner-svg corner-tl"
//             viewBox="0 0 80 80"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: 64,
//               height: 64,
//               opacity: 0.13,
//             }}
//           >
//             <path
//               d="M16 70 Q14 15 70 14"
//               stroke="#6366f1"
//               strokeWidth="3.3"
//               fill="none"
//             />
//             <circle cx="16" cy="70" r="5" fill="#facc15" />
//             <circle cx="70" cy="14" r="5" fill="#6366f1" />
//           </svg>
//           <svg
//             className="corner-svg corner-tr"
//             viewBox="0 0 80 80"
//             style={{
//               position: "absolute",
//               top: 0,
//               right: 0,
//               width: 64,
//               height: 64,
//               opacity: 0.13,
//               transform: "scaleX(-1)",
//             }}
//           >
//             <path
//               d="M16 70 Q14 15 70 14"
//               stroke="#6366f1"
//               strokeWidth="3.3"
//               fill="none"
//             />
//             <circle cx="16" cy="70" r="5" fill="#facc15" />
//             <circle cx="70" cy="14" r="5" fill="#6366f1" />
//           </svg>
//           {/* Main borders */}
//           <div
//             className="cert-border"
//             style={{
//               position: "absolute",
//               inset: 0,
//               border: "3.5px solid #bfc4db",
//               borderRadius: 20,
//               pointerEvents: "none",
//               zIndex: 1,
//             }}
//           ></div>
//           <div
//             className="cert-border-inner"
//             style={{
//               position: "absolute",
//               inset: 20,
//               border: "2.2px solid #6366f1",
//               borderRadius: 12,
//               pointerEvents: "none",
//               zIndex: 2,
//             }}
//           ></div>
//           {/* Watermark */}
//           <div
//             className="cert-watermark"
//             style={{
//               position: "absolute",
//               top: "54%",
//               left: "50%",
//               zIndex: 2,
//               transform: "translate(-50%, -50%)",
//               opacity: 0.09,
//               fontSize: preview ? "2.8rem" : "8rem",
//               fontFamily: "'Playfair Display', serif",
//               color: "#6366f1",
//               whiteSpace: "nowrap",
//               width: "90%",
//               fontWeight: 700,
//               userSelect: "none",
//               pointerEvents: "none",
//               textAlign: "center",
//             }}
//           >
//             JOBNEURA
//           </div>
//           <div
//             className="cert-content"
//             style={{
//               position: "relative",
//               zIndex: 4,
//               padding: preview
//                 ? "14px 12px 6px 12px"
//                 : "52px 68px 30px 68px",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               height: "100%",
//             }}
//           >
//             {/* Header */}
//             <div
//               className="cert-header"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: preview ? 2 : 7,
//               }}
//             >
//               <div
//                 className="cert-brand"
//                 style={{
//                   fontFamily: "'Playfair Display', serif",
//                   fontSize: preview ? "1.1rem" : "2rem",
//                   fontWeight: 700,
//                   color: "#6366f1",
//                   letterSpacing: "0.17em",
//                   marginBottom: 5,
//                   textTransform: "uppercase",
//                   opacity: 0.97,
//                 }}
//               >
//                 JOBNEURA
//               </div>
//               <div
//                 className="cert-title"
//                 style={{
//                   fontFamily: "'Playfair Display', serif",
//                   color: "#18181b",
//                   fontSize: preview ? "1.32rem" : "2.7rem",
//                   fontWeight: 700,
//                   letterSpacing: "1.1px",
//                   marginBottom: ".15rem",
//                 }}
//               >
//                 Certificate of Excellence
//               </div>
//               <div
//                 className="cert-subtitle"
//                 style={{
//                   color: "#6366f1",
//                   fontSize: preview ? "0.67rem" : "1.16rem",
//                   fontFamily: "'Inter', sans-serif",
//                   marginBottom: "1.1rem",
//                   letterSpacing: "0.6px",
//                   fontWeight: 600,
//                 }}
//               >
//                 Quiz Achievement Award
//               </div>
//             </div>
//             {/* Main Body */}
//             <div
//               className="cert-body"
//               style={{ textAlign: "center", marginBottom: 12 }}
//             >
//               <div
//                 className="cert-label"
//                 style={{
//                   fontSize: preview ? "0.65rem" : "1.13rem",
//                   color: "#333",
//                   fontFamily: "'Inter', sans-serif",
//                   marginBottom: ".14rem",
//                   letterSpacing: "0.38px",
//                 }}
//               >
//                 This is to certify that
//               </div>
//               <div
//                 className="cert-recipient"
//                 style={{
//                   fontFamily: "'Playfair Display', serif",
//                   fontSize: preview ? "1.13rem" : "2.1rem",
//                   fontWeight: 700,
//                   color: "#18181b",
//                   margin: ".38rem 0 .7rem 0",
//                   letterSpacing: "1.4px",
//                 }}
//               >
//                 {recipientVal}
//               </div>
//               <div
//                 className="cert-label"
//                 style={{
//                   fontSize: preview ? "0.65rem" : "1.13rem",
//                 }}
//               >
//                 has achieved an outstanding result in
//               </div>
//               <div
//                 className="cert-achievement"
//                 style={{
//                   fontSize: preview ? "0.72rem" : "1.13rem",
//                   color: "#0c2e75",
//                   marginBottom: "1.1rem",
//                   fontFamily: "'Inter', sans-serif",
//                   fontWeight: 600,
//                 }}
//               >
//                 {quizVal}
//               </div>
//               <div
//                 className="cert-meta"
//                 style={{
//                   fontSize: preview ? "0.62rem" : "1.08rem",
//                   color: "#1e293b",
//                   fontFamily: "'Inter', sans-serif",
//                   marginBottom: ".13rem",
//                 }}
//               >
//                 Score: <b>{scoreVal}%</b> &nbsp;|&nbsp; Date:{" "}
//                 <b>{dateStr}</b>
//               </div>
//               <div
//                 className="cert-id"
//                 style={{
//                   fontSize: preview ? "0.65rem" : "1.04rem",
//                   color: "#6366f1",
//                   fontWeight: 700,
//                   fontFamily: "'Inter', sans-serif",
//                   letterSpacing: "0.8px",
//                 }}
//               >
//                 Certificate ID: {certId || cert.certificateId}
//               </div>
//               <div
//                 className="cert-issued"
//                 style={{
//                   color: "#666",
//                   fontSize: preview ? "0.59rem" : "0.99rem",
//                   fontFamily: "'Inter',sans-serif",
//                   marginBottom: "1.2rem",
//                 }}
//               >
//                 Issued in {issued || cert.issued || "Lucknow, India"}
//               </div>
//             </div>
//             {/* Footer */}
//             <div
//               className="cert-footer"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 125px 1fr",
//                 alignItems: "end",
//                 justifyContent: "center",
//                 marginTop: preview ? ".7rem" : "1.7rem",
//                 gap: ".6rem",
//                 padding: "0 2vw",
//               }}
//             >
//               {/* Left Sign */}
//               <div
//                 className="footer-left"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                   fontSize: "1.01rem",
//                   color: "#555",
//                   position: "relative",
//                   minWidth: preview ? 50 : 160,
//                 }}
//               >
//                 <div
//                   className="cert-signature-text"
//                   style={{
//                     fontFamily:
//                       "'Great Vibes','Dancing Script',cursive",
//                     fontSize: preview ? "1.13rem" : "2.2rem",
//                     color: "#222",
//                     lineHeight: 1,
//                     marginBottom: ".35rem",
//                     fontWeight: 400,
//                     letterSpacing: "0.02em",
//                     textShadow: "0 2px 6px #bfc4db19",
//                     userSelect: "none",
//                   }}
//                 >
//                   {leftSign}
//                 </div>
//                 <div
//                   className="cert-sign-line"
//                   style={{
//                     width: "100%",
//                     borderBottom: "2px solid #6366f1",
//                     marginBottom: 8,
//                     marginTop: 18,
//                     minWidth: preview ? 50 : 135,
//                     maxWidth: 205,
//                     opacity: 0.44,
//                   }}
//                 ></div>
//                 <div
//                   className="cert-sign-label"
//                   style={{
//                     fontSize: preview ? "0.62rem" : "1.12rem",
//                     fontWeight: 700,
//                     color: "#2d2d2d",
//                     fontFamily: "'Inter', sans-serif",
//                     marginBottom: 2,
//                   }}
//                 >
//                   {leftRole}
//                 </div>
//                 <div
//                   className="cert-sign-title"
//                   style={{
//                     fontSize: preview ? "0.58rem" : "0.98rem",
//                     color: "#6b7280",
//                     marginTop: 0,
//                   }}
//                 >
//                   Signature
//                 </div>
//               </div>
//               {/* Center QR */}
//               <div
//                 className="footer-center"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                   color: "#6366f1",
//                   fontSize: preview ? "0.73rem" : "1.07rem",
//                   fontWeight: 700,
//                 }}
//               >
//                 <img
//                   src={qr}
//                   className="cert-qr"
//                   alt="Verify QR Code"
//                   style={{
//                     width: preview ? 31 : 61,
//                     height: preview ? 31 : 61,
//                     borderRadius: 11,
//                     border: "2px solid #6366f1",
//                     objectFit: "contain",
//                     background: "#f5f5fa",
//                     margin: "0 auto 4px auto",
//                     boxShadow: "0 1px 4px #6366f126",
//                     display: "block",
//                   }}
//                 />
//                 <div
//                   className="qr-label"
//                   style={{
//                     color: "#6366f1",
//                     fontSize: preview ? "0.41rem" : "0.97rem",
//                     marginTop: 2,
//                   }}
//                 >
//                   jobneura.tech/verify
//                 </div>
//               </div>
//               {/* Right Sign */}
//               <div
//                 className="footer-right"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   textAlign: "center",
//                   fontSize: "1.01rem",
//                   color: "#555",
//                   position: "relative",
//                   minWidth: preview ? 50 : 160,
//                 }}
//               >
//                 <div
//                   className="cert-signature-text"
//                   style={{
//                     fontFamily:
//                       "'Great Vibes','Dancing Script',cursive",
//                     fontSize: preview ? "1.13rem" : "2.2rem",
//                     color: "#222",
//                     lineHeight: 1,
//                     marginBottom: ".35rem",
//                     fontWeight: 400,
//                     letterSpacing: "0.02em",
//                     textShadow: "0 2px 6px #bfc4db19",
//                     userSelect: "none",
//                   }}
//                 >
//                   {rightSign}
//                 </div>
//                 <div
//                   className="cert-sign-line"
//                   style={{
//                     width: "100%",
//                     borderBottom: "2px solid #6366f1",
//                     marginBottom: 8,
//                     marginTop: 18,
//                     minWidth: preview ? 50 : 135,
//                     maxWidth: 205,
//                     opacity: 0.44,
//                   }}
//                 ></div>
//                 <div
//                   className="cert-sign-label"
//                   style={{
//                     fontSize: preview ? "0.62rem" : "1.12rem",
//                     fontWeight: 700,
//                     color: "#2d2d2d",
//                     fontFamily: "'Inter', sans-serif",
//                     marginBottom: 2,
//                   }}
//                 >
//                   {rightRole}
//                 </div>
//                 <div
//                   className="cert-sign-title"
//                   style={{
//                     fontSize: preview ? "0.58rem" : "0.98rem",
//                     color: "#6b7280",
//                     marginTop: 0,
//                   }}
//                 >
//                   Signature
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// );

// export default Certificate;

import React, { forwardRef } from "react";
import { Helmet } from "react-helmet-async";

/**
 * Certificate component with full visual structure for dynamic image generation
 */
const Certificate = forwardRef(
  (
    {
      recipient = "User Name",
      quiz = "Quiz Title",
      score = "100",
      date = "8 June 2025",
      certId = "CERT123456789",
      issued = "Lucknow, India",
      qrUrl = "",
    },
    ref
  ) => {
    return (
      <html>
        <head>
          <title>Certificate of Excellence</title>
          <meta property="og:title" content={`Certificate: ${recipient}`} />
          <meta property="og:description" content={`Awarded for ${quiz}`} />
          <meta
            property="og:image"
            content={`https://api.jobneura.tech/og/certificates/${certId}/image`}
          />
          <meta
            property="og:url"
            content={`https://jobneura.tech/certificates/${certId}`}
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <style>{`
            body {
              margin: 0;
              font-family: 'Segoe UI', sans-serif;
              background: #fff;
              text-align: center;
              padding: 40px;
              color: #222;
            }
            .cert-box {
              border: 5px solid #4f46e5;
              padding: 30px;
              border-radius: 20px;
              max-width: 960px;
              margin: auto;
              box-shadow: 0 0 40px rgba(0,0,0,0.08);
            }
            .cert-title {
              font-size: 36px;
              color: #4f46e5;
              margin-bottom: 8px;
              font-weight: bold;
            }
            .cert-name {
              font-size: 28px;
              font-weight: 600;
              margin: 20px 0;
            }
            .cert-quiz {
              font-size: 20px;
              margin-bottom: 14px;
            }
            .cert-meta {
              font-size: 16px;
              margin-top: 10px;
              color: #555;
            }
            .cert-footer {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              font-size: 14px;
              color: #444;
            }
            .qr {
              width: 80px;
              height: 80px;
            }
          `}</style>
        </head>
        <body>
          <div className="cert-box" ref={ref}>
            <div className="cert-title">Certificate of Excellence</div>
            <div>This is proudly presented to</div>
            <div className="cert-name">{recipient}</div>
            <div className="cert-quiz">
              For outstanding performance in <b>{quiz}</b>
            </div>
            <div className="cert-meta">
              Score: <strong>{score}%</strong> | Awarded on: <strong>{date}</strong>
            </div>
            <div className="cert-meta">Issued in {issued}</div>
            <div className="cert-meta">Certificate ID: {certId}</div>
            <div className="cert-footer">
              <div>Khushboo Tiwari<br />Head of Department</div>
              {qrUrl && <img src={qrUrl} alt="QR Code" className="qr" />}
              <div>Vajid Ali<br />Co-Founder</div>
            </div>
          </div>
        </body>
      </html>
    );
  }
);

export default Certificate;
