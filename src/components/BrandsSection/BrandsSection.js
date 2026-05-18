import React from 'react';
import styles from './BrandsSection.module.css';

/**
 * SVG-based metallic car brand logos.
 * Each brand card shows a real SVG emblem + availability indicator.
 */
const BRANDS = [
  {
    name: 'BMW',
    available: true,
    count: 4,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#bmwRing)" stroke="url(#bmwGold)" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#bmwGold)" strokeWidth="0.8"/>
        {/* BMW quadrants */}
        <path d="M50 8 A42 42 0 0 1 92 50 L50 50 Z" fill="url(#bmwBlue)"/>
        <path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="url(#bmwSilver)"/>
        <path d="M50 92 A42 42 0 0 1 8 50 L50 50 Z" fill="url(#bmwBlue)"/>
        <path d="M50 50 L8 50 A42 42 0 0 1 50 8 Z" fill="url(#bmwSilver)"/>
        <circle cx="50" cy="50" r="16" fill="url(#bmwCenter)" stroke="url(#bmwGold)" strokeWidth="0.8"/>
        <text x="50" y="54.5" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="sans-serif" fill="url(#bmwGold)" letterSpacing="0.5">BMW</text>
        <defs>
          <radialGradient id="bmwRing" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#2a2a2a"/>
            <stop offset="100%" stopColor="#0d0d0d"/>
          </radialGradient>
          <linearGradient id="bmwGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#8a6820"/>
          </linearGradient>
          <linearGradient id="bmwBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3a6e"/>
            <stop offset="100%" stopColor="#0d2144"/>
          </linearGradient>
          <linearGradient id="bmwSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8c8c8"/>
            <stop offset="100%" stopColor="#888"/>
          </linearGradient>
          <radialGradient id="bmwCenter" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#333"/>
            <stop offset="100%" stopColor="#111"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Mercedes',
    available: true,
    count: 3,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#mbBg)" stroke="url(#mbGold)" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="36" fill="none" stroke="url(#mbGold)" strokeWidth="0.8"/>
        {/* Three-pointed star */}
        <polygon points="50,14 54,44 84,52 54,56 50,86 46,56 16,52 46,44" fill="url(#mbStar)" opacity="0.15"/>
        <line x1="50" y1="14" x2="50" y2="50" stroke="url(#mbGold)" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="50" y1="50" x2="77" y2="67" stroke="url(#mbGold)" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="50" y1="50" x2="23" y2="67" stroke="url(#mbGold)" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="5" fill="url(#mbGold)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#mbGold)" strokeWidth="0.4" opacity="0.4"/>
        <defs>
          <radialGradient id="mbBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1e1e1e"/>
            <stop offset="100%" stopColor="#080808"/>
          </radialGradient>
          <linearGradient id="mbGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d875"/>
            <stop offset="45%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#7a5c1a"/>
          </linearGradient>
          <radialGradient id="mbStar" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Audi',
    available: true,
    count: 5,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#audiBg)" stroke="url(#audiGold)" strokeWidth="1.5"/>
        {/* Four interlocking rings */}
        {[22, 33, 44, 55].map((cx, i) => (
          <g key={i}>
            <circle cx={cx + 4} cy="50" r="12" fill="none" stroke="url(#audiGold)" strokeWidth="2.5"/>
          </g>
        ))}
        <text x="50" y="72" textAnchor="middle" fontSize="6.5" fontWeight="700" fontFamily="sans-serif" fill="url(#audiGold)" letterSpacing="1.5">AUDI</text>
        <defs>
          <radialGradient id="audiBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#060606"/>
          </radialGradient>
          <linearGradient id="audiGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#8a6820"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Tesla',
    available: true,
    count: 6,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#teslaBg)" stroke="url(#teslaGold)" strokeWidth="1.5"/>
        {/* Tesla T logo */}
        <path d="M26 32 Q50 26 74 32 Q67 32 64 36 Q57 34 50 34 Q43 34 36 36 Q33 32 26 32Z" fill="url(#teslaGold)"/>
        <path d="M50 36 L50 78" stroke="url(#teslaGold)" strokeWidth="5" strokeLinecap="round"/>
        <defs>
          <radialGradient id="teslaBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1c1c1c"/>
            <stop offset="100%" stopColor="#080808"/>
          </radialGradient>
          <linearGradient id="teslaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d875"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#7a5c1a"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Porsche',
    available: false,
    count: 0,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#porBg)" stroke="url(#porGold)" strokeWidth="1.5"/>
        {/* Porsche crest */}
        <rect x="30" y="28" width="40" height="44" rx="4" fill="none" stroke="url(#porGold)" strokeWidth="1.2"/>
        <line x1="50" y1="28" x2="50" y2="72" stroke="url(#porGold)" strokeWidth="1.2"/>
        <line x1="30" y1="50" x2="70" y2="50" stroke="url(#porGold)" strokeWidth="1.2"/>
        {/* Horse silhouette (simplified) */}
        <path d="M42 38 Q45 33 50 35 Q55 33 58 38 Q56 42 50 43 Q44 42 42 38Z" fill="url(#porGold)"/>
        <path d="M48 43 L47 50 L50 52 L53 50 L52 43" fill="url(#porGold)" opacity="0.8"/>
        <text x="50" y="67" textAnchor="middle" fontSize="5" fontWeight="800" fontFamily="sans-serif" fill="url(#porGold)" letterSpacing="1">PORSCHE</text>
        <defs>
          <radialGradient id="porBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#181818"/>
            <stop offset="100%" stopColor="#060606"/>
          </radialGradient>
          <linearGradient id="porGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#8a6820"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Toyota',
    available: true,
    count: 8,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#toyBg)" stroke="url(#toyGold)" strokeWidth="1.5"/>
        {/* Toyota overlapping ellipses */}
        <ellipse cx="50" cy="50" rx="22" ry="14" fill="none" stroke="url(#toyGold)" strokeWidth="2.2"/>
        <ellipse cx="50" cy="50" rx="10" ry="22" fill="none" stroke="url(#toyGold)" strokeWidth="2.2"/>
        <ellipse cx="50" cy="37" rx="30" ry="8" fill="none" stroke="url(#toyGold)" strokeWidth="2.2"/>
        <defs>
          <radialGradient id="toyBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1a1a1a"/>
            <stop offset="100%" stopColor="#070707"/>
          </radialGradient>
          <linearGradient id="toyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d875"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#7a5c1a"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Ford',
    available: true,
    count: 3,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#fordBg)" stroke="url(#fordGold)" strokeWidth="1.5"/>
        {/* Ford oval */}
        <ellipse cx="50" cy="50" rx="36" ry="22" fill="url(#fordOval)" stroke="url(#fordGold)" strokeWidth="1.5"/>
        <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="Georgia, serif" fontStyle="italic" fill="url(#fordGold)" letterSpacing="0">Ford</text>
        <defs>
          <radialGradient id="fordBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#121e38"/>
            <stop offset="100%" stopColor="#060d1a"/>
          </radialGradient>
          <linearGradient id="fordOval" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1a3a"/>
            <stop offset="100%" stopColor="#040e22"/>
          </linearGradient>
          <linearGradient id="fordGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#8a6820"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Honda',
    available: true,
    count: 4,
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="url(#hondaBg)" stroke="url(#hondaGold)" strokeWidth="1.5"/>
        {/* Honda H */}
        <path d="M30 28 L30 72 M30 50 L70 50 M70 28 L70 72" stroke="url(#hondaGold)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <radialGradient id="hondaBg" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#1c1c1c"/>
            <stop offset="100%" stopColor="#080808"/>
          </radialGradient>
          <linearGradient id="hondaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d875"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#7a5c1a"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function BrandsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className="section-title">OUR <span>BRANDS</span></div>
            <div className="section-sub">Premium manufacturers in our fleet</div>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotGreen}`} />Available
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotRed}`} />Fully Booked
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className={`${styles.card} ${!brand.available ? styles.soldOut : ''}`}
            >
              <div className={styles.logoWrap}>
                {brand.svg}
              </div>
              <div className={styles.brandName}>{brand.name}</div>
              <div className={styles.brandCount}>
                {brand.available
                  ? <><span className={styles.countNum}>{brand.count}</span> cars ready</>
                  : <span className={styles.soldOutText}>Fully Booked</span>
                }
              </div>
              <div className={`${styles.avail} ${brand.available ? styles.availGreen : styles.availRed}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
