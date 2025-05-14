import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jobService from "@/services/jobService";

export default function JobUploadModal({ open, onClose, onSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await jobService.bulkUpload(formData);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Bulk Upload Jobs</DialogTitle></DialogHeader>
        <Input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
        <Button onClick={handleUpload} disabled={!file}>Upload</Button>
      </DialogContent>
    </Dialog>
  );
}
