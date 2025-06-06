import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchBlogCategories,
  getBlogById,
  updateBlog,
  updateBlogStatus,
} from "../../../services/blogService";

const blogSchema = z.object({
  title: z.string().min(5, "Title is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["Draft", "Published"]),
  content: z.string().min(10, "Content is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

export default function AdminBlogReviewEditPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
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
      status: "Draft",
      content: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const watchStatus = watch("status");
  const watchContent = watch("content");

 useEffect(() => {
     fetchBlogCategories()
       .then(data => {
         if (Array.isArray(data)) setCategories(data);
         else if (Array.isArray(data.categories)) setCategories(data.categories);
         else setCategories([]);
       })
       .catch(() => setCategories([]));
 
     if (blogId) {
       setLoading(true);
       getBlogById(blogId)
         .then(data => {
           reset({
             title: data.title,
             category: data.category?._id || '',
             status: data.status,
             content: data.content,
             metaTitle: data.metaTitle || '',
             metaDescription: data.metaDescription || '',
             metaKeywords: data.metaKeywords || '',
           });
           setFeaturedImage(data.featuredImage || null);
         })
         .catch(() => setLoadError('Failed to load blog'))
         .finally(() => setLoading(false));
     }
   }, [blogId, reset]);

  const onSubmit = async (data) => {
    try {
      await updateBlog(blogId, data);
      alert("Blog details saved successfully.");
      reset(data);
    } catch {
      alert("Failed to save blog");
    }
  };

  const changeStatus = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await updateBlogStatus(blogId, newStatus);
      alert(`Blog status changed to ${newStatus}`);
      reset({ ...watch(), status: newStatus });
    } catch {
      alert("Failed to change status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <p>Loading blog data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-8">
      <h1 className="text-3xl font-bold mb-4">Review & Edit Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <div>
          <label className="block font-semibold mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full border px-3 py-2 rounded focus:outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Content</label>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                placeholder="Write your blog content here..."
                className={`${errors.content ? "border-red-500" : ""}`}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-600 mt-1">{errors.content.message}</p>
          )}
        </div>

        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="font-semibold mb-2">
            SEO Metadata (optional)
          </legend>

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

      <div className="border border-gray-300 rounded p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: watchContent }}
        />
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => changeStatus("Published")}
          disabled={updatingStatus || watchStatus === "Published"}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Publish
        </button>
        <button
          onClick={() => changeStatus("Draft")}
          disabled={updatingStatus || watchStatus === "Draft"}
          className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Send Back to Draft
        </button>
      </div>
    </div>
  );
}
