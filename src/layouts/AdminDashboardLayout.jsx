// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";

export default function AdminDashboardLayout() {
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
