import React from "react";
import { User, ShieldCheck, EyeOff, Globe,  Trash2, HelpCircle, Lock, FileText } from "lucide-react";


const sections = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    title: "1. Information We Collect",
    content: `We collect information that you provide when you sign up, fill out your profile, apply for jobs, participate in quizzes, or communicate with us. This includes your name, email address, resume, quiz data, and technical usage information.`
  },
  {
    icon: <EyeOff className="h-6 w-6 text-indigo-600" />,
    title: "2. How We Use Your Data",
    content: `We use your information to provide personalized experiences, improve our platform, offer job suggestions, maintain security, and communicate important updates.`
  },
  {
    icon: <FileText className="h-6 w-6 text-indigo-600" />,
    title: "3. Sharing of Information",
    content: `We do not sell your personal data. We may share data with trusted partners who help us operate the platform (e.g., email services), but they are bound by confidentiality.`
  },
  {
    icon: <Globe className="h-6 w-6 text-indigo-600" />,
    title: "4. Cookies and Tracking",
    content: `We use cookies and similar technologies to enhance your experience, track user behavior, and gather usage analytics.`
  },
  {
    icon: <User className="h-6 w-6 text-indigo-600" />,
    title: "5. Your Rights",
    content: `You can update your profile information at any time. You may request data deletion, correction, or access by contacting us.`
  },
  {
    icon: <Trash2 className="h-6 w-6 text-indigo-600" />,
    title: "6. Data Retention",
    content: `We retain your data only as long as necessary for legal and operational purposes. Deleted data may remain in backups for a limited period.`
  },
  {
    icon: <Lock className="h-6 w-6 text-indigo-600" />,
    title: "7. Security",
    content: `We use encryption, secure servers, and access controls to protect your data. However, no online system is 100% secure.`
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    title: "8. Children’s Privacy",
    content: `Our platform is open to users of all ages. Children under 13 must use the platform with parental or guardian consent.`
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.`
  },
  {
    icon: <HelpCircle className="h-6 w-6 text-indigo-600" />,
    title: "10. Contact Us",
    content: `For any questions about this Privacy Policy, contact us at support@jobneura.com.`
  }
];

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-violet-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600 mb-6 text-center">
          This Privacy Policy explains how JobNeura collects, uses, shares, and protects your personal information.
        </p>
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
              </div>
              <p className="text-gray-600 text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
