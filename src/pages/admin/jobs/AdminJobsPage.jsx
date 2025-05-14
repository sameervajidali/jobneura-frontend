// src/pages/admin/jobs/AdminJobsPage.jsx
import React from "react";
import JobAdminPanel from "@/components/admin/jobs/JobAdminPanel";

export default function AdminJobsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <JobAdminPanel />
    </div>
  );
}
