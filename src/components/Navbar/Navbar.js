import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import styles from './Navbar.module.css';

export default function Navbar({ onAuthClick }) {
  const { user, logout, toast } = useApp();
  const location  = useLocation();
  const navigate  = useNavigate();

  const handleLogout = () => {
    logout();
    toast('Logged out successfully', 'info');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            NEX<span className={styles.dot}>.</span>RENTALHUB
          </Link>

          <div className={styles.links}>
            <Link
              to="/"
              className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
            >
              <i className="bi bi-grid-fill me-1" />Browse
            </Link>

            {user && (
              <Link
                to="/my-bookings"
                className={`${styles.link} ${isActive('/my-bookings') ? styles.active : ''}`}
              >
                <i className="bi bi-calendar-check me-1" />My Bookings
              </Link>
            )}

            {user ? (
              <div className={styles.userGroup}>
                <span className={styles.userName}>
                  <i className="bi bi-person-circle me-1" />
                  {user.name?.split(' ')[0]}
                </span>
                <button className={styles.logoutBtn} onClick={handleLogout} title="Sign out">
                  <i className="bi bi-box-arrow-right" />
                </button>
              </div>
            ) : (
              <button className="btn-gold ms-2" onClick={onAuthClick}>
                <i className="bi bi-person-fill me-1" />Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
