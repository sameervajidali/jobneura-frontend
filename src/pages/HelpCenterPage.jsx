
// src/pages/admin/HelpCenterPage.jsx
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
import { createTicket } from "../services/ticketService"; // adjust import path

export default function HelpCenterPage() {
  const [visibleSection, setVisibleSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (section) =>
    setVisibleSection((v) => (v === section ? null : section));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-500">
          Find answers to common questions or create a support ticket.
        </p>
      </header>

      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      {/* Help Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <HelpCard
          icon={<Info className="w-5 h-5 text-indigo-600" />}
          title="Getting Started"
          desc="How to set up your account"
          open={visibleSection === "getting-started"}
          onClick={() => toggle("getting-started")}
        >
          <p className="text-gray-600 leading-relaxed text-sm">
            After signing up, complete your profile, then explore quizzes and
            job listings customized for your skills.
          </p>
        </HelpCard>

        <HelpCard
          icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
          title="Quizzes & Jobs"
          desc="Taking quizzes and applying"
          open={visibleSection === "quizzes"}
          onClick={() => toggle("quizzes")}
        >
          <p className="text-gray-600 leading-relaxed text-sm">
            Go to the Quizzes tab, pick a category, and click Start Quiz.
            Complete quizzes to see personalized job matches, then hit Apply to
            go to the job portal.
          </p>
        </HelpCard>

        <HelpCard
          icon={<MessageSquare className="w-5 h-5 text-indigo-600" />}
          title="FAQs"
          desc="Frequently asked questions"
          open={visibleSection === "faqs"}
          onClick={() => toggle("faqs")}
        >
          <FAQSection searchQuery={searchQuery} />
        </HelpCard>

        <HelpCard
          icon={<Mail className="w-5 h-5 text-indigo-600" />}
          title="Contact Support"
          desc="Submit a support ticket"
          open={visibleSection === "contact"}
          onClick={() => toggle("contact")}
        >
          <ContactSupportForm />
        </HelpCard>
      </div>
    </div>
  );
}

function HelpCard({ icon, title, desc, children, open, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between p-6"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-50 rounded-full">{icon}</div>
          <div className="text-left">
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

      {open && <div className="p-6 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function FAQSection({ searchQuery }) {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click Sign Up, enter your details, and verify via the email link.",
    },
    {
      question: "How can I take quizzes?",
      answer:
        "Visit the Quizzes page, select a topic, and press Start Quiz.",
    },
    {
      question: "I forgot my password, what now?",
      answer:
        "Use Forgot Password on the login screen, and follow the email reset link.",
    },
  ];
  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filtered.length ? (
    filtered.map((f, i) => (
      <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-1">
        <h4 className="font-medium text-gray-900">{f.question}</h4>
        <p className="text-sm text-gray-600">{f.answer}</p>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">No matching FAQs.</p>
  );
}

function ContactSupportForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });
    try {
      await createTicket(form); // e.g. POST /admin/tickets
      setStatus({ loading: false, message: "Ticket submitted successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        message: err.response?.data?.message || "Submission failed.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto text-sm"
    >
      {status.message && (
        <p
          className={`p-2 rounded ${
            status.message.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </p>
      )}

      {["name", "email", "subject"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          required
          disabled={status.loading}
          className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      ))}

      <textarea
        name="description"
        placeholder="Describe your issue"
        rows={4}
        value={form.description}
        onChange={handleChange}
        required
        disabled={status.loading}
        className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />

      <button
        type="submit"
        disabled={status.loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {status.loading ? "Submitting…" : "Submit Ticket"}
      </button>
    </form>
  );
}









