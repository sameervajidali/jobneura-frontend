// src/components/dashboard/WelcomePanel.jsx
import React from "react";
import { CircleUserRound } from "lucide-react";

export default function WelcomePanel() {
  const userName = "Vajid"; // This should be dynamic in real app
  const profileCompletion = 65;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Welcome back, {userName} 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Let's continue leveling up your career!</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Profile Completion</span>
            <span className="text-gray-600">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <CircleUserRound className="text-indigo-600 w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
