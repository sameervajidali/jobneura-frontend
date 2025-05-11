// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 1) Sidebar (fixed width, always visible) */}
      <SidebarNav />

      {/* 2) Main column */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 2a) Topbar (sticky height) */}
        <Topbar />

        {/* 2b) Scrollable content area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
