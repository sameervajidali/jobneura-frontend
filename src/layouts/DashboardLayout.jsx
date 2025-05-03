// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { Topbar }  from "../components/navigation/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
