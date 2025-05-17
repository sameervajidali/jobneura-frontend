import { Plus, Lightbulb, PencilLine } from "lucide-react";

const ACTIONS = [
  {
    icon: <Plus className="w-7 h-7 text-indigo-500" />,
    label: "Browse Quizzes",
    cta: "Start Learning",
    ctaColor: "from-indigo-500 to-purple-500",
    onClick: () => window.scrollTo({ top: 500, behavior: "smooth" }),
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-blue-500" />,
    label: "Suggest Topic",
    cta: "Suggest Topic",
    ctaColor: "from-blue-500 to-cyan-500",
    onClick: () => alert("Show Suggest Topic modal!"), // Replace with your handler
  },
  {
    icon: <PencilLine className="w-7 h-7 text-green-500" />,
    label: "Create Quiz",
    cta: "Create Quiz",
    ctaColor: "from-green-500 to-emerald-400",
    onClick: () => alert("Show Create Quiz modal!"), // Replace with your handler
  },
];

export default function QuizQuickActions() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-stretch">
      {ACTIONS.map((a, i) => (
        <div
          key={i}
          className={`
            flex-1 min-w-[210px] flex flex-col items-center px-5 py-5 rounded-2xl
            border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900
            shadow-sm hover:shadow-md transition-all duration-150
          `}
        >
          {a.icon}
          <div className="font-medium text-gray-900 dark:text-gray-100 mt-2 mb-1 text-base">{a.label}</div>
          {/* Optional: <div className="text-xs text-gray-500 mb-3 text-center"></div> */}
          <button
            className={`mt-3 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${a.ctaColor} shadow hover:scale-105 transition-transform`}
            onClick={a.onClick}
          >
            {a.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
