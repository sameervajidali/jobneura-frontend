// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";  // <-- polished nav
import Topbar from "../components/navigation/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* SidebarNav is exactly the same component you use in /admin */}
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          {/* All child routes will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
