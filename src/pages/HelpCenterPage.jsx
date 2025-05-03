
// import React, { useState } from "react";
// import {
//   Search,
//   MessageSquare,
//   Info,
//   Mail,
//   BookOpen,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// export default function HelpCenterPage() {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 scroll-smooth">
//       <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
//         Help Center
//       </h1>
//       <p className="text-center text-gray-600 mb-8 text-sm">
//         Find answers to common questions or reach out to our support team.
//       </p>

//       {/* Search */}
//       <div className="relative mb-6">
//         <Search className="absolute top-3.5 left-4 text-gray-400 w-5 h-5" />
//         <input
//           type="text"
//           placeholder="Search help topics..."
//           className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//         />
//       </div>

//       {/* Section Navigation */}
//       <div className="flex gap-4 justify-center mb-10 text-sm font-medium text-gray-600">
//         <a href="#faqs" className="hover:text-indigo-600 transition">FAQs</a>
//         <a href="#contact" className="hover:text-indigo-600 transition">Contact Support</a>
//       </div>

//       {/* Help Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
//         <HelpCard
//           icon={<Info className="w-6 h-6 text-indigo-600" />}
//           title="Getting Started"
//           desc="Learn how to set up your account and begin using JobNeura."
//         />
//         <HelpCard
//           icon={<BookOpen className="w-6 h-6 text-indigo-600" />}
//           title="Quizzes & Jobs"
//           desc="Understand how to take quizzes and apply for jobs."
//         />
//         <HelpCard
//           icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
//           title="FAQs"
//           desc="Find quick answers to frequently asked questions."
//         />
//         <HelpCard
//           icon={<Mail className="w-6 h-6 text-indigo-600" />}
//           title="Contact Support"
//           desc="Need more help? Reach out to our friendly support team."
//         />
//       </div>

//       {/* FAQs */}
//       <div id="faqs" className="scroll-mt-24">
//         <FAQSection />
//       </div>

//       {/* Contact Form */}
//       <div id="contact" className="scroll-mt-24">
//         <ContactSupportForm />
//       </div>
//     </div>
//   );
// }

// function HelpCard({ icon, title, desc }) {
//   return (
//     <div className="p-6 border rounded-xl hover:shadow-md transition bg-white">
//       <div className="flex items-center gap-3 mb-3">
//         {icon}
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//       </div>
//       <p className="text-sm text-gray-600">{desc}</p>
//     </div>
//   );
// }

// function FAQSection() {
//   const faqs = [
//     {
//       question: "How do I create an account?",
//       answer:
//         "Click the Sign Up button on the top right and fill in your details. You'll receive a confirmation email to activate your account.",
//     },
//     {
//       question: "How can I take quizzes on JobNeura?",
//       answer:
//         "Navigate to the Quiz section, choose a category, and start any available quiz.",
//     },
//     {
//       question: "Can I apply for jobs directly through JobNeura?",
//       answer:
//         "Yes, you can apply to jobs listed on JobNeura. Clicking 'Apply' redirects you to the original job portal.",
//     },
//     {
//       question: "What should I do if I forget my password?",
//       answer:
//         "Click 'Forgot Password' on the login page. You'll receive a reset link via your registered email.",
//     },
//   ];

//   return (
//     <div className="mb-12">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">FAQs</h2>
//       <div className="space-y-4">
//         {faqs.map((faq, index) => (
//           <FAQItem key={index} question={faq.question} answer={faq.answer} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function FAQItem({ question, answer }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border rounded-xl p-4 bg-white transition">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex justify-between w-full text-left items-center"
//       >
//         <span className="font-medium text-gray-800">{question}</span>
//         {open ? (
//           <ChevronUp className="w-5 h-5 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-5 h-5 text-gray-500" />
//         )}
//       </button>
//       {open && <p className="mt-2 text-sm text-gray-600">{answer}</p>}
//     </div>
//   );
// }

// function ContactSupportForm() {
//   return (
//     <div className="mt-12 border-t pt-10">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Support</h2>
//       <p className="text-sm text-gray-600 mb-6">
//         Need further help? Send us a message and we’ll get back to you.
//       </p>
//       <form className="space-y-4 max-w-xl">
//         <input
//           type="text"
//           placeholder="Your Name"
//           className="w-full px-4 py-3 border rounded-xl text-sm"
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           className="w-full px-4 py-3 border rounded-xl text-sm"
//         />
//         <textarea
//           placeholder="How can we help you?"
//           rows={4}
//           className="w-full px-4 py-3 border rounded-xl text-sm"
//         />
//         <button
//           type="submit"
//           className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm hover:bg-indigo-700 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  Search,
  MessageSquare,
  Info,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function HelpCenterPage() {
  const [visibleSection, setVisibleSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSectionClick = (section) => {
    setVisibleSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">Help Center</h1>
      <p className="text-center text-gray-500 text-base mb-12">
        Find answers to common questions, or reach out to our support team.
      </p>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute top-3.5 left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>

      {/* Help Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <HelpCard
          icon={<Info className="w-5 h-5 text-indigo-600" />}
          title="Getting Started"
          desc="Learn how to set up your account and begin using JobNeura."
          open={visibleSection === "getting-started"}
          onClick={() => handleSectionClick("getting-started")}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            After signing up, complete your profile. You'll then be guided to start quizzes and explore jobs tailored to your skill set.
          </p>
        </HelpCard>

        <HelpCard
          icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
          title="Quizzes & Jobs"
          desc="Understand how to take quizzes and apply for jobs."
          open={visibleSection === "quizzes"}
          onClick={() => handleSectionClick("quizzes")}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Navigate to the Quizzes section, choose a category, and begin. Job applications redirect to the official site via the "Apply" button.
          </p>
        </HelpCard>

        <HelpCard
          icon={<MessageSquare className="w-5 h-5 text-indigo-600" />}
          title="FAQs"
          desc="Find quick answers to frequently asked questions."
          open={visibleSection === "faqs"}
          onClick={() => handleSectionClick("faqs")}
        >
          <FAQSection searchQuery={searchQuery} />
        </HelpCard>

        <HelpCard
          icon={<Mail className="w-5 h-5 text-indigo-600" />}
          title="Contact Support"
          desc="Need help? Reach out to our friendly support team."
          open={visibleSection === "contact"}
          onClick={() => handleSectionClick("contact")}
        >
          <ContactSupportForm />
        </HelpCard>
      </div>
    </div>
  );
}

function HelpCard({ icon, title, desc, children, open, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-indigo-50">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Expanded Section */}
      {open && <div className="mt-5 border-t pt-5">{children}</div>}
    </div>
  );
}

function FAQSection({ searchQuery }) {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the Sign Up button and complete your details. You'll get a confirmation email.",
    },
    {
      question: "How can I take quizzes?",
      answer:
        "Go to the Quizzes section, select a topic, and click Start Quiz.",
    },
    {
      question: "Can I apply for jobs directly?",
      answer:
        "Yes! Clicking the Apply button redirects you to the job's official website.",
    },
    {
      question: "I forgot my password. What do I do?",
      answer:
        "Use the 'Forgot Password' link on the login page to reset via email.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, idx) => (
          <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h4 className="font-medium text-gray-900">{faq.question}</h4>
            <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
}

function ContactSupportForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
