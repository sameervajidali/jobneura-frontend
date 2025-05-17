// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

// Set sidebar width variable
const SIDEBAR_WIDTH = "w-56"; // e.g., 14rem = 224px

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main section shifted right by sidebar width */}
      <div className={`flex-1 flex flex-col min-w-0 ${SIDEBAR_WIDTH.startsWith('w-') ? `ml-56` : ''}`}>
        <Topbar sidebarWidth={SIDEBAR_WIDTH} />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
