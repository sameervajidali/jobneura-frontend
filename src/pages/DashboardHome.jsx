// src/pages/DashboardHome.jsx
import React from "react";
import WelcomePanel from "../components/dashboard/WelcomePanel";
import StatsCards    from "../components/dashboard/StatsCards";
import CareerSnapshot from "../components/dashboard/CareerSnapshot";

export default function DashboardHome() {
  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="pt-6 space-y-8">
          <WelcomePanel />
          <StatsCards />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
        <CareerSnapshot />
      </div>
    </div>
  );
}
