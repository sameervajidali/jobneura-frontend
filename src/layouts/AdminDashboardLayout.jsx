// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

// Keep this width the SAME as your sidebar (w-56 = 14rem)
const SIDEBAR_WIDTH = "w-56"; // or 224px

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - fixed */}
      <SidebarNav />

      {/* Main area */}
      <div className={`flex-1 flex flex-col min-w-0 ml-0 md:ml-56`}>
        {/* Topbar */}
        <Topbar />
        {/* Main content with padding */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
