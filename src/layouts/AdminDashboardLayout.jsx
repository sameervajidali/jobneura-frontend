// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        {/* 
          pl-0 on mobile, pl-64 on md+  → reserves the sidebar width 
          px-4 .. px-8               → responsive gutters 
        */}
        <main className="flex-1 overflow-auto">
          <div className="pl-0 md:pl-64 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-screen-xl mx-auto space-y-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
