// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar (fixed, always visible on md+) */}
      <SidebarNav />

      {/* Content shifts right by sidebar on desktop, full width on mobile */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-200 md:ml-56">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
