// src/pages/TestQuizPage.jsx
import React from 'react';
import useTestQuizzes from '../hooks/useTestQuizzes';

export default function TestQuizPage() {
  const data = useTestQuizzes();

  if (!data) return <div>Loading…</div>;

  return (
    <pre style={{ textAlign: 'left', background: '#222', color: '#fff', padding: 20 }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
