
// // src/layouts/AdminDashboardLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import SidebarNav from "../components/admin/SidebarNav";
// import Topbar     from "../components/admin/Topbar";

// export default function AdminDashboardLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* fixed sidebar */}
//       <SidebarNav />

//       {/* content column shifted right by sidebar width on md+ */}
//       <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-56">
//         {/* topbar always across the top */}
//         <Topbar />

//         {/* main content area with its own padding */}
//         <main className="flex-1 overflow-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// src/layouts/AdminDashboardLayout.jsx
import React from "react";
import SidebarNav from "../components/admin/SidebarNav";
import Topbar from "../components/admin/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* SidebarNav is fixed on md+, overlays on mobile */}
      <SidebarNav />

      {/* Main content area, shifts right on md+ for sidebar */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

