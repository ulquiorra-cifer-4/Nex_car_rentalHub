import React, { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

const SLIDES = [
  {
    bg:    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
    tag:   'Luxury Fleet',
    title: 'DRIVE IN\nSTYLE',
    sub:   'Premium cars for every occasion',
  },
  {
    bg:    'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1400&q=80',
    tag:   'Electric Collection',
    title: 'THE FUTURE\nIS NOW',
    sub:   'Zero emissions, maximum performance',
  },
  {
    bg:    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80',
    tag:   'Weekend Escapes',
    title: 'YOUR NEXT\nADVENTURE',
    sub:   'SUVs and sedans for every journey',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.carousel}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === active ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        >
          <div className={styles.overlay} />
          <div className={styles.content}>
            <span className={styles.tag}>{slide.tag}</span>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.sub}>{slide.sub}</p>
          </div>
        </div>
      ))}

      {/* Dot navigation */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
