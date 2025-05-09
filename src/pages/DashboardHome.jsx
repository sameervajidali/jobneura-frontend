// src/pages/DashboardHome.jsx

import React from "react";
import WelcomePanel from "../components/dashboard/WelcomePanel";
import StatsCards from "../components/dashboard/StatsCards"; // your 4-cards row
import CareerSnapshot from "../components/dashboard/CareerSnapshot";

export default function DashboardHome() {
  return (
    <div className="flex flex-col">
      {/* 1) Constrain width & horizontal padding */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* 2) Top margin to push below topbar */}
        <div className="pt-6">
          {/* Welcome and profile completion */}
          <WelcomePanel />
          {/* Spacing to next row */}
          <div className="mt-8">
            <StatsCards />
          </div>
        </div>
      </div>

      {/* 3) Career snapshot should also live inside the same container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
        <CareerSnapshot />
      </div>
    </div>
  );
}
