import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

import blogCategoryService from "../../../services/blogCategoryService.js";
import blogService from "../../../services/blogService.js"; // We'll use .get and .update here

// Status options as lowercase for backend/API compatibility
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

// Zod schema for validation
const blogSchema = z.object({
  title: z.string().min(5, "Title is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "review", "published", "archived"]),
  content: z.string().min(10, "Content is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

export default function AdminBlogReviewEditPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      category: "",
      status: "draft",
      content: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const watchStatus = watch("status");
  const watchContent = watch("content");

  // Load categories and blog post (if editing)
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      blogCategoryService.list(),
      blogId ? blogService.get(blogId) : Promise.resolve(null),
    ])
      .then(([cats, post]) => {
        setCategories(cats || []);
        if (post) {
          reset({
            title: post.title || "",
            category: post.category?._id?.toString() || "",
            status: post.status || "draft",
            content: post.content || "",
            metaTitle: post.metaTitle || "",
            metaDescription: post.metaDescription || "",
            metaKeywords: post.metaKeywords || "",
          });
        }
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [blogId, reset]);

  // Submit form
  const onSubmit = async (data) => {
    try {
      await blogService.update(blogId, data);
      alert("Blog details saved successfully.");
      reset(data);
    } catch {
      alert("Failed to save blog");
    }
  };

  // Change blog status only
  const changeStatus = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await blogService.update(blogId, { status: newStatus });
      alert(`Blog status changed to ${newStatus}`);
      reset({ ...watch(), status: newStatus });
    } catch {
      alert("Failed to change status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <p className="p-10 text-center">Loading blog data…</p>;
  if (error) return <p className="text-red-600 p-10 text-center">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-8">
      <h1 className="text-3xl font-bold mb-4">Review & Edit Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            className={`w-full border px-3 py-2 rounded focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className={`w-full border px-3 py-2 rounded focus:outline-none ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            value={watch("category") || ""}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full border px-3 py-2 rounded focus:outline-none"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                placeholder="Write your blog content here…"
                className={`${errors.content ? "border-red-500" : ""}`}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-600 mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* SEO Metadata */}
        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="font-semibold mb-2">SEO Metadata (optional)</legend>
          <div className="mb-4">
            <label htmlFor="metaTitle" className="block mb-1">
              Meta Title
            </label>
            <input
              id="metaTitle"
              {...register("metaTitle")}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              placeholder="SEO title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="metaDescription" className="block mb-1">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              {...register("metaDescription")}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              placeholder="SEO description"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="metaKeywords" className="block mb-1">
              Meta Keywords
            </label>
            <input
              id="metaKeywords"
              {...register("metaKeywords")}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              placeholder="Comma-separated keywords"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Save Changes
        </button>
      </form>

      {/* Live Preview */}
      <div className="border border-gray-300 rounded p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: watchContent }}
        />
      </div>

      {/* Status Change Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => changeStatus("published")}
          disabled={updatingStatus || watchStatus === "published"}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Publish
        </button>
        <button
          onClick={() => changeStatus("draft")}
          disabled={updatingStatus || watchStatus === "draft"}
          className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Send Back to Draft
        </button>
        <button
          onClick={() => changeStatus("review")}
          disabled={updatingStatus || watchStatus === "review"}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Mark as Review
        </button>
        <button
          onClick={() => changeStatus("archived")}
          disabled={updatingStatus || watchStatus === "archived"}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Archive
        </button>
      </div>
    </div>
  );
}
