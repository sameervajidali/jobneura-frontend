// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar     from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* fixed 64px sidebar */}
      <SidebarNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-auto p-6">
          {/*
            - w-full: span full width of free space
            - max-w-screen-xl: cap at XL
            - mx-auto: center within its container
            - md:ml-64: push right by sidebar width on md+ so it never hides under sidebar 
          */}
          <div className="w-full max-w-screen-xl mx-auto md:ml-64 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
