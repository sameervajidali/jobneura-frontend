import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Select from "react-select";
import { FaArrowLeft, FaSave, FaSpinner, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import blogService from "../../../services/blogService";
import blogCategoryService from "../../../services/blogCategoryService";
import blogTagService from "../../../services/blogTagService";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

export default function AdminBlogEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // --- Form State ---
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

  // --- Tag options for react-select ---
  const tagOptions = tags.map(tag => ({
    value: tag._id,
    label: tag.name,
  }));

  // --- Editor Instance (Tiptap) ---
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Start writing your amazing blog post…",
      }),
    ],
    content: "",
    autofocus: false,
    editable: true,
    onUpdate: ({ editor }) => {
      setForm(f => ({ ...f, content: editor.getHTML() }));
    },
  });

  // --- Load categories, tags, post ---
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
            tags: (post.tags || []).map(t =>
              typeof t === "object" ? t._id : t
            ),
            coverImageUrl: post.coverImageUrl || "",
            status: post.status || "draft",
          });
          editor?.commands.setContent(post.content || "");
        }
      })
      .catch(() => setError("Failed to load categories/tags or post"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [id, editor]);

  // --- Form Handlers ---
  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function onTagsChange(selected) {
    setForm(f => ({
      ...f,
      tags: selected ? selected.map(s => s.value) : [],
    }));
  }

  // --- Cover Image: Drag & Drop Upload (Preview) ---
  const onDrop = React.useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(f => ({ ...f, coverImageUrl: url }));
      toast.success("Image selected (add cloud upload for production)");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // --- Insert Image to Editor (Tiptap) ---
  function insertImageToEditor(file) {
    if (!file) return;
    const url = URL.createObjectURL(file); // For preview, swap with real upload for production
    editor.chain().focus().setImage({ src: url, alt: "Uploaded image" }).run();
  }

  // --- Image upload in editor ---
  function handleEditorImageUpload(e) {
    const file = e.target.files?.[0];
    if (file) insertImageToEditor(file);
  }

  // --- Submit ---
  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!form.title.trim() || !form.content.trim()) {
        toast.error("Title and content are required.");
        setSaving(false);
        return;
      }
      if (id) {
        await blogService.update(id, form);
        toast.success("Blog post updated!");
      } else {
        await blogService.create(form);
        toast.success("Blog post created!");
      }
      navigate("/admin/blogs");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save post");
      toast.error("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  }

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
        <button className="btn btn-primary mt-4" onClick={() => navigate("/admin/blogs")}>
          <FaArrowLeft className="mr-2" /> Back to Blog List
        </button>
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto p-4 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-100">
      <motion.header
        className="mb-8 flex items-center gap-4"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button className="btn btn-light" onClick={() => navigate("/admin/blogs")}>
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold">{id ? "Edit Blog Post" : "Create Blog Post"}</h1>
      </motion.header>
      <form onSubmit={onSubmit} className="space-y-8">
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
        {/* Cover Image (Drag & Drop) */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl min-h-[120px] transition-all cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-indigo-500"}`}
          >
            <input {...getInputProps()} />
            {form.coverImageUrl ? (
              <img src={form.coverImageUrl} alt="cover" className="w-40 h-28 object-cover rounded-xl shadow" />
            ) : (
              <div className="flex flex-col items-center py-4 text-gray-400">
                <FaUpload className="mb-2 text-xl" />
                <span>Drag & drop an image or click to select</span>
              </div>
            )}
          </div>
          <small className="text-gray-500">Choose an image for post cover (jpg, png).</small>
        </div>
        {/* Content (Rich Editor) */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <div className="border rounded-xl bg-gray-50 p-2 min-h-[240px]">
            {/* Custom toolbar for images, blocks, etc */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className="btn btn-light btn-xs"
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
                title="Bold"
              >
                <b>B</b>
              </button>
              <button
                type="button"
                className="btn btn-light btn-xs"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
                title="Italic"
              >
                <i>I</i>
              </button>
              <label className="btn btn-light btn-xs cursor-pointer" title="Insert Image">
                <FaUpload className="inline mr-1" /> Img
                <input type="file" accept="image/*" onChange={handleEditorImageUpload} hidden />
              </label>
              {/* Add more: code, table, link, heading, etc */}
            </div>
            <EditorContent editor={editor} />
          </div>
          <small className="text-gray-500 block mt-1">
            Drag and drop blocks, images, and use full formatting.
          </small>
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
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <Select
            isMulti
            options={tagOptions}
            value={tagOptions.filter(t => form.tags.includes(t.value))}
            onChange={onTagsChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select tags..."
          />
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
