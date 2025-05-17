

// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* fixed sidebar */}
      <SidebarNav />

      {/* content column shifted right by sidebar width on md+ */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-56">
        {/* topbar always across the top */}
        <Topbar />

        {/* main content area with its own padding */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
