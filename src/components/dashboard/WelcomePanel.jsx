// src/components/dashboard/WelcomePanel.jsx
import React, { useMemo } from "react";
import { CircleUserRound } from "lucide-react";
import { useAuth,navigate } from "../../contexts/AuthContext";

const PROFILE_FIELDS = [
  "name",
  "email",
  "phone",
  "location",
  "bio",
  "website",
  "linkedin",
  "avatar",
  "resume",
];

export default function WelcomePanel() {
  const { user } = useAuth();

  // Greet by first name
  const firstName = useMemo(
    () => user?.name?.split(" ")[0] || "there",
    [user?.name]
  );

  // Compute profile completion percentage
  const completion = useMemo(() => {
    if (!user) return 0;
    const filled = PROFILE_FIELDS.filter((key) => {
      const val = user[key];
      return val && String(val).trim().length > 0;
    }).length;
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
  }, [user]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Left Content */}
      <div className="flex-1 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome back, {firstName} 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Let’s keep your profile sharp and your skills growing!
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-2 bg-indigo-600 dark:bg-indigo-400 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {completion < 100 && (
          <button
          onClick={() => navigate("/dashboard/profile")}
          className="inline-block mt-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition"
        >
          Complete Your Profile
        </button>
        )}
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <CircleUserRound className="w-10 h-10 text-indigo-600 dark:text-indigo-100" />
          </div>
        )}
      </div>
    </div>
  );
}
