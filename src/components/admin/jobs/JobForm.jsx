import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import jobService from "@/services/jobService";

export default function JobForm({ open, onClose, initialData, onSuccess }) {
  const [form, setForm] = useState({
    title: "", company: "", location: "",
    workType: "Remote", jobType: "Full-time",
    skills: "", salaryRange: "", applyLink: "", source: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        skills: initialData.skills?.join(", ") || ""
      });
    } else {
      setForm({
        title: "", company: "", location: "",
        workType: "Remote", jobType: "Full-time",
        skills: "", salaryRange: "", applyLink: "", source: ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim())
      };
      if (initialData) {
        await jobService.update(initialData._id, payload);
      } else {
        await jobService.create(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Job save failed:", err);
      alert("Failed to save job. Check console.");
    }
  };

  const fields = [
    { label: "Job Title", name: "title" },
    { label: "Company", name: "company" },
    { label: "Location", name: "location" },
    { label: "Work Type", name: "workType" },
    { label: "Job Type", name: "jobType" },
    { label: "Skills (comma-separated)", name: "skills" },
    { label: "Salary Range", name: "salaryRange" },
    { label: "Apply Link", name: "applyLink" },
    { label: "Source", name: "source" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {initialData ? "Edit Job" : "Post a New Job"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ label, name }) => (
              <div key={name} className="flex flex-col">
                <Label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="w-fit px-6 py-2 text-sm">
              {initialData ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
