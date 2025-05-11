// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/*  ─── SidebarNav is fixed at w-56 ───────────────────── */}
      <SidebarNav />

      {/*  ─── Right side: Topbar + scrollable main ──────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        {/* 
          ─── On desktop (md+), we pad the left by exactly 56 so 
          the fixed-sidebar never covers our content.
          On mobile, pl-0 so when sidebar slides in it simply overlays.
        */}
        <main className="flex-1 overflow-auto pt-4 px-6 pb-6 md:pl-56 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
