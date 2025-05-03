// src/components/navigation/Topbar.jsx
import React from "react";
import { Bell, CircleUserRound } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4 border-b">
      <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <CircleUserRound className="w-6 h-6 text-gray-600" />
      </div>
    </header>
  );
}
