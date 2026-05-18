import React, { useState } from 'react';
import styles from './PaymentModal.module.css';

/**
 * Realistic-looking (non-functional) payment modal.
 * Simulates card entry + processing for internship demo purposes.
 */
export default function PaymentModal({ booking, onClose, onSuccess }) {
  const [tab, setTab]           = useState('card'); // 'card' | 'upi' | 'netbank'
  const [cardNum, setCardNum]   = useState('');
  const [expiry, setExpiry]     = useState('');
  const [cvv, setCvv]           = useState('');
  const [holder, setHolder]     = useState('');
  const [upiId, setUpiId]       = useState('');
  const [bank, setBank]         = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState('');

  const car    = booking.carId;
  const amount = booking.totalPrice?.toFixed(2);

  /* Format card number with spaces */
  const handleCardNum = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNum(raw.replace(/(.{4})/g, '$1 ').trim());
  };

  /* Format expiry MM/YY */
  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiry(raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw);
  };

  const getCardType = () => {
    const n = cardNum.replace(/\s/g, '');
    if (n.startsWith('4'))  return { icon: 'bi-credit-card-2-front', label: 'Visa' };
    if (n.startsWith('5'))  return { icon: 'bi-credit-card-fill',    label: 'Mastercard' };
    if (n.startsWith('37')) return { icon: 'bi-credit-card',          label: 'Amex' };
    return null;
  };

  const handlePay = () => {
    // Basic validation
    if (tab === 'card') {
      if (cardNum.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number.'); return; }
      if (expiry.length < 5) { setError('Enter a valid expiry date.'); return; }
      if (cvv.length < 3)    { setError('Enter a valid CVV.'); return; }
      if (!holder.trim())    { setError("Enter the cardholder's name."); return; }
    } else if (tab === 'upi') {
      if (!upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. name@upi).'); return; }
    } else {
      if (!bank) { setError('Please select your bank.'); return; }
    }

    setError('');
    setProcessing(true);
    // Simulate 2.5s processing
    setTimeout(() => { setProcessing(false); setDone(true); onSuccess?.(); }, 2500);
  };

  const cardType = getCardType();

  /* ── Success screen ─────────────────────────────────────────────────────── */
  if (done) {
    return (
      <div className="modal-backdrop-custom" onClick={onClose}>
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successScreen}>
            <div className={styles.successRing}>
              <i className="bi bi-check-lg" />
            </div>
            <div className={styles.successTitle}>PAYMENT SUCCESSFUL</div>
            <div className={styles.successAmt}>₹{(amount * 83).toFixed(0)}</div>
            <div className={styles.successSub}>
              Your booking for <strong>{car?.name}</strong> has been confirmed.
              A receipt has been sent to your email.
            </div>
            <div className={styles.receiptBox}>
              <div className={styles.receiptRow}><span>Transaction ID</span><span>TXN{Date.now().toString().slice(-8)}</span></div>
              <div className={styles.receiptRow}><span>Date</span><span>{new Date().toLocaleDateString()}</span></div>
              <div className={styles.receiptRow}><span>Method</span><span>{tab === 'card' ? `•••• ${cardNum.slice(-4)}` : tab === 'upi' ? 'UPI' : 'Net Banking'}</span></div>
              <div className={`${styles.receiptRow} ${styles.receiptTotal}`}><span>Amount Paid</span><span>${amount}</span></div>
            </div>
            <button className="btn-gold w-100" style={{ marginTop: '1rem', padding: '12px' }} onClick={onClose}>
              <i className="bi bi-house me-2" />Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main payment form ──────────────────────────────────────────────────── */
  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>SECURE PAYMENT</div>
            <div className={styles.subtitle}>
              <i className="bi bi-shield-lock-fill me-1" style={{ color: '#4ade80' }} />
              256-bit SSL Encrypted
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><i className="bi bi-x" /></button>
        </div>

        <div className={styles.body}>
          {/* Order summary */}
          <div className={styles.orderBox}>
            <div className={styles.orderLeft}>
              {car?.imageUrl && (
                <img src={car.imageUrl} alt={car.name} className={styles.orderThumb}
                  onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <div>
                <div className={styles.orderCar}>{car?.name || 'Your Car'}</div>
                <div className={styles.orderSub}>{car?.carType} · {car?.fuelType}</div>
              </div>
            </div>
            <div className={styles.orderAmt}>${amount}</div>
          </div>

          {/* Payment method tabs */}
          <div className={styles.tabs}>
            {[
              { key: 'card',    icon: 'bi-credit-card-2-front', label: 'Card' },
              { key: 'upi',     icon: 'bi-phone',               label: 'UPI' },
              { key: 'netbank', icon: 'bi-bank',                 label: 'Net Banking' },
            ].map((t) => (
              <button
                key={t.key}
                className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
                onClick={() => { setTab(t.key); setError(''); }}
              >
                <i className={`bi ${t.icon}`} />{t.label}
              </button>
            ))}
          </div>

          {/* ── Card tab ── */}
          {tab === 'card' && (
            <div className={styles.cardForm}>
              {/* Visual card preview */}
              <div className={styles.cardPreview}>
                <div className={styles.cardChip}>
                  <div className={styles.chipInner} />
                </div>
                <div className={styles.cardNumber}>
                  {cardNum || '•••• •••• •••• ••••'}
                </div>
                <div className={styles.cardBottom}>
                  <div>
                    <div className={styles.cardLabel}>Cardholder</div>
                    <div className={styles.cardValue}>{holder || 'YOUR NAME'}</div>
                  </div>
                  <div>
                    <div className={styles.cardLabel}>Expires</div>
                    <div className={styles.cardValue}>{expiry || 'MM/YY'}</div>
                  </div>
                  {cardType && (
                    <div className={styles.cardBrand}>
                      <i className={`bi ${cardType.icon}`} /> {cardType.label}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Card Number</label>
                <input className="form-control-dark" placeholder="1234 5678 9012 3456"
                  value={cardNum} onChange={handleCardNum} maxLength={19} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Cardholder Name</label>
                <input className="form-control-dark" placeholder="John Doe"
                  value={holder} onChange={(e) => setHolder(e.target.value.toUpperCase())} />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div className={styles.field}>
                    <label className={styles.label}>Expiry</label>
                    <input className="form-control-dark" placeholder="MM/YY"
                      value={expiry} onChange={handleExpiry} maxLength={5} />
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.field}>
                    <label className={styles.label}>CVV</label>
                    <input className="form-control-dark" placeholder="•••" type="password"
                      value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} maxLength={4} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── UPI tab ── */}
          {tab === 'upi' && (
            <div className={styles.upiForm}>
              <div className={styles.upiApps}>
                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                  <button
                    key={app}
                    className={`${styles.upiApp} ${upiId === app.toLowerCase() + '@upi' ? styles.upiAppActive : ''}`}
                    onClick={() => setUpiId(app.toLowerCase() + '@upi')}
                  >
                    {app}
                  </button>
                ))}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Or enter UPI ID</label>
                <input className="form-control-dark" placeholder="yourname@upi"
                  value={upiId} onChange={(e) => { setUpiId(e.target.value); setError(''); }} />
              </div>
            </div>
          )}

          {/* ── Net Banking tab ── */}
          {tab === 'netbank' && (
            <div className={styles.bankForm}>
              <label className={styles.label}>Select Your Bank</label>
              <div className={styles.bankGrid}>
                {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak', 'Yes Bank'].map((b) => (
                  <button
                    key={b}
                    className={`${styles.bankBtn} ${bank === b ? styles.bankActive : ''}`}
                    onClick={() => { setBank(b); setError(''); }}
                  >
                    <i className="bi bi-bank2 mb-1" style={{ fontSize: '1.2rem', display: 'block' }} />
                    <span>{b}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert-danger-dark" style={{ marginTop: '0.8rem' }}>
              <i className="bi bi-x-circle me-1" />{error}
            </div>
          )}

          {/* Accepted cards row */}
          <div className={styles.acceptedRow}>
            <span className={styles.acceptedLabel}>Accepted:</span>
            <i className="bi bi-credit-card-2-front" title="Visa" />
            <i className="bi bi-credit-card-fill" title="Mastercard" />
            <i className="bi bi-credit-card" title="Amex" />
            <i className="bi bi-paypal" title="PayPal" />
          </div>

          {/* Pay button */}
          <button
            className={`btn-gold w-100 ${styles.payBtn}`}
            onClick={handlePay}
            disabled={processing}
          >
            {processing ? (
              <span className={styles.processingInner}>
                <span className={styles.processingDots}>
                  <span /><span /><span />
                </span>
                Processing payment...
              </span>
            ) : (
              <><i className="bi bi-lock-fill me-2" />Pay ${amount}</>
            )}
          </button>

          <div className={styles.disclaimer}>
            <i className="bi bi-shield-check me-1" />
            Your payment info is encrypted and never stored on our servers.
          </div>
        </div>
      </div>
    </div>
  );
}
