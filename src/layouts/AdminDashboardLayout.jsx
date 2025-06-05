import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  // State to track sidebar open or closed
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Automatically adjust sidebar open state on window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // close sidebar on small screens by default
      } else {
        setSidebarOpen(true); // open sidebar on desktop by default
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar with controlled open state */}
      <SidebarNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />

      {/* Main content area shifts right when sidebar is open */}
      <div
        className={`
          flex-1 flex flex-col min-w-0 transition-all duration-300
          ${sidebarOpen ? "md:ml-56" : "md:ml-14"}
        `}
      >
        {/* Topbar with sidebar toggle control */}
        <Topbar onSidebarToggle={() => setSidebarOpen((o) => !o)} sidebarOpen={sidebarOpen} />

        {/* Main outlet for routed content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
