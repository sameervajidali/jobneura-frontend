import React, { useState, useEffect } from "react";
import JobFilters from "../components/jobs/JobFilters";
import JobList from "../components/jobs/JobList";
import Pagination from "../components/ui/Pagination";
// import JobDetailsModal from "../components/jobs/JobDetailsModal";
import API from "../services/axios";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      // Pass filters & page to backend
      const res = await API.get("/jobs", { params: { ...filters, page } });
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    }
    fetchJobs();
  }, [filters, page]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Dream Job</h1>
      <JobFilters filters={filters} setFilters={setFilters} />
      <JobList jobs={jobs} onSelect={setSelectedJob} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
