// src/pages/admin/TopicsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import topicService from "../../services/topicService";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadTopics = async () => {
    setLoading(true);
    try {
      const data = await topicService.getAllTopics();
      setTopics(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load topics:", err);
      setTopics([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      topics.filter(t => t.name.toLowerCase().includes(term))
    );
  }, [search, topics]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await topicService.deleteTopic(id);
      loadTopics();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Topics</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Input
              className="pl-10 pr-4 w-64"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="new">
            <Button>
              <FaPlus className="mr-2" /> New Topic
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filtered.length > 0 ? (
              filtered.map((t) => (
                <TableRow key={t._id} className="hover:bg-muted/50">
                  <TableCell className="px-6 py-4">{t.name}</TableCell>
                  <TableCell className="px-6 py-4">{t.category?.name || '-'}</TableCell>
                  <TableCell className="px-6 py-4 space-x-2">
                    <Link to={`${t._id}/edit`}> 
                      <Button size="icon" variant="outline">
                        <FaEdit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button size="icon" variant="destructive" onClick={() => handleDelete(t._id)}>
                      <FaTrash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No topics found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
