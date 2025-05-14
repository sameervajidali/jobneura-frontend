import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SeoMetaTable from "@/components/admin/seo/SeoMetaTable.jsx";
import SeoMetaForm from "@/components/admin/seo/SeoMetaForm.jsx";
import seoService from "@/services/seoService.js";

export default function SeoManager() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    seoService.getAll().then(setEntries).catch(console.error);
  }, []);

  const refresh = () => seoService.getAll().then(setEntries);
  const handleEdit = (entry) => {
    setSelected(entry);
    setOpenForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">SEO Manager</h1>
        <Button onClick={() => { setSelected(null); setOpenForm(true); }}>
          <PlusCircle className="w-5 h-5 mr-2" /> Add Meta
        </Button>
      </div>

      <SeoMetaTable entries={entries} onEdit={handleEdit} onRefresh={refresh} />

      <SeoMetaForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        initialData={selected}
        onSuccess={() => { setOpenForm(false); refresh(); }}
      />
    </div>
  );
}
