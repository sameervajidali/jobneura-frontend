import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import seoService from "@/services/seoService";

export default function SeoMetaTable({ entries, onEdit, onRefresh }) {
  const handleDelete = async (path) => {
    if (confirm(`Delete SEO meta for ${path}?`)) {
      await seoService.delete(path);
      onRefresh();
    }
  };

  return (
    <div className="rounded-md shadow overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Path</th>
            <th className="p-3">Title</th>
            <th className="p-3">Updated At</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id} className="border-b">
              <td className="p-3 font-mono text-xs">{entry.path}</td>
              <td className="p-3">{entry.title}</td>
              <td className="p-3">{new Date(entry.updatedAt).toLocaleString()}</td>
              <td className="p-3 text-right space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(entry)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(entry.path)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
