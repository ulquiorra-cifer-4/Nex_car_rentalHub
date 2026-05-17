import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { loginUser, registerUser } from '../../utils/api';
import Spinner from '../Spinner/Spinner';
import styles from './AuthModal.module.css';

export default function AuthModal({ onClose }) {
  const { login, toast } = useApp();

  const [mode,     setMode]     = useState('login'); // 'login' | 'register'
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const clearFields = () => { setName(''); setEmail(''); setPassword(''); setError(''); };

  const switchMode = (next) => { setMode(next); clearFields(); };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async () => {
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      let res;
      if (mode === 'register') {
        res = await registerUser({ name, email, password });
      } else {
        res = await loginUser({ email, password });
      }
      login(res.data.data);
      toast(
        mode === 'register'
          ? `Welcome, ${res.data.data.name}!`
          : `Welcome back, ${res.data.data.name}!`,
        'success'
      );
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !loading) handleSubmit(); };

  return (
    <div className="modal-backdrop-custom" onClick={handleBackdropClick}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>
              {mode === 'login' ? 'SIGN IN' : 'REGISTER'}
            </div>
            <div className={styles.subtitle}>
              {mode === 'login' ? 'Access your account' : 'Create your free account'}
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <i className="bi bi-x" />
          </button>
        </div>

        <div className={styles.body}>
          {error && (
            <div className="alert-danger-dark">
              <i className="bi bi-x-circle me-1" />{error}
            </div>
          )}

          {/* Name — register only */}
          {mode === 'register' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                className="form-control-dark"
                placeholder="John Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className="form-control-dark"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              autoFocus={mode === 'login'}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className="form-control-dark"
              placeholder={mode === 'register' ? 'Min. 6 characters' : '••••••••'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className={`btn-gold w-100 ${styles.submitBtn}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <><Spinner size="sm" />&nbsp;&nbsp;Please wait...</>
            ) : mode === 'login' ? (
              <><i className="bi bi-box-arrow-in-right me-2" />Sign In</>
            ) : (
              <><i className="bi bi-person-plus me-2" />Create Account</>
            )}
          </button>

          <div className={styles.switchRow}>
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <span className={styles.switchLink} onClick={() => switchMode('register')}>
                  Register here
                </span>
              </>
            ) : (
              <>Already have an account?{' '}
                <span className={styles.switchLink} onClick={() => switchMode('login')}>
                  Sign in
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
