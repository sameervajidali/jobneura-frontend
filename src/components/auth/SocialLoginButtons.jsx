// src/components/auth/SocialLoginButtons.jsx
import React from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function SocialLoginButtons() {
  const providers = [
    { icon: <FaGoogle />, label: "Google", color: "text-red-500" },
    { icon: <FaFacebookF />, label: "Facebook", color: "text-blue-600" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", color: "text-blue-700" },
    { icon: <FaGithub />, label: "GitHub", color: "text-gray-800" },
  ];

  return (
    <div className="flex justify-center gap-2 mb-2">
      {providers.map((p) => (
        <button
          key={p.label}
          type="button"
          className="
            flex          /* inline-row */
            items-center
            gap-1         /* small gap between icon/text */
            px-2          /* horizontal padding shrunk */
            py-1          /* vertical padding shrunk */
            border border-gray-300
            rounded-md
            text-xs       /* smaller text */
            font-medium
            hover:bg-gray-50
            transition-colors duration-150
          "
        >
          <span className={`${p.color} text-base`}>{p.icon}</span>
          <span className="truncate">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
