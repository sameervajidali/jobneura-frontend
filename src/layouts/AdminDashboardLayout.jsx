import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  // Sidebar open/close state for all screen sizes
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar: pass isOpen and toggle callback */}
      <SidebarNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />

      {/* Content area: adjusts margin based on sidebar state */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300
          ${sidebarOpen ? "md:ml-56" : "md:ml-0"}
        `}
      >
        {/* Pass sidebar toggle button control inside topbar or add here */}
        <Topbar onSidebarToggle={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
