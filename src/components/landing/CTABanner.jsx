
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaRegEnvelope } from "react-icons/fa";

// function CTABanner() {
//   return (
//     <section className="relative py-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white text-center overflow-hidden">

//       {/* Floating Blur Bubbles */}
//       <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-[-120px] right-[-80px] w-[250px] h-[250px] bg-pink-300 opacity-20 rounded-full filter blur-2xl animate-pulse"></div>

//       {/* CTA Heading */}
//       <h2 className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10">
//         Ready to Supercharge Your Career?
//       </h2>

//       {/* CTA Button */}
//       <Link
//         to="/register"
//         className="inline-block mt-4 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full text-lg hover:bg-gray-100 transition-all relative z-10"
//       >
//         Get Started Free
//       </Link>

//       {/* Divider */}
//       <div className="border-t border-white/30 my-12 mx-auto w-1/2 relative z-10"></div>

//       {/* Newsletter Signup */}
//       <div className="flex flex-col items-center gap-4 relative z-10">
//         <div className="flex items-center gap-2 text-white/90">
//           <FaRegEnvelope className="text-white text-lg" />
//           <span className="text-sm md:text-base">
//             Stay updated with the latest jobs, tips & career news.
//           </span>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-5 py-3 rounded-full text-gray-800 focus:outline-none w-72 sm:w-96"
//           />
//           <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-100 transition-all">
//             Subscribe
//           </button>
//         </div>
//       </div>
      
//     </section>
//   );
// }

// export default CTABanner;


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

