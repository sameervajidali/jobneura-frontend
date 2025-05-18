
import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext"; // Assuming you have a context to manage user authentication

function CTABanner() {
  const { user } = useAuth(); // Assuming 'user' is available in your context

  return (
   <section className="relative py-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white text-center overflow-hidden" style={{ marginTop: 'calc(80px)' }}>
  {/* Hero Section Content */}
  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10">
    Ready to Supercharge Your Career?
  </h2>
  {/* Other content */}
</section>

  );
}

export default CTABanner;

