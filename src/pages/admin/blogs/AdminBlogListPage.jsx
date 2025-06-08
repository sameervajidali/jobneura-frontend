import React, { useEffect, useState } from "react";
import blogService from "../../../services/blogService";
import { format } from "date-fns";
import BlogCategoryFilter from "./components/BlogCategoryFilter";
import BlogStatusFilter from "./components/BlogStatusFilter";
import BlogSearchInput from "./components/BlogSearchInput";
import BlogPagination from "./components/BlogPagination";
import BulkActionsToolbar from "./components/BulkActionsToolbar";
import AdminBlogPreviewModal from "./components/AdminBlogPreviewModal";
import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils"; // if you use a classnames util

export default function AdminBlogListPage() {
  // --- STATE ---
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewPost, setPreviewPost] = useState(null);

  // --- LOAD POSTS ---
  useEffect(() => {
    setLoading(true);
    setError("");
    blogService
      .list(filters)
      .then((data) => {
        setPosts(data.posts || []);
        setTotal(data.count || 0);
      })
      .catch((err) =>
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to load blog posts"
        )
      )
      .finally(() => setLoading(false));
  }, [filters]);

  // --- BULK ACTIONS ---
  function handleBulkDelete() {
    if (!window.confirm("Delete selected posts?")) return;
    Promise.all([...selected].map((id) => blogService.delete(id)))
      .then(() => {
        setSelected(new Set());
        setFilters((f) => ({ ...f })); // reload
      })
      .catch(() => alert("Failed to delete selected posts"));
  }

  // --- TABLE UI ---
  return (
    <section className="p-4 md:p-8 max-w-screen-2xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <div className="flex flex-wrap gap-2">
          <BlogCategoryFilter
            value={filters.category}
            onChange={(val) =>
              setFilters((f) => ({ ...f, category: val, page: 1 }))
            }
          />
          <BlogStatusFilter
            value={filters.status}
            onChange={(val) =>
              setFilters((f) => ({ ...f, status: val, page: 1 }))
            }
          />
          <BlogSearchInput
            value={filters.search}
            onChange={(val) =>
              setFilters((f) => ({ ...f, search: val, page: 1 }))
            }
          />
        </div>

        <button
          className="btn btn-primary ml-auto"
          onClick={() => (window.location.href = "/admin/blogs/new")}
        >
          <FaPlus className="mr-2" />
          New Post
        </button>
      </header>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <BulkActionsToolbar
          count={selected.size}
          onDelete={handleBulkDelete}
          onClear={() => setSelected(new Set())}
        />
      )}

      {/* Loading/Error/Empty */}
      {loading ? (
        <div className="text-center p-10">Loading posts…</div>
      ) : error ? (
        <div className="text-center text-red-600 p-10">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 p-10">
          No blog posts found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
              <tr>
                <th className="p-3 w-4">
                  <input
                    type="checkbox"
                    checked={selected.size === posts.length}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? new Set(posts.map((p) => p._id))
                          : new Set()
                      )
                    }
                  />
                </th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Published</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <BlogTableRow
                  key={post._id}
                  post={post}
                  selected={selected.has(post._id)}
                  onSelect={(id) => {
                    setSelected((prev) => {
                      const next = new Set(prev);
                      next.has(id) ? next.delete(id) : next.add(id);
                      return next;
                    });
                  }}
                  onPreview={setPreviewPost}
                  onEdit={(post) => navigate(`/admin/blogs/edit/${post._id}`)}
                  onDelete={async (post) => {
                    if (window.confirm(`Delete "${post.title}"?`)) {
                      await blogService.delete(post._id);
                      setFilters((f) => ({ ...f })); // reload
                    }
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {total > filters.limit && (
        <div className="mt-4">
          <BlogPagination
            page={filters.page}
            limit={filters.limit}
            total={total}
            onChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </div>
      )}

      {/* Preview Modal */}
      {previewPost && (
        <AdminBlogPreviewModal
          post={previewPost}
          onClose={() => setPreviewPost(null)}
        />
      )}
    </section>
  );
}
