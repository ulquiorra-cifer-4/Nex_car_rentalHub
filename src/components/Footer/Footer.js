import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const SOCIAL = [
  { icon: 'bi-instagram',  href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'bi-twitter-x',  href: 'https://twitter.com',  label: 'Twitter / X' },
  { icon: 'bi-facebook',   href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'bi-youtube',    href: 'https://youtube.com',  label: 'YouTube' },
  { icon: 'bi-linkedin',   href: 'https://linkedin.com', label: 'LinkedIn' },
];

const QUICK_LINKS = [
  { label: 'Browse Fleet',    to: '/' },
  { label: 'My Bookings',     to: '/my-bookings' },
  { label: 'How It Works',    to: '/' },
  { label: 'Become a Partner',to: '/' },
  { label: 'Careers',         to: '/' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center',         to: '/' },
  { label: 'Cancellation Policy', to: '/' },
  { label: 'Insurance Info',      to: '/' },
  { label: 'Terms of Service',    to: '/' },
  { label: 'Privacy Policy',      to: '/' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>

            {/* Brand + tagline + social */}
            <div className={styles.brandCol}>
              <div className={styles.brand}>
                NEX<span className={styles.dot}>.</span>RENTALHUB
              </div>
              <p className={styles.tagline}>
                Drive the future, today. Premium car rentals
                trusted by thousands across the country.
              </p>
              <div className={styles.socials}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.label}
                  >
                    <i className={`bi ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linkCol}>
              <div className={styles.colTitle}>Quick Links</div>
              <ul className={styles.linkList}>
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={styles.footerLink}>
                      <i className="bi bi-chevron-right me-1" />{l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className={styles.linkCol}>
              <div className={styles.colTitle}>Support</div>
              <ul className={styles.linkList}>
                {SUPPORT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={styles.footerLink}>
                      <i className="bi bi-chevron-right me-1" />{l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / Reach us */}
            <div className={styles.contactCol}>
              <div className={styles.colTitle}>Reach Us At</div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="bi bi-geo-alt-fill" /></div>
                <div>
                  <div className={styles.contactLabel}>Head Office</div>
                  <div className={styles.contactVal}>
                    42 Motorway Boulevard, Suite 800<br />
                    San Francisco, CA 94102, USA
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="bi bi-telephone-fill" /></div>
                <div>
                  <div className={styles.contactLabel}>24 / 7 Helpline</div>
                  <a href="tel:+18005551234" className={styles.contactLink}>+1 (800) 555-1234</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="bi bi-envelope-fill" /></div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <a href="mailto:support@nexrentalhub.com" className={styles.contactLink}>
                    support@nexrentalhub.com
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><i className="bi bi-clock-fill" /></div>
                <div>
                  <div className={styles.contactLabel}>Business Hours</div>
                  <div className={styles.contactVal}>Mon – Sun: 6:00 AM – 11:00 PM</div>
                </div>
              </div>

              {/* App badges (decorative) */}
              <div className={styles.appBadges}>
                <div className={styles.appBadge}>
                  <i className="bi bi-apple" />
                  <div><span>Download on the</span><strong>App Store</strong></div>
                </div>
                <div className={styles.appBadge}>
                  <i className="bi bi-google-play" />
                  <div><span>Get it on</span><strong>Google Play</strong></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <div className={styles.copy}>
              &copy; {new Date().getFullYear()} Nex.RentalHub Inc. All rights reserved.
            </div>
            <div className={styles.payIcons}>
              <span className={styles.payLabel}>We accept:</span>
              <i className="bi bi-credit-card-2-front" title="Visa" />
              <i className="bi bi-credit-card-fill" title="Mastercard" />
              <i className="bi bi-credit-card" title="Amex" />
              <i className="bi bi-paypal" title="PayPal" />
              <i className="bi bi-phone" title="UPI" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
