import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty-state" style={{ paddingTop: '8rem' }}>
      <div className="empty-state__icon">
        <i className="bi bi-signpost-split" />
      </div>
      <div className="empty-state__title">PAGE NOT FOUND</div>
      <div className="empty-state__subtitle">This road doesn't exist.</div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="btn-gold mt-3">
          <i className="bi bi-house me-2" />Back to Home
        </button>
      </Link>
    </div>
  );
  }
  
