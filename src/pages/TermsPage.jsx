// import React from "react";


// export default function TermsPage() {
//   return (
//     <AuthLayout>
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Terms & Conditions
//         </h1>

//         <section className="space-y-6 text-sm text-gray-700">
//           <p>
//             Welcome to JobNeura. By accessing or using our platform, you agree
//             to be bound by the following Terms and Conditions. Please read them
//             carefully.
//           </p>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               1. Eligibility
//             </h2>
//             <p>
//               Our platform is open to users of all ages. However, users under
//               the age of 13 must have parental or guardian consent to access
//               certain features. We offer general knowledge and technical quizzes
//               suitable for all levels.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               2. User Accounts
//             </h2>
//             <p>
//               You are responsible for maintaining the confidentiality of your
//               account credentials. You agree to notify us immediately of any
//               unauthorized use of your account.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               3. Services Provided
//             </h2>
//             <p>
//               JobNeura provides quizzes, job listings, resume assistance, and
//               other AI-powered tools. Features may be updated, added, or
//               discontinued at our discretion.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               4. Content Ownership
//             </h2>
//             <p>
//               All content, logos, and trademarks on the platform are the
//               property of JobNeura. You may not reproduce or redistribute any
//               part without written consent.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               5. Prohibited Conduct
//             </h2>
//             <ul className="list-disc pl-6 mt-1 space-y-1">
//               <li>Posting false or misleading information</li>
//               <li>Attempting to breach platform security</li>
//               <li>Uploading viruses or malicious content</li>
//               <li>Using bots to apply for jobs without consent</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               6. Limitation of Liability
//             </h2>
//             <p>
//               We are not liable for any direct, indirect, or incidental damages
//               resulting from your use of the platform or services.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               7. Changes to Terms
//             </h2>
//             <p>
//               We may update these Terms at any time. Continued use of the
//               platform constitutes acceptance of the new terms.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               8. Contact
//             </h2>
//             <p>
//               If you have any questions, reach out to us at{" "}
//               <a
//                 href="mailto:support@jobneura.com"
//                 className="text-indigo-600 underline"
//               >
//                 support@jobneura.com
//               </a>
//               .
//             </p>
//           </div>
//         </section>
//       </div>
//     </AuthLayout>
//   );
// }

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
