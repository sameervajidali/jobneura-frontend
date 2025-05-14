import React, { useState, useEffect } from "react";
import JobTable from "@/components/admin/jobs/JobTable";
import JobForm from "@/components/admin/jobs/JobForm";
import JobUploadModal from "@/components/admin/jobs/JobUploadModal";
import { Button } from "@/components/ui/button";
import jobService from "@/services/jobService";
import { PlusCircle, Upload } from "lucide-react";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const loadJobs = () => jobService.getAll().then(setJobs).catch(console.error);

  useEffect(() => { loadJobs(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Job Listings (Admin)</h1>
        <div className="space-x-2">
          <Button onClick={() => { setSelected(null); setOpenForm(true); }}>
            <PlusCircle className="w-4 h-4 mr-2" /> Add Job
          </Button>
          <Button variant="secondary" onClick={() => setOpenUpload(true)}>
            <Upload className="w-4 h-4 mr-2" /> Bulk Upload
          </Button>
        </div>
      </div>

      <JobTable jobs={jobs} onEdit={(job) => { setSelected(job); setOpenForm(true); }} onRefresh={loadJobs} />

      <JobForm open={openForm} onClose={() => setOpenForm(false)} initialData={selected} onSuccess={loadJobs} />
      <JobUploadModal open={openUpload} onClose={() => setOpenUpload(false)} onSuccess={loadJobs} />
    </div>
  );
}
