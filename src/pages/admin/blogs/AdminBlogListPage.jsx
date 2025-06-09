// import React, { useEffect, useState } from "react";
// import blogService from "../../../services/blogService";
// import { format } from "date-fns";
// import BlogCategoryFilter from "./components/BlogCategoryFilter";
// import BlogStatusFilter from "./components/BlogStatusFilter";
// import BlogSearchInput from "./components/BlogSearchInput";
// import BlogPagination from "./components/BlogPagination";
// import BulkActionsToolbar from "./components/BulkActionsToolbar";
// import AdminBlogPreviewModal from "./components/AdminBlogPreviewModal";
// import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
// import { cn } from "@/lib/utils"; // if you use a classnames util

// export default function AdminBlogListPage() {
//   // --- STATE ---
//   const [posts, setPosts] = useState([]);
//   const [selected, setSelected] = useState(new Set());
//   const [filters, setFilters] = useState({
//     category: "",
//     status: "",
//     search: "",
//     page: 1,
//     limit: 10,
//   });
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [previewPost, setPreviewPost] = useState(null);

//   // --- LOAD POSTS ---
//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     blogService
//       .list(filters)
//       .then((data) => {
//         setPosts(data.posts || []);
//         setTotal(data.count || 0);
//       })
//       .catch((err) =>
//         setError(
//           err?.response?.data?.message ||
//             err.message ||
//             "Failed to load blog posts"
//         )
//       )
//       .finally(() => setLoading(false));
//   }, [filters]);

//   // --- BULK ACTIONS ---
//   function handleBulkDelete() {
//     if (!window.confirm("Delete selected posts?")) return;
//     Promise.all([...selected].map((id) => blogService.delete(id)))
//       .then(() => {
//         setSelected(new Set());
//         setFilters((f) => ({ ...f })); // reload
//       })
//       .catch(() => alert("Failed to delete selected posts"));
//   }

//   // --- TABLE UI ---
//   return (
//     <section className="p-4 md:p-8 max-w-screen-2xl mx-auto">
//       <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
//         <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
//         <div className="flex flex-wrap gap-2">
//           <BlogCategoryFilter
//             value={filters.category}
//             onChange={(val) =>
//               setFilters((f) => ({ ...f, category: val, page: 1 }))
//             }
//           />
//           <BlogStatusFilter
//             value={filters.status}
//             onChange={(val) =>
//               setFilters((f) => ({ ...f, status: val, page: 1 }))
//             }
//           />
//           <BlogSearchInput
//             value={filters.search}
//             onChange={(val) =>
//               setFilters((f) => ({ ...f, search: val, page: 1 }))
//             }
//           />
//         </div>

//         <button
//           className="btn btn-primary ml-auto"
//           onClick={() => (window.location.href = "/admin/blogs/new")}
//         >
//           <FaPlus className="mr-2" />
//           New Post
//         </button>
//       </header>

//       {/* Bulk Actions */}
//       {selected.size > 0 && (
//         <BulkActionsToolbar
//           count={selected.size}
//           onDelete={handleBulkDelete}
//           onClear={() => setSelected(new Set())}
//         />
//       )}

//       {/* Loading/Error/Empty */}
//       {loading ? (
//         <div className="text-center p-10">Loading posts…</div>
//       ) : error ? (
//         <div className="text-center text-red-600 p-10">{error}</div>
//       ) : posts.length === 0 ? (
//         <div className="text-center text-gray-500 p-10">
//           No blog posts found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
//               <tr>
//                 <th className="p-3 w-4">
//                   <input
//                     type="checkbox"
//                     checked={selected.size === posts.length}
//                     onChange={(e) =>
//                       setSelected(
//                         e.target.checked
//                           ? new Set(posts.map((p) => p._id))
//                           : new Set()
//                       )
//                     }
//                   />
//                 </th>
//                 <th className="p-3 text-left">Title</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Author</th>
//                 <th className="p-3 text-left">Published</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {posts.map((post) => (
//                 <BlogTableRow
//                   key={post._id}
//                   post={post}
//                   selected={selected.has(post._id)}
//                   onSelect={(id) => {
//                     setSelected((prev) => {
//                       const next = new Set(prev);
//                       next.has(id) ? next.delete(id) : next.add(id);
//                       return next;
//                     });
//                   }}
//                   onPreview={setPreviewPost}
//                   onEdit={(post) => navigate(`/admin/blogs/edit/${post._id}`)}
//                   onDelete={async (post) => {
//                     if (window.confirm(`Delete "${post.title}"?`)) {
//                       await blogService.delete(post._id);
//                       setFilters((f) => ({ ...f })); // reload
//                     }
//                   }}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       {total > filters.limit && (
//         <div className="mt-4">
//           <BlogPagination
//             page={filters.page}
//             limit={filters.limit}
//             total={total}
//             onChange={(page) => setFilters((f) => ({ ...f, page }))}
//           />
//         </div>
//       )}

//       {/* Preview Modal */}
//       {previewPost && (
//         <AdminBlogPreviewModal
//           post={previewPost}
//           onClose={() => setPreviewPost(null)}
//         />
//       )}
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import BlogCategoryFilter from "./components/BlogCategoryFilter";
import BlogStatusFilter from "./components/BlogStatusFilter";
import BlogSearchInput from "./components/BlogSearchInput";
import BlogPagination from "./components/BlogPagination";
import BulkActionsToolbar from "./components/BulkActionsToolbar";
import AdminBlogPreviewModal from "./components/AdminBlogPreviewModal";
import { cn } from "@/lib/utils";
import blogService from "../../../services/blogService";
import { format } from "date-fns";

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

  // --- MAIN RENDER ---
  return (
    <section className="p-4 md:p-8 max-w-screen-2xl mx-auto min-h-[60vh]">
      {/* Toolbar */}
      <motion.header
        className="sticky top-2 z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow px-4 py-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-gray-500 text-xs mt-1">
            All articles, drafts, and scheduled posts. <span className="font-medium">{total} total</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <BlogCategoryFilter
            value={filters.category}
            onChange={(val) => setFilters((f) => ({ ...f, category: val, page: 1 }))}
          />
          <BlogStatusFilter
            value={filters.status}
            onChange={(val) => setFilters((f) => ({ ...f, status: val, page: 1 }))}
          />
          <BlogSearchInput
            value={filters.search}
            onChange={(val) => setFilters((f) => ({ ...f, search: val, page: 1 }))}
          />
        </div>
        <button
          className="btn btn-primary flex items-center gap-2 shadow hover:scale-105 transition-transform ml-auto"
          onClick={() => (window.location.href = "/admin/blogs/new")}
        >
          <FaPlus /> New Post
        </button>
      </motion.header>

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
        <div className="flex justify-center items-center h-60 text-lg font-medium">
          <span className="animate-pulse">Loading posts…</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-16 text-red-600">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 17a5 5 0 110-10 5 5 0 010 10z" />
          </svg>
          <span>{error}</span>
        </div>
      ) : posts.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          className="overflow-x-auto bg-white/90 shadow-xl rounded-2xl border border-gray-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2">
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
                <th className="px-3 py-2 text-left text-xs font-bold uppercase">Title & Meta</th>
                <th className="px-3 py-2 text-left text-xs font-bold uppercase">Category</th>
                <th className="px-3 py-2 text-left text-xs font-bold uppercase">Status</th>
                <th className="px-3 py-2 text-left text-xs font-bold uppercase">Author</th>
                <th className="px-3 py-2 text-left text-xs font-bold uppercase">Published</th>
                <th className="px-3 py-2 text-center text-xs font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post, idx) => (
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
                  onEdit={() => (window.location.href = `/admin/blogs/edit/${post._id}`)}
                  onDelete={async () => {
                    if (window.confirm(`Delete "${post.title}"?`)) {
                      await blogService.delete(post._id);
                      setFilters((f) => ({ ...f })); // reload
                    }
                  }}
                  highlight={idx % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Pagination */}
      {total > filters.limit && (
        <div className="mt-6 flex justify-end">
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

// ---- EMPTY STATE COMPONENT ----
function EmptyState() {
  return (
    <div className="flex flex-col items-center py-20">
      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="12" fill="#F3F4F6" />
        <path d="M14 30h20M14 22h20M14 26h20M14 18h20" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="text-xl font-bold text-gray-700 mb-2">No blog posts found</div>
      <div className="text-gray-500 mb-6 text-center max-w-xs">
        Looks like you haven’t published any posts yet. Start by creating your first blog!
      </div>
      <a
        href="/admin/blogs/new"
        className="inline-flex gap-2 items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
      >
        <FaPlus /> Create Blog Post
      </a>
    </div>
  );
}

// ---- BLOG TABLE ROW COMPONENT ----
function BlogTableRow({ post, selected, onSelect, onPreview, onEdit, onDelete, highlight }) {
  return (
    <tr
      className={cn(
        "hover:bg-indigo-50/40 transition group",
        highlight ? "bg-gray-50" : ""
      )}
    >
      <td className="px-3 py-3 align-middle">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(post._id)}
          aria-label={`Select blog post ${post.title}`}
        />
      </td>
      <td className="px-3 py-3 align-middle min-w-[240px]">
        <div className="flex items-center gap-3">
          {/* Optionally show blog thumbnail here */}
          <div className="flex-1">
            <div className="font-semibold text-base">{post.title}</div>
            <div className="text-xs text-gray-500 line-clamp-1">
              {post.metaTitle || "—"}
            </div>
            {post.seoScore && (
              <div className="mt-1 text-xs flex items-center gap-1">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                SEO: <span className="font-medium">{post.seoScore}</span>
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-3 py-3 align-middle">
        <span className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
          "bg-gradient-to-r from-sky-100 to-indigo-100 text-indigo-800"
        )}>
          {post.category?.name || "Uncategorized"}
        </span>
      </td>
      <td className="px-3 py-3 align-middle">
        <StatusPill status={post.status} />
      </td>
      <td className="px-3 py-3 align-middle">
        <div className="flex items-center gap-2">
          {post.author?.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full border"
            />
          )}
          <span className="font-medium">{post.author?.name || "—"}</span>
        </div>
      </td>
      <td className="px-3 py-3 align-middle">
        {post.publishedAt
          ? format(new Date(post.publishedAt), "MMM dd, yyyy")
          : <span className="text-gray-400">—</span>}
      </td>
      <td className="px-3 py-3 align-middle text-center">
        <div className="inline-flex gap-2">
          <button
            onClick={() => onPreview(post)}
            className="rounded-lg p-2 hover:bg-indigo-100 text-indigo-700"
            aria-label="Preview"
            title="Preview"
          >
            <FaEye />
          </button>
          <button
            onClick={() => onEdit(post)}
            className="rounded-lg p-2 hover:bg-blue-100 text-blue-700"
            aria-label="Edit"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(post)}
            className="rounded-lg p-2 hover:bg-rose-100 text-rose-600"
            aria-label="Delete"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ---- STATUS PILL ----
function StatusPill({ status }) {
  const statusMap = {
    draft: "bg-gray-200 text-gray-700",
    published: "bg-green-100 text-green-700",
    scheduled: "bg-blue-100 text-blue-700",
    archived: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize",
      statusMap[status] || "bg-gray-100 text-gray-500"
    )}>
      {status}
    </span>
  );
}
