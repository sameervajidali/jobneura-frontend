// // src/components/about/OurValues.jsx
// import React from "react";
// import { FaLightbulb, FaHandshake, FaRocket } from "react-icons/fa";

// export default function OurValues() {
//   const values = [
//     {
//       icon: <FaLightbulb className="text-3xl text-indigo-600" />,
//       title: "Innovation",
//       description: "We challenge outdated patterns and build smarter solutions that move people forward.",
//     },
//     {
//       icon: <FaHandshake className="text-3xl text-indigo-600" />,
//       title: "Integrity",
//       description: "We operate with honesty, transparency, and a user-first mindset in everything we do.",
//     },
//     {
//       icon: <FaRocket className="text-3xl text-indigo-600" />,
//       title: "Simplicity",
//       description: "We believe the best technology makes life easier — not more complicated.",
//     },
//   ];

//   return (
//     <section className="py-20 bg-indigo-50">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         {/* Section Title */}
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
//           Our Values
//         </h2>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {values.map((value, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2"
//             >
//               {/* Icon */}
//               <div className="mb-4">{value.icon}</div>

//               {/* Title */}
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {value.title}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {value.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// src/components/about/OurValues.jsx
import React from "react";
import { FaLightbulb, FaHandshake, FaRocket } from "react-icons/fa";

const values = [
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    description: "We challenge outdated patterns and build smarter solutions that move people forward.",
  },
  {
    icon: <FaHandshake />,
    title: "Integrity",
    description: "We operate with honesty, transparency, and a user-first mindset in everything we do.",
  },
  {
    icon: <FaRocket />,
    title: "Simplicity",
    description: "We believe the best technology makes life easier — not more complicated.",
  },
];

export default function OurValues() {
  return (
    <section className="bg-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">Our Values</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center"
          >
            <div className="flex justify-center mb-4 text-indigo-600 text-4xl">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

