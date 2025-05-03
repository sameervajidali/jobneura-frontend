// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaRocket } from 'react-icons/fa'; // Rocket Icon

// function HeroSection() {
//   return (
//     <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4">
//       {/* Main Title */}
//       <h1 className="text-4xl md:text-6xl font-bold mb-6">
//         Build Smarter Resumes. Find Better Jobs.
//       </h1>

//       {/* Sub Title */}
//       <p className="text-lg md:text-2xl mb-8">
//         AI-powered resume builder, skill quizzes, and smart job search — all in one place.
//       </p>

//       {/* Get Started Button */}
//       <div className="flex flex-col items-center gap-4">
//         <Link
//           to="/register"
//           className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100 text-lg"
//         >
//           <FaRocket className="text-xl" /> Get Started Free
//         </Link>

//         {/* Login Small Link */}
//         <p className="text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="underline hover:text-gray-300">
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

function HeroSection() {
  return (

    <section className="pt-16 flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-[calc(100vh-4rem)] w-full overflow-hidden">
  {/* Content here */}
   
      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Build Smarter Resumes. Find Better Jobs.
      </h1>

      {/* Sub Title */}
      <p className="text-lg md:text-2xl mb-8">
        AI-powered resume builder, skill quizzes, and smart job search — all in one place.
      </p>

      {/* Get Started Button */}
      <div className="flex flex-col items-center gap-4">
        <Link
          to="/register"
          className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-100 text-lg"
        >
          <FaRocket className="text-xl" /> Get Started Free
        </Link>

        {/* Login Small Link */}
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-gray-300">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
