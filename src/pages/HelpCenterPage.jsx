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
