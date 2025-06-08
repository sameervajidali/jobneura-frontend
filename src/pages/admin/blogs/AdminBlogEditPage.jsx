import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogService from "../../../services/blogService";
import blogCategoryService from "../../../services/blogCategoryService";
import blogTagService from "../../../services/blogTagService";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast"; // or your preferred toast library

export default function AdminBlogEditPage() {
  const { id } = useParams(); // blog ID for edit, undefined for create
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: [],
    coverImageUrl: "",
    status: "draft",
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // --- Load categories/tags & (if edit) post data ---
  useEffect(() => {
    setLoading(true);
    Promise.all([
      blogCategoryService.list(),
      blogTagService.list(),
      id ? blogService.get(id) : Promise.resolve(null),
    ])
      .then(([cat, tg, post]) => {
        setCategories(cat || []);
        setTags(tg || []);
        if (post) {
          setForm({
            title: post.title || "",
            summary: post.summary || "",
            content: post.content || "",
            category: post.category?._id || "",
            tags: (post.tags || []).map((t) => t._id || t),
            coverImageUrl: post.coverImageUrl || "",
            status: post.status || "draft",
          });
        }
      })
      .catch(() => setError("Failed to load categories/tags or post"))
      .finally(() => setLoading(false));
  }, [id]);

  // --- Handle form input ---
  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  }

  // --- Tag selection (multi-select) ---
  function onTagsChange(e) {
    const opts = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setForm((f) => ({ ...f, tags: opts }));
  }

  // --- Cover image upload (simulate upload, replace with mediaService if needed) ---
  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Simulate upload, or use blogMediaService.upload(formData)
    const url = URL.createObjectURL(file); // For preview only; replace with uploaded url in prod
    setForm((f) => ({ ...f, coverImageUrl: url }));
    toast.success("Image selected (replace this with real upload in prod)");
  }

  // --- Handle submit (create or update) ---
  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (id) {
        await blogService.update(id, form);
        toast.success("Blog post updated!");
      } else {
        await blogService.create(form);
        toast.success("Blog post created!");
      }
      navigate("/admin/blogs");
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to save post"
      );
      toast.error("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  }

  // --- UI ---
  if (loading)
    return (
      <div className="p-8 text-center">
        <FaSpinner className="inline animate-spin mr-2" />
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/admin/blogs")}
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog List
        </button>
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow">
      <header className="mb-6 flex items-center gap-4">
        <button
          className="btn btn-light"
          onClick={() => navigate("/admin/blogs")}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h1 className="text-xl font-bold">
          {id ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
      </header>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="input w-full"
            name="title"
            value={form.title}
            onChange={onChange}
            required
            maxLength={150}
            placeholder="Enter blog post title"
          />
        </div>
        {/* Summary */}
        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <textarea
            className="input w-full"
            name="summary"
            value={form.summary}
            onChange={onChange}
            rows={2}
            maxLength={300}
            placeholder="Short summary (for list & SEO)..."
          />
        </div>
        {/* Content */}
        <div>
          <label className="block mb-1 font-medium">Content (HTML or Markdown)</label>
          <textarea
            className="input w-full"
            name="content"
            value={form.content}
            onChange={onChange}
            rows={8}
            required
            placeholder="Write your blog post here…"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="input w-full"
            name="category"
            value={form.category}
            onChange={onChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <select
            className="input w-full"
            name="tags"
            multiple
            value={form.tags}
            onChange={onTagsChange}
            size={Math.min(tags.length, 5)}
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {/* Cover Image */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="input"
              style={{ maxWidth: 240 }}
              onChange={handleImageUpload}
            />
            {form.coverImageUrl && (
              <img
                src={form.coverImageUrl}
                alt="cover"
                className="w-24 h-20 object-cover rounded shadow"
              />
            )}
          </div>
          <small className="text-gray-500">Choose an image for post cover (jpg, png).</small>
        </div>
        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="input w-full"
            name="status"
            value={form.status}
            onChange={onChange}
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        {/* Save Button */}
        <div>
          <button
            className="btn btn-primary flex items-center gap-2"
            type="submit"
            disabled={saving}
          >
            {saving && <FaSpinner className="animate-spin" />}
            <FaSave />
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
