import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        NEX<span className={styles.dot}>.</span>RENTALHUB
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} Nex.RentalHub. All rights reserved.
      </div>
    </footer>
  );
}
