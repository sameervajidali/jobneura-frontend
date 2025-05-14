import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import seoService from "@/services/seoService";

export default function SeoMetaForm({ open, onClose, initialData, onSuccess }) {
  const [form, setForm] = useState({
    path: "",
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogImage: "",
    twitterCard: "",
    robots: { index: true, follow: true },
    jsonLd: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        keywords: initialData.keywords?.join(", ") || "",
      });
    } else {
      setForm({
        path: "",
        title: "",
        description: "",
        keywords: "",
        ogTitle: "",
        ogImage: "",
        twitterCard: "",
        robots: { index: true, follow: true },
        jsonLd: ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleToggle = (field) => {
    setForm((f) => ({
      ...f,
      robots: { ...f.robots, [field]: !f.robots[field] }
    }));
  };

  const handleSubmit = async () => {
    const data = { ...form, keywords: form.keywords.split(",").map(k => k.trim()) };
    await seoService.save(data);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit SEO Meta" : "Add SEO Meta"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <Input name="path" value={form.path} onChange={handleChange} placeholder="/about" />
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Page Title" />
          <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Meta description" />
          <Input name="keywords" value={form.keywords} onChange={handleChange} placeholder="keyword1, keyword2" />
          <Input name="ogTitle" value={form.ogTitle} onChange={handleChange} placeholder="OG Title" />
          <Input name="ogImage" value={form.ogImage} onChange={handleChange} placeholder="https://image.url" />
          <Input name="twitterCard" value={form.twitterCard} onChange={handleChange} placeholder="summary_large_image" />
          <div className="flex gap-4">
            <Button type="button" onClick={() => handleToggle("index")} variant={form.robots.index ? "default" : "outline"}>
              {form.robots.index ? "Indexing: ON" : "Indexing: OFF"}
            </Button>
            <Button type="button" onClick={() => handleToggle("follow")} variant={form.robots.follow ? "default" : "outline"}>
              {form.robots.follow ? "Follow: ON" : "Follow: OFF"}
            </Button>
          </div>
          <Textarea name="jsonLd" value={form.jsonLd} onChange={handleChange} placeholder="Paste JSON-LD Schema (optional)" rows={6} />
          <Button onClick={handleSubmit}>Save SEO</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
