// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";


export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-auto">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}