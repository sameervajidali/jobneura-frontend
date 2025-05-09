// // src/components/dashboard/WelcomePanel.jsx
// import React from "react";
// import { CircleUserRound } from "lucide-react";

// export default function WelcomePanel() {
//   const userName = "Vajid"; // This should be dynamic in real app
//   const profileCompletion = 65;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800">Welcome back, {userName} 👋</h2>
//         <p className="text-sm text-gray-500 mt-1">Let's continue leveling up your career!</p>
//         <div className="mt-4">
//           <div className="flex justify-between text-sm mb-1">
//             <span className="text-gray-600">Profile Completion</span>
//             <span className="text-gray-600">{profileCompletion}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-indigo-600 h-2 rounded-full"
//               style={{ width: `${profileCompletion}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//       <div className="hidden sm:block">
//         <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
//           <CircleUserRound className="text-indigo-600 w-8 h-8" />
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/dashboard/WelcomePanel.jsx
import React, { useMemo } from "react";
import { CircleUserRound } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

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
      return (
        val !== null &&
        val !== undefined &&
        String(val).trim().length > 0
      );
    }).length;
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
  }, [user]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome back, {firstName} 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Let’s keep your profile sharp and your skills growing!
        </p>

        <div className="mt-4 max-w-sm">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">
              Profile Completion
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {completion}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-400 h-2"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Your avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <CircleUserRound className="text-indigo-600 dark:text-indigo-100 w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
}
