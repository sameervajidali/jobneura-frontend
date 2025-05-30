import React, { useState, useEffect } from 'react';

export default function BlogSearchInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, 300); // 300ms debounce

    // Cleanup timeout on unmount or value change
    return () => clearTimeout(handler);
  }, [inputValue, onChange]);

  return (
    <div className="flex flex-col">
      <label htmlFor="blog-search" className="sr-only">
        Search blogs
      </label>
      <input
        id="blog-search"
        type="search"
        placeholder="Search blogs..."
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
