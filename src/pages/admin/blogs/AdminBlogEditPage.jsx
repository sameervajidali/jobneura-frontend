// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createReactEditorJS } from "react-editor-js";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// // import ImageTool from "@editorjs/image";        // <-- Suspect
// import SimpleImage from "@editorjs/simple-image";
// import LinkTool from "@editorjs/link";
// import Quote from "@editorjs/quote";
// import Checklist from "@editorjs/checklist";
// import Marker from "@editorjs/marker";
// import InlineCode from "@editorjs/inline-code";
// import Delimiter from "@editorjs/delimiter";
// import Embed from "@editorjs/embed";
// import Select from "react-select";
// import { useDropzone } from "react-dropzone";
// import toast from "react-hot-toast";
// import blogService from "../../../services/blogService";
// import blogCategoryService from "../../../services/blogCategoryService";
// import blogTagService from "../../../services/blogTagService";
// import { FaArrowLeft, FaSave, FaSpinner, FaUpload } from "react-icons/fa";


// const EDITOR_JS_TOOLS = {
//   header: Header,
//   list: List,
//   image: SimpleImage, // ⬅️ Replace with this
//   linkTool: LinkTool,
//   quote: Quote,
//   checklist: Checklist,
//   marker: Marker,
//   inlineCode: InlineCode,
//   delimiter: Delimiter,
//   embed: Embed,
// };

// const ReactEditorJS = createReactEditorJS();

// export default function AdminBlogEditPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const editorCore = useRef(null);

//   // --- Form state
//   const [form, setForm] = useState({
//     title: "",
//     summary: "",
//     content: { blocks: [] }, // Editor.js structure
//     category: "",
//     tags: [],
//     coverImageUrl: "",
//     status: "draft",
//     metaTitle: "",
//     metaDescription: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // --- Load categories, tags, blog data
//   useEffect(() => {
//     setLoading(true);
//     Promise.all([
//       blogCategoryService.list(),
//       blogTagService.list(),
//       id ? blogService.get(id) : Promise.resolve(null),
//     ])
//       .then(([cat, tg, post]) => {
//         setCategories(cat || []);
//         setTags(tg || []);
//         if (post) {
//           setForm({
//             title: post.title || "",
//             summary: post.summary || "",
//             content: post.content || { blocks: [] },
//             category: post.category?._id || "",
//             tags: (post.tags || []).map((t) =>
//               typeof t === "object" ? t._id : t
//             ),
//             coverImageUrl: post.coverImageUrl || "",
//             status: post.status || "draft",
//             metaTitle: post.metaTitle || "",
//             metaDescription: post.metaDescription || "",
//           });
//         }
//       })
//       .catch(() => setError("Failed to load categories/tags or post"))
//       .finally(() => setLoading(false));
     
//   }, [id]);

//   // --- Editor output handler
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     try {
//       const savedData = await editorCore.current.save();
//       if (!form.title.trim() || !savedData.blocks.length) {
//         toast.error("Title and content are required.");
//         setSaving(false);
//         return;
//       }
//       const payload = { ...form, content: savedData };
//       if (id) {
//         await blogService.update(id, payload);
//         toast.success("Blog post updated!");
//       } else {
//         await blogService.create(payload);
//         toast.success("Blog post created!");
//       }
//       navigate("/admin/blogs");
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || err.message || "Failed to save post"
//       );
//       toast.error("Failed to save blog post");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // --- Tag multi-select
//   const tagOptions = tags.map((tag) => ({
//     value: tag._id,
//     label: tag.name,
//   }));
//   function onTagsChange(selected) {
//     setForm((f) => ({
//       ...f,
//       tags: selected ? selected.map((s) => s.value) : [],
//     }));
//   }

//   // --- Cover image drag/drop
//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const url = URL.createObjectURL(file); // for preview
//       setForm((f) => ({ ...f, coverImageUrl: url }));
//       toast.success("Image selected (add cloud upload for production)");
//     }
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: false,
//   });

//   // --- Editor.js image upload config (replace with real upload for prod)
//   const imageConfig = {
//     uploader: {
//       uploadByFile(file) {
//         // For prod: upload to S3/Supabase/etc and return { success: 1, file: { url: ... } }
//         return new Promise((resolve) => {
//           const url = URL.createObjectURL(file);
//           resolve({ success: 1, file: { url } });
//         });
//       },
//     },
//   };

//   if (loading)
//     return (
//       <div className="p-8 text-center">
//         <FaSpinner className="inline animate-spin mr-2" />
//         Loading...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="p-8 text-center text-red-600">
//         <p>{error}</p>
//         <button
//           className="btn btn-primary mt-4"
//           onClick={() => navigate("/admin/blogs")}
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Blog List
//         </button>
//       </div>
//     );

//   return (
//     <section className="max-w-3xl mx-auto p-4 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-100">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <button className="btn btn-light" onClick={() => navigate("/admin/blogs")}>
//           <FaArrowLeft className="mr-2" /> Back
//         </button>
//         <h1 className="text-2xl font-bold">{id ? "Edit Blog Post" : "Create Blog Post"}</h1>
//       </div>
//       <form onSubmit={handleSave} className="space-y-8">
//         {/* Title */}
//         <div>
//           <label className="block mb-1 font-medium">Title</label>
//           <input
//             className="input w-full"
//             name="title"
//             value={form.title}
//             onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
//             required
//             maxLength={150}
//             placeholder="Enter blog post title"
//           />
//         </div>
//         {/* Meta fields (SEO) */}
//         <div>
//           <label className="block mb-1 font-medium">Meta Title (SEO)</label>
//           <input
//             className="input w-full"
//             name="metaTitle"
//             value={form.metaTitle}
//             onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
//             maxLength={70}
//             placeholder="Meta title for SEO"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Meta Description (SEO)</label>
//           <textarea
//             className="input w-full"
//             name="metaDescription"
//             value={form.metaDescription}
//             onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
//             rows={2}
//             maxLength={160}
//             placeholder="Meta description for search engines"
//           />
//         </div>
//         {/* Summary */}
//         <div>
//           <label className="block mb-1 font-medium">Summary</label>
//           <textarea
//             className="input w-full"
//             name="summary"
//             value={form.summary}
//             onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
//             rows={2}
//             maxLength={300}
//             placeholder="Short summary (for list & SEO)..."
//           />
//         </div>
//         {/* Cover image */}
//         <div>
//           <label className="block mb-1 font-medium">Cover Image</label>
//           <div
//             {...getRootProps()}
//             className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl min-h-[120px] transition-all cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-indigo-500"}`}
//           >
//             <input {...getInputProps()} />
//             {form.coverImageUrl ? (
//               <img src={form.coverImageUrl} alt="cover" className="w-40 h-28 object-cover rounded-xl shadow" />
//             ) : (
//               <div className="flex flex-col items-center py-4 text-gray-400">
//                 <FaUpload className="mb-2 text-xl" />
//                 <span>Drag & drop an image or click to select</span>
//               </div>
//             )}
//           </div>
//           <small className="text-gray-500">Choose an image for post cover (jpg, png).</small>
//         </div>
//         {/* Category */}
//         <div>
//           <label className="block mb-1 font-medium">Category</label>
//           <select
//             className="input w-full"
//             name="category"
//             value={form.category}
//             onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
//             required
//           >
//             <option value="">Select category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Tags */}
//         <div>
//           <label className="block mb-1 font-medium">Tags</label>
//           <Select
//             isMulti
//             options={tagOptions}
//             value={tagOptions.filter((t) => form.tags.includes(t.value))}
//             onChange={onTagsChange}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             placeholder="Select tags..."
//           />
//         </div>
//         {/* Status */}
//         <div>
//           <label className="block mb-1 font-medium">Status</label>
//           <select
//             className="input w-full"
//             name="status"
//             value={form.status}
//             onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
//           >
//             <option value="draft">Draft</option>
//             <option value="review">Review</option>
//             <option value="published">Published</option>
//             <option value="archived">Archived</option>
//           </select>
//         </div>
//         {/* --- Editor.js WYSIWYG --- */}
//         <div>
//           <label className="block mb-1 font-medium">Content</label>
//           <div className="border rounded-xl bg-gray-50 p-2 min-h-[320px]">
//             <ReactEditorJS
//               tools={{ ...EDITOR_JS_TOOLS, image: { class: SimpleImage, config: imageConfig } }}
//               defaultValue={form.content}
//               holder="editorjs"
//               onInitialize={instance => (editorCore.current = instance)}
//               minHeight={280}
//               placeholder="Write your amazing post here…"
//             />
//           </div>
//           <small className="text-gray-500 block mt-1">
//             Drag & drop to reorder blocks, insert images, lists, embeds, and more.
//           </small>
//         </div>
//         {/* Save Button */}
//         <div>
//           <button
//             className="btn btn-primary flex items-center gap-2"
//             type="submit"
//             disabled={saving}
//           >
//             {saving && <FaSpinner className="animate-spin" />}
//             <FaSave />
//             {id ? "Update" : "Create"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Select from "react-select";
import blogService from "../../../services/blogService";
import blogCategoryService from "../../../services/blogCategoryService";
import blogTagService from "../../../services/blogTagService";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminBlogEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Form state ---
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

  // --- Rich Editor state ---
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    autofocus: false,
    editable: true,
    onUpdate: ({ editor }) => {
      setForm((f) => ({ ...f, content: editor.getHTML() }));
    },
  });

  // --- Load categories, tags, and (if edit) blog post data ---
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
            tags: (post.tags || []).map((t) =>
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

  // --- Handle form input ---
  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  }

  // --- Tag selection with react-select (chips) ---
  const tagOptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  function onTagsChange(selected) {
    setForm((f) => ({
      ...f,
      tags: selected ? selected.map((s) => s.value) : [],
    }));
  }

  // --- Cover image upload (real upload: integrate your Supabase or media service here) ---
  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: Replace with actual upload (Supabase/mediaService)
    const url = URL.createObjectURL(file); // Preview only
    setForm((f) => ({ ...f, coverImageUrl: url }));
    toast.success("Image selected (add cloud upload for production)");
  }

  // --- Handle submit (create or update) ---
  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      // Validate content length
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
      setError(
        err?.response?.data?.message || err.message || "Failed to save post"
      );
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
        {/* Content (Rich Editor) */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <div className="border rounded bg-gray-50 p-2">
            <EditorContent editor={editor} />
          </div>
          <small className="text-gray-500 block mt-1">
            Use formatting, links, lists, code, images, and more.
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Tags (Multi-select Chips) */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <Select
            isMulti
            options={tagOptions}
            value={tagOptions.filter((t) => form.tags.includes(t.value))}
            onChange={onTagsChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select tags..."
          />
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