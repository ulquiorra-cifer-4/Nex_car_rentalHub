import React from 'react';
import { useApp } from '../../context/AppContext';
import styles from './ToastContainer.module.css';

const ICONS = {
  success: 'bi-check-circle-fill',
  error:   'bi-x-circle-fill',
  info:    'bi-info-circle-fill',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles.toast} ${styles[t.type] || styles.info}`}
          role="alert"
        >
          <i className={`bi ${ICONS[t.type] || ICONS.info} ${styles.icon}`} />
          <span className={styles.msg}>{t.msg}</span>
          <button
            className={styles.close}
            onClick={() => removeToast(t.id)}
            aria-label="Dismiss"
          >
            <i className="bi bi-x" />
          </button>
        </div>
      ))}
    </div>
  );
}
