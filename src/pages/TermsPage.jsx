
import React from "react";

import { ShieldCheck, User, Server, AlertTriangle, RefreshCw, Globe, HelpCircle } from "lucide-react";

const sections = [
  {
    title: "Eligibility",
    icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    text: "Our platform is open to users of all ages. Users under 13 must have parental or guardian consent. We offer quizzes suitable for all knowledge levels."
  },
  {
    title: "User Accounts",
    icon: <User className="w-5 h-5 text-blue-600" />,
    text: "You are responsible for keeping your login credentials secure. Report any unauthorized use immediately."
  },
  {
    title: "Services Provided",
    icon: <Server className="w-5 h-5 text-blue-600" />,
    text: "JobNeura offers job listings, tutorials, quizzes, and blogs. We may update or suspend features anytime."
  },
  {
    title: "Prohibited Use",
    icon: <AlertTriangle className="w-5 h-5 text-blue-600" />,
    text: "You must not misuse the platform, such as distributing malware, violating laws, or impersonating others."
  },
  {
    title: "Modifications",
    icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
    text: "We may modify these Terms at any time. Continued use after changes means you agree to the new terms."
  },
  {
    title: "Governing Law",
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    text: "These terms are governed by applicable laws in your jurisdiction."
  },
  {
    title: "Contact",
    icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
    text: "For questions, email us at support@jobneura.com."
  }
];

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-600 mb-8">
          By using JobNeura, you agree to the following terms. Please read them carefully.
        </p>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-1">{section.icon}</div>
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{index + 1}. {section.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
