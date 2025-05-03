// src/pages/DashboardHome.jsx
import React from "react";
import WelcomePanel from "../components/dashboard/WelcomePanel";
import QuickStats    from "../components/dashboard/QuickStats";
import CareerSnapshot from "../components/dashboard/CareerSnapshot";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <WelcomePanel />
      <QuickStats />
      <CareerSnapshot />
    </div>
  );
}
