import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import jobService from "@/services/jobService";

export default function JobTable({ jobs, onEdit, onRefresh }) {
  const handleDelete = async (id) => {
    if (confirm("Delete this job?")) {
      await jobService.remove(id);
      onRefresh();
    }
  };

  return (
    <div className="rounded-md overflow-x-auto shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Company</th>
            <th className="p-3">Location</th>
            <th className="p-3">Type</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="border-b">
              <td className="p-3">{job.title}</td>
              <td className="p-3">{job.company}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3">{job.jobType}</td>
              <td className="p-3 text-right space-x-2">
                <Button size="sm" onClick={() => onEdit(job)}><Pencil className="w-4 h-4" /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(job._id)}><Trash className="w-4 h-4" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
