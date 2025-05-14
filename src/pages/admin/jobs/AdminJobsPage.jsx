// src/pages/admin/jobs/AdminJobsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Upload, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import jobService from "@/services/jobService";
import JobForm from "@/components/admin/jobs/JobForm";
import JobUploadModal from "@/components/admin/jobs/JobUploadModal";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const WORK_TYPES = ["Remote", "Hybrid", "Onsite"];
const STATUS_TYPES = ["published", "draft", "archived"];

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [workType, setWorkType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selected, setSelected] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { jobs: data, total: count } = await jobService.getAllAdmin({
        search,
        jobType,
        workType,
        status,
        page,
        limit
      });
      setJobs(data);
      setTotal(count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, jobType, workType, status, page, limit]);

  const handleDelete = async (id) => {
    if (confirm("Delete this job?")) {
      await jobService.remove(id);
      fetchJobs();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Listings (Admin)</h1>
        <div className="flex gap-2">
          <Button onClick={() => { setSelected(null); setOpenForm(true); }}>
            <PlusCircle className="w-4 h-4 mr-1" /> Add Job
          </Button>
          <Button variant="outline" onClick={() => setOpenUpload(true)}>
            <Upload className="w-4 h-4 mr-1" /> Bulk Upload
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Input
          className="w-64"
          placeholder="Search jobs..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <Select
          value={jobType || "all"}
          onValueChange={val => { setJobType(val === "all" ? "" : val); setPage(1); }}
        >
          <SelectTrigger className="w-[160px]">Job Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {JOB_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select
          value={workType || "all"}
          onValueChange={val => { setWorkType(val === "all" ? "" : val); setPage(1); }}
        >
          <SelectTrigger className="w-[160px]">Work Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {WORK_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select
          value={status || "all"}
          onValueChange={val => { setStatus(val === "all" ? "" : val); setPage(1); }}
        >
          <SelectTrigger className="w-[160px]">Status</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {STATUS_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
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
            ) : jobs.length > 0 ? (
              jobs.map(job => (
                <TableRow key={job._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-[200px] truncate">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.jobType}</Badge>
                    <Badge variant="outline" className="ml-1">{job.workType}</Badge>
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-1 max-w-[150px]">
                    {(job.skills || []).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </TableCell>
                  <TableCell><Badge variant={job.status === "published" ? "default" : "outline"}>{job.status || "-"}</Badge></TableCell>
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

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="ghost" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
        <span className="text-sm">Page {page} of {Math.ceil(total/limit)}</span>
        <Button variant="ghost" disabled={page*limit >= total} onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>

      {/* Modals */}
      <JobForm open={openForm} initialData={selected} onClose={() => setOpenForm(false)} onSuccess={fetchJobs} />
      <JobUploadModal open={openUpload} onClose={() => setOpenUpload(false)} onSuccess={fetchJobs} />
    </div>
  );
}
