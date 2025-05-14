// src/pages/admin/jobs/AdminJobsPage.jsx
import React, { useState } from "react";
import JobAdminPanel from "@/components/admin/jobs/JobAdminPanel";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";

export default function AdminJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");

  return (
    <div className="p-6 space-y-4">
      {/* Header with Search, Page Size & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Job Listings (Admin)</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            className="w-64"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[76px]">{pageSize}</SelectTrigger>
            <SelectContent>
              {["10", "25", "50", "100"].map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="default" onClick={() => {/* Open Add Job modal */}}>
            <PlusCircle className="w-4 h-4 mr-2" /> Add Job
          </Button>
          <Button variant="outline" onClick={() => {/* Open Bulk Upload modal */}}>
            <Upload className="w-4 h-4 mr-2" /> Bulk Upload
          </Button>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-lg shadow">
        <JobAdminPanel searchTerm={searchTerm} pageSize={Number(pageSize)} />
      </div>
    </div>
  );
}
