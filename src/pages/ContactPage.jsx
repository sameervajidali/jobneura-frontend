// import React from "react";
// import { Mail, Phone, MapPin } from "lucide-react";

// export default function ContactPage() {
//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
//         <p className="mt-2 text-gray-600 text-base max-w-2xl mx-auto">
//           Got a question, feedback, or business inquiry? Our team is here to help you.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12 bg-white shadow-xl rounded-3xl p-10">
//         {/* Contact Details */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
//           <p className="text-gray-600 text-sm">
//             Reach out to us through any of the following channels. We typically respond within 24 hours.
//           </p>

//           <div className="space-y-4">
//             <div className="flex items-start gap-4">
//               <Mail className="w-5 h-5 mt-1 text-indigo-600" />
//               <div>
//                 <p className="font-medium text-gray-700">Email</p>
//                 <p className="text-sm text-gray-600">support@jobneura.com</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <Phone className="w-5 h-5 mt-1 text-indigo-600" />
//               <div>
//                 <p className="font-medium text-gray-700">Phone</p>
//                 <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <MapPin className="w-5 h-5 mt-1 text-indigo-600" />
//               <div>
//                 <p className="font-medium text-gray-700">Address</p>
//                 <p className="text-sm text-gray-600">123 Startup Lane, Silicon Valley, CA</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <form className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               placeholder="Jane Doe"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               placeholder="jane@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//             <textarea
//               rows="4"
//               className="w-full px-4 py-3 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               placeholder="Write your message here..."
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Top decorative shadow */}
      <div className="" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2 leading-snug antialiased">
            Contact Us
          </h1>

          <p className="mt-2 text-lg text-white-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question or feedback,
            we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200 transition hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.15)]">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Contact us through any of the methods below and we’ll respond as
              quickly as possible.
            </p>

            <div className="space-y-5">
              <ContactItem
                icon={<Mail className="text-indigo-600 w-5 h-5" />}
                label="Email"
                value="support@jobneura.com"
              />
              <ContactItem
                icon={<Phone className="text-indigo-600 w-5 h-5" />}
                label="Phone"
                value="+1 (800) 123-4567"
              />
              <ContactItem
                icon={<MapPin className="text-indigo-600 w-5 h-5" />}
                label="Address"
                value="123 Startup Lane, Silicon Valley, CA"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <FloatingLabelInput label="Your Name" type="text" />
            <FloatingLabelInput label="Email" type="email" />
            <FloatingLabelTextarea label="Message" rows={4} />
            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-xl shadow"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}

function FloatingLabelInput({ label, type }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
        {label}
      </label>
    </div>
  );
}

function FloatingLabelTextarea({ label, rows }) {
  return (
    <div className="relative">
      <textarea
        rows={rows}
        placeholder=" "
        className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
        {label}
      </label>
    </div>
  );
}
