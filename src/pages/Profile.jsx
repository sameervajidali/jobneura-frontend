import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLinkedin, FaGlobe, FaUpload, FaDownload } from "react-icons/fa";
import API from "../services/axios";

export default function Profile() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        website: user.website || "",
        linkedin: user.linkedin || "",
        languages: user.languages || [],
        skills: user.skills || [],
        experience: user.experience || [],
        education: user.education || [],
        avatar: user.avatar || "",
        resume: user.resume || "",
      });
      calculateCompletion(user);
    }
  }, [user]);

  const calculateCompletion = (u) => {
    let total = 10;
    let completed = 0;
    if (u.name) completed++;
    if (u.email) completed++;
    if (u.phone) completed++;
    if (u.location) completed++;
    if ((u.skills || []).length > 0) completed++;
    if ((u.languages || []).length > 0) completed++;
    if ((u.experience || []).length > 0) completed++;
    if ((u.education || []).length > 0) completed++;
    if (u.avatar) completed++;
    if (u.resume) completed++;
    setCompletion(Math.round((completed / total) * 100));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, val]) => {
        formData.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
      });
      if (avatarFile) formData.append("avatar", avatarFile);
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await API.put("/auth/profile", formData);
      login(res.data.user);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="space-y-4">
          <CardHeader className="text-center">
            <Avatar className="mx-auto w-32 h-32">
              {avatarFile ? (
                <AvatarImage src={URL.createObjectURL(avatarFile)} />
              ) : (
                <AvatarImage src={profile.avatar || "/default-avatar.png"} />
              )}
              <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-lg font-semibold">
              {profile.name || "Your Name"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-center">
              <label className="flex items-center cursor-pointer text-sm text-indigo-600 hover:underline">
                <FaUpload className="mr-1" /> Change Avatar
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </label>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{profile.email}</p>
              {profile.phone && <p>{profile.phone}</p>}
              {profile.location && <p>{profile.location}</p>}
            </div>
            <div className="flex space-x-4">
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                  <FaGlobe size={20} />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  <FaLinkedin size={20} />
                </a>
              )}
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Profile Completion</p>
              <Progress value={completion} className="h-2 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" />
                <Input name="email" value={profile.email} onChange={handleChange} placeholder="Email" disabled />
                <Input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" />
                <Input name="location" value={profile.location} onChange={handleChange} placeholder="Location" />
              </div>
              <Textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Short Bio" rows={3} />
              <div className="space-y-2">
                <label className="block text-sm font-medium">Upload Resume</label>
                <Input type="file" name="resume" onChange={(e) => setResumeFile(e.target.files[0])} />
                {resumeFile && <p className="text-sm">{resumeFile.name}</p>}
                {profile.resume && (
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm hover:text-indigo-600">
                    <FaDownload className="mr-1" /> Download Current Resume
                  </a>
                )}
              </div>
              <div className="pt-4">
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
              </div>
              {message && (
                <p className={`text-sm text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message.text}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
