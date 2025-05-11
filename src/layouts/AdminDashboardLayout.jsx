// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    //  <div className="flex h-screen overflow-hidden">
    //   {/* SidebarNav handles hamburger + off-canvas */}
    //   <SidebarNav />

    //   {/* Main content area */}
    //   <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-y-auto">
    //     {/* Topbar: greeting, notifications, theme toggle, avatar menu */}
    //     <Topbar />

    //     {/* Page content wrapper */}
    //     <main className="flex-1 p-4 sm:px-6 lg:px-8">
    //       {/* Outlet renders the matched /admin route */}
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <div className="flex h-screen overflow-hidden">
      {/* SidebarNav handles hamburger + off-canvas */}
      <SidebarNav />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        {/* Topbar: greeting, notifications, theme toggle, avatar menu */}
        <Topbar />

        {/* Page content wrapper */}
        <main className="flex-1 p-4 sm:px-6 lg:px-8">
          {/* Outlet renders the matched /admin route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
