
// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';

/**
 * AdminLayout: wraps all /admin routes with a responsive sidebar and content area.
 * - On md+ screens: sidebar is fixed on the left (w-56), content is shifted over.
 * - On smaller screens: sidebar is off-canvas, toggled by hamburger in SidebarNav, content is full width.
 */
export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SidebarNav handles its own mobile toggle and overlay */}
      <SidebarNav />

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-y-auto"
        // on md+ we add left margin equal to sidebar width (w-56)
        style={{ marginLeft: '0', minHeight: '100vh' }}
      >
        {/* Push content under the header if you have one */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Outlet will render the matched admin route component */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
