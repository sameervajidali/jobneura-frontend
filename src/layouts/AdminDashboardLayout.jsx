// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 1. Sidebar: fixed width, full height */}
      <SidebarNav />

      {/* 2. Main column: takes remaining width, flexes vertically */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 2a. Topbar: fixed height */}
        <Topbar />

        {/* 2b. Content area: flex-1 so it grows to fill leftover height;
                 overflow-auto so only this scrolls */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
