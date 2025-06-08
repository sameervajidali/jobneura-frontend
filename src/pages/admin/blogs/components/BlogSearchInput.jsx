import React, { useState, useEffect } from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";

export default function BlogSearchInput({ value, onChange, placeholder = "Search...", debounce = 400 }) {
  const [input, setInput] = useState(value || "");

  // Debounced change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (input !== value) onChange(input);
    }, debounce);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [input]);

  // If value prop changes from outside, update local state
  useEffect(() => {
    setInput(value || "");
  }, [value]);

  return (
    <div className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        className="flex-1 outline-none text-sm"
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ minWidth: 120 }}
      />
      {input && (
        <button
          type="button"
          className="ml-1 text-gray-400 hover:text-red-500 transition"
          onClick={() => setInput("")}
          aria-label="Clear search"
        >
          <FaTimesCircle />
        </button>
      )}
    </div>
  );
}
