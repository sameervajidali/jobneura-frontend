import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminBlogPreviewModal from './components/AdminBlogPreviewModal';
import { useParams, useNavigate } from 'react-router-dom';

import {
  fetchBlogCategories,
  getBlogById,
  createBlog,
  updateBlog,
} from '../../../services/blogService';

const blogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['Draft', 'Published']),
  content: z.string().min(10, 'Content is required'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

export default function AdminBlogEditPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);

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
      title: '',
      category: '',
      status: 'Draft',
      content: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    },
  });

  const blogForPreview = {
    title: watch('title'),
    authorName: 'You',
    publishedAt: watch('status') === 'Published' ? new Date().toISOString() : null,
    content: watch('content') || '',
    featuredImage,
  };

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

  useEffect(() => {
    return () => {
      if (featuredImage) URL.revokeObjectURL(featuredImage);
    };
  }, [featuredImage]);

  const onSubmit = async formData => {
    try {
      // TODO: handle file upload and set formData.featuredImage URL

      if (blogId) {
        await updateBlog(blogId, formData);
        alert('Blog updated successfully');
      } else {
        const data = await createBlog(formData);
        alert('Blog created successfully');
        navigate(`/admin/blogs/${data._id}`);
        return;
      }
      navigate('/admin/blogs');
    } catch {
      alert('Failed to save blog');
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
      setFeaturedImageFile(file);
    }
  };

  if (loading) return <div className="text-center py-10">Loading blog data...</div>;
  if (loadError) return <p className="text-red-600">{loadError}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded shadow space-y-6">
        <h1 className="text-2xl font-bold">{blogId ? 'Edit Blog' : 'Add New Blog'}</h1>

        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input
            id="title"
            {...register('title')}
            aria-invalid={errors.title ? 'true' : 'false'}
            className={`w-full border px-3 py-2 rounded focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
            placeholder="Enter blog title"
            aria-describedby="title-error"
          />
          {errors.title && <p id="title-error" className="text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block font-semibold mb-1">Category</label>
          <select
            id="category"
            {...register('category')}
            aria-invalid={errors.category ? 'true' : 'false'}
            className={`w-full border px-3 py-2 rounded focus:outline-none ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            aria-describedby="category-error"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p id="category-error" className="text-red-600 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block font-semibold mb-1">Status</label>
          <select
            id="status"
            {...register('status')}
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
                className={`${errors.content ? 'border-red-500' : ''}`}
              />
            )}
          />
          {errors.content && <p className="text-red-600 mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Featured Image</label>
          {featuredImage && (
            <img
              src={featuredImage}
              alt="Featured preview"
              className="mb-2 max-h-48 object-cover rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>

        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="font-semibold mb-2">SEO Metadata (optional)</legend>

          <div className="mb-4">
            <label htmlFor="metaTitle" className="block mb-1">Meta Title</label>
            <input
              id="metaTitle"
              {...register('metaTitle')}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              type="text"
              placeholder="SEO title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="metaDescription" className="block mb-1">Meta Description</label>
            <textarea
              id="metaDescription"
              {...register('metaDescription')}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              placeholder="SEO description"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="metaKeywords" className="block mb-1">Meta Keywords</label>
            <input
              id="metaKeywords"
              {...register('metaKeywords')}
              className="w-full border px-3 py-2 rounded focus:outline-none border-gray-300"
              type="text"
              placeholder="Comma-separated keywords"
            />
          </div>
        </fieldset>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {blogId ? 'Update Blog' : 'Create Blog'}
          </button>

          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="bg-gray-200 px-6 py-3 rounded hover:bg-gray-300"
          >
            Preview
          </button>
        </div>
      </form>

      <AdminBlogPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        blog={blogForPreview}
      />
    </>
  );
}
