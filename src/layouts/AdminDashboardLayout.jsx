// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ─── Sidebar ─────────────────────────────────────── */}
      <SidebarNav />

      {/* ─── Main Column ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* fixed-height topbar */}
        <Topbar />

        {/* 
          Only this <main> scrolls.
          p-6 gives you 24px on all sides; adjust to your taste 
        */}
        <main className="flex-1 overflow-auto p-6">
          {/* 
            Constrain inner content to max width,
            center it, and maintain full width down to small screens 
          */}
          <div className="max-w-screen-xl w-full mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
