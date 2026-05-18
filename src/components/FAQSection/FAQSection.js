import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const FAQS = [
  {
    q: 'What documents do I need to rent a car?',
    a: "You'll need a valid driver's license (held for at least 1 year), a government-issued photo ID or passport, and a credit or debit card in your name for the security deposit. International renters must also present their passport.",
  },
  {
    q: 'Is there a minimum age requirement?',
    a: 'Yes. Renters must be at least 21 years old. Drivers between 21–24 may be subject to a Young Driver surcharge of $15/day. Drivers 25 and above are exempt from this fee.',
  },
  {
    q: 'How does the security deposit work?',
    a: 'A pre-authorization hold of $200–$500 (depending on car category) is placed on your card at pickup. This hold is released within 5–7 business days after the car is returned in original condition.',
  },
  {
    q: 'Can I cancel or modify my booking?',
    a: 'Free cancellation is available up to 48 hours before your pick-up time. Cancellations within 48 hours will incur a fee equal to one day's rental rate. Modifications can be made anytime from your My Bookings page.',
  },
  {
    q: 'Is insurance included in the rental price?',
    a: 'Basic third-party liability insurance is included in all rentals at no extra cost. Comprehensive Collision Damage Waiver (CDW) and Personal Accident Insurance (PAI) are available as add-ons during checkout.',
  },
  {
    q: 'What fuel policy applies?',
    a: 'All vehicles are provided with a full tank. You are expected to return the car with a full tank. If you return it with less fuel, we will charge the difference at our current pump rate plus a $15 refueling service fee.',
  },
  {
    q: 'Are there mileage limits?',
    a: 'Standard and compact rentals include 200 free miles per day. SUV and luxury vehicles include 150 free miles per day. Additional miles are billed at $0.20/mile for standard and $0.35/mile for luxury.',
  },
  {
    q: 'Can I pick up the car in one city and drop it off in another?',
    a: 'Yes, one-way rentals are available between select locations. A one-way fee ranging from $50–$200 applies depending on distance. Select your drop-off city during checkout to see the applicable fee.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>GOT QUESTIONS?</div>
          <div className="section-title">FREQUENTLY ASKED <span>QUESTIONS</span></div>
          <div className="section-sub" style={{ maxWidth: 480 }}>
            Everything you need to know before you hit the road.
          </div>
        </div>

        <div className={styles.grid}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.open : ''}`}
              onClick={() => toggle(i)}
            >
              <div className={styles.question}>
                <span className={styles.qNum}>0{i + 1}</span>
                <span className={styles.qText}>{faq.q}</span>
                <span className={styles.icon}>
                  <i className={`bi ${open === i ? 'bi-dash' : 'bi-plus'}`} />
                </span>
              </div>
              {open === i && (
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <i className="bi bi-headset" style={{ fontSize: '1.3rem', color: 'var(--gold)' }} />
          <span>Still have questions?</span>
          <a href="mailto:support@nexrentalhub.com" className={styles.ctaLink}>
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
