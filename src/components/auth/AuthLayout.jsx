import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-center pt-12 pb-10 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-[80vh]">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 space-y-6">
        {children}
      </div>
    </div>
  );
}

