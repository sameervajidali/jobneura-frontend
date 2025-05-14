import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jobService from "@/services/jobService";

export default function JobForm({ open, onClose, initialData, onSuccess }) {
  const [form, setForm] = useState({
    title: "", company: "", location: "",
    workType: "Remote", jobType: "Full-time",
    skills: "", salaryRange: "", applyLink: "", source: ""
  });

  useEffect(() => {
    setForm(initialData ? {
      ...initialData,
      skills: initialData.skills?.join(", ") || ""
    } : {
      title: "", company: "", location: "",
      workType: "Remote", jobType: "Full-time",
      skills: "", salaryRange: "", applyLink: "", source: ""
    });
  }, [initialData]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const payload = { ...form, skills: form.skills.split(",").map(s => s.trim()) };
    initialData ? await jobService.update(initialData._id, payload) : await jobService.create(payload);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>{initialData ? "Edit" : "Add"} Job</DialogTitle></DialogHeader>
        <div className="grid gap-3">
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" />
          <Input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
          <Input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
          <Input name="workType" value={form.workType} onChange={handleChange} />
          <Input name="jobType" value={form.jobType} onChange={handleChange} />
          <Input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js" />
          <Input name="salaryRange" value={form.salaryRange} onChange={handleChange} placeholder="e.g. ₹8–10L" />
          <Input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="External Apply Link" />
          <Input name="source" value={form.source} onChange={handleChange} placeholder="LinkedIn / Manual / Indeed" />
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
