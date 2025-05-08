// src/utils/getAvatarUrl.js
export function getAvatarUrl(rawUrl) {
    let url = rawUrl || "";
  
    // if it’s a relative “/uploads/…” path, prefix your API origin
    if (url.startsWith("/uploads")) {
      const origin = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "");
      url = origin + url;
    }
  
    // fallback to either the default or an empty string
    return url || "/default-avatar.png";
  }
  