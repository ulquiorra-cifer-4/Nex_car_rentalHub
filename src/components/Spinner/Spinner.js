import React from 'react';

/**
 * Apple-style Activity Indicator spinner.
 * Props:
 *   size  — 'sm' | 'md' (default 'md')
 *   label — optional accessible label
 */
export default function Spinner({ size = 'md', label = 'Loading...' }) {
  return (
    <div
      className={`apple-spinner ${size === 'sm' ? 'sm' : ''}`}
      role="status"
      aria-label={label}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
