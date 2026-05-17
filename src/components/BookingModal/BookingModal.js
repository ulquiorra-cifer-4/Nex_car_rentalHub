import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { createBooking } from '../../utils/api';
import { calcRentalDays, todayISO, CAR_TYPE_ICONS, FUEL_TYPE_ICONS, FALLBACK_IMG } from '../../utils/helpers';
import Spinner from '../Spinner/Spinner';
import styles from './BookingModal.module.css';

export default function BookingModal({ car, onClose, onAuthNeeded }) {
  const { user, toast } = useApp();

  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState(false);

  const today = todayISO();
  const days  = calcRentalDays(startDate, endDate);
  const total = (days * car.pricePerDay).toFixed(2);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async () => {
    if (!user) { onClose(); onAuthNeeded(); return; }
    if (!startDate || !endDate) { setError('Please select both pick-up and return dates.'); return; }
    if (days <= 0) { setError('Return date must be after pick-up date.'); return; }

    setError('');
    setLoading(true);
    try {
      await createBooking({
        carId:     car._id,
        userEmail: user.email,
        startDate,
        endDate,
      });
      setSuccess(true);
      toast(`Booking confirmed for ${car.name}!`, 'success');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ─────────────────────────────────────────────────── */
  if (success) {
    return (
      <div className="modal-backdrop-custom" onClick={handleBackdropClick}>
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>
              <i className="bi bi-check-circle-fill" />
            </div>
            <div className={styles.successTitle}>BOOKING CONFIRMED</div>
            <p className={styles.successSub}>
              Your <strong>{car.name}</strong> is reserved for{' '}
              <strong>{days} day{days !== 1 ? 's' : ''}</strong>.<br />
              Total: <span className={styles.gold}>${total}</span>
            </p>
            <button className="btn-gold w-100" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main booking form ──────────────────────────────────────────────── */
  return (
    <div className="modal-backdrop-custom" onClick={handleBackdropClick}>
      <div className={`${styles.box} ${styles.wide}`} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>BOOK YOUR CAR</div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <i className="bi bi-x" />
          </button>
        </div>

        <div className={styles.body}>
          {/* Car summary */}
          <div className={styles.carHeader}>
            <img
              className={styles.carThumb}
              src={car.imageUrl}
              alt={car.name}
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
            <div>
              <div className={styles.carName}>{car.name}</div>
              <div className={styles.carMeta}>
                <i className={`bi ${CAR_TYPE_ICONS[car.carType] || 'bi-car-front'} me-1`} />
                {car.carType}&nbsp;&bull;&nbsp;
                <i className={`bi ${FUEL_TYPE_ICONS[car.fuelType] || 'bi-fuel-pump'} me-1`} />
                {car.fuelType}&nbsp;&bull;&nbsp;
                <i className="bi bi-people me-1" />{car.seats} seats
              </div>
              <div className={styles.carRate}>
                <span className={styles.gold}>${car.pricePerDay}</span>/day
              </div>
            </div>
          </div>

          {/* Sign-in nudge */}
          {!user && (
            <div className="alert-danger-dark">
              <i className="bi bi-exclamation-triangle me-1" />
              You need to{' '}
              <span
                className={styles.signInLink}
                onClick={() => { onClose(); onAuthNeeded(); }}
              >
                sign in
              </span>{' '}
              to make a booking.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert-danger-dark">
              <i className="bi bi-x-circle me-1" />{error}
            </div>
          )}

          {/* Date pickers */}
          <div className="row g-3">
            <div className="col-6">
              <label className={styles.fieldLabel}>Pick-up Date</label>
              <input
                type="date"
                className="form-control-dark"
                min={today}
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setError(''); }}
              />
            </div>
            <div className="col-6">
              <label className={styles.fieldLabel}>Return Date</label>
              <input
                type="date"
                className="form-control-dark"
                min={startDate || today}
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setError(''); }}
              />
            </div>
          </div>

          {/* Price breakdown */}
          {days > 0 && (
            <div className={styles.priceBox}>
              <div className={styles.priceRow}>
                <span>Rate</span><span>${car.pricePerDay}/day</span>
              </div>
              <div className={styles.priceRow}>
                <span>Duration</span><span>{days} day{days !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.priceTotal}>
                <span className={styles.priceTotalLabel}>Total</span>
                <span className={styles.priceTotalVal}>${total}</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            className={`btn-gold w-100 ${styles.submitBtn}`}
            onClick={handleSubmit}
            disabled={loading || !startDate || !endDate || days <= 0}
          >
            {loading ? (
              <><Spinner size="sm" />&nbsp;&nbsp;Processing...</>
            ) : (
              <><i className="bi bi-calendar-check me-2" />Confirm Booking</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
