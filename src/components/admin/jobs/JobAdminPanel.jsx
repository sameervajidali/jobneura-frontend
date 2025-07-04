// src/components/admin/jobs/JobAdminPanel.jsx
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Pencil, PlusCircle, Trash2, Upload } from "lucide-react";
import jobService from "@/services/jobService";
import { format } from "date-fns";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const WORK_TYPES = ["Remote", "Hybrid", "Onsite"];
const STATUS_TYPES = ["published", "draft", "archived"];

export default function JobAdminPanel() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", jobType: "", workType: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [ setSelected] = useState([]);
const [ setOpenForm] = useState(false);
const [ setOpenUpload] = useState(false);

 
   // 👇 Wrap fetchJobs in useCallback with correct dependencies
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await jobService.getAllAdmin({ ...filters, page, limit });
      setJobs(res);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  // 👇 Call fetchJobs in useEffect; dependency is just fetchJobs
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await jobService.remove(id);
      fetchJobs();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Job Listings (Admin)</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setSelected(null); setOpenForm(true); }}>
            <PlusCircle className="w-4 h-4 mr-2" /> Add Job
          </Button>
          <Button variant="secondary" onClick={() => setOpenUpload(true)}>
            <Upload className="w-4 h-4 mr-2" /> Bulk Upload
          </Button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Input
          className="w-full"
          placeholder="Search by title or company"
          value={filters.search}
          onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <Select
          value={filters.jobType || "all"}
          onValueChange={(val) => setFilters(f => ({ ...f, jobType: val === "all" ? "" : val }))}
        >
          <SelectTrigger className="w-full">Job Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {JOB_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select
          value={filters.workType || "all"}
          onValueChange={(val) => setFilters(f => ({ ...f, workType: val === "all" ? "" : val }))}
        >
          <SelectTrigger className="w-full">Work Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {WORK_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select
          value={filters.status || "all"}
          onValueChange={(val) => setFilters(f => ({ ...f, status: val === "all" ? "" : val }))}
        >
          <SelectTrigger className="w-full">Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {STATUS_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>

      <div className="overflow-x-auto rounded border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">Loading...</TableCell>
              </TableRow>
            ) : jobs?.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-[200px] truncate">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.jobType}</Badge>
                    <Badge variant="outline" className="ml-1">{job.workType}</Badge>
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-1 max-w-[150px]">
                    {(job.skills || []).map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === "published" ? "default" : "outline"}>{job.status || "-"}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(job.createdAt), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" onClick={() => { setSelected(job); setOpenForm(true); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(job._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">No jobs found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="ghost" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
        <span className="text-sm">Page {page}</span>
        <Button variant="ghost" disabled={jobs.length < limit} onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
