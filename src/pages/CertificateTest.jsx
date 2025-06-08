import React from "react";
import Certificate from "../components/Certificate";

export default function CertificateTest() {
  return (
    <Certificate
      recipient="Vajid Ali"
      quiz="Python Programming Fundamentals Quiz"
      score={94}
      date="8 June 2025"
      certId="JN-QUIZ-20250608-0001"
      issued="Lucknow, India"
      qrUrl="https://api.qrserver.com/v1/create-qr-code/?data=https://jobneura.tech/verify/JN-QUIZ-20250608-0001&size=100x100"
      leftSign="Khushboo Tiwari"
      rightSign="Vajid Ali"
      leftRole="Head of Department"
      rightRole="Co-Founder"
    />
  );
}
