import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useBookings } from '../../hooks/useBookings';
import Spinner from '../../components/Spinner/Spinner';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import {
  formatDate,
  calcRentalDays,
  STATUS_CONFIG,
  CAR_TYPE_ICONS,
  FUEL_TYPE_ICONS,
  FALLBACK_IMG,
} from '../../utils/helpers';
import styles from './MyBookingsPage.module.css';

const STATUS_TABS = ['', 'pending', 'confirmed', 'cancelled'];

export default function MyBookingsPage() {
  const { user } = useApp();
  const navigate  = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const {
    bookings,
    displayed,
    loading,
    error,
    statusFilter,
    setStatusFilter,
  } = useBookings(user?.email);

  const [payingBooking, setPayingBooking] = useState(null);

  const tabLabel = (s) => (s ? STATUS_CONFIG[s]?.label : 'All');
  const tabCount = (s) => (s ? bookings.filter((b) => b.status === s).length : bookings.length);

  const totalSpent = bookings.filter(b => b.status !== 'cancelled').reduce((a, b) => a + (b.totalPrice || 0), 0);
  const confirmed  = bookings.filter(b => b.status === 'confirmed').length;
  const pending    = bookings.filter(b => b.status === 'pending').length;

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerInner}>
            <div>
              <div className="section-title">MY <span>BOOKINGS</span></div>
              <div className="section-sub">Track and manage your rental history</div>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button className="btn-gold">
                <i className="bi bi-plus-lg me-2" />New Booking
              </button>
            </Link>
          </div>

          {bookings.length > 0 && (
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statVal}>{bookings.length}</div>
                <div className={styles.statLabel}>Total Bookings</div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statVal} ${styles.green}`}>{confirmed}</div>
                <div className={styles.statLabel}>Confirmed</div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statVal} ${styles.amber}`}>{pending}</div>
                <div className={styles.statLabel}>Pending Payment</div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statVal} ${styles.gold}`}>${totalSpent.toFixed(0)}</div>
                <div className={styles.statLabel}>Total Spent</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className={styles.tabs}>
          {STATUS_TABS.map((s) => (
            <button
              key={s || 'all'}
              className={`btn-outline-dim ${styles.tab} ${statusFilter === s ? styles.tabActive : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {tabLabel(s)}&nbsp;<span className={styles.tabCount}>{tabCount(s)}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.center}><Spinner /></div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-state__icon"><i className="bi bi-wifi-off" /></div>
            <div className="empty-state__title">Failed to Load</div>
            <div className="empty-state__subtitle">{error}</div>
          </div>
        ) : displayed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon"><i className="bi bi-calendar-x" /></div>
            <div className="empty-state__title">No Bookings Yet</div>
            <div className="empty-state__subtitle">
              {statusFilter ? 'No bookings with this status.' : 'Start by browsing our fleet.'}
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button className="btn-gold mt-3">
                <i className="bi bi-grid me-2" />Browse Cars
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {displayed.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onPay={() => setPayingBooking(booking)}
              />
            ))}
          </div>
        )}
      </div>

      {payingBooking && (
        <PaymentModal
          booking={payingBooking}
          onClose={() => setPayingBooking(null)}
          onSuccess={() => setTimeout(() => setPayingBooking(null), 200)}
        />
      )}
    </>
  );
}

function BookingCard({ booking, onPay }) {
  const [expanded, setExpanded] = useState(false);
  const car  = booking.carId;
  const st   = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
  const days = calcRentalDays(booking.startDate, booking.endDate);

  return (
    <div className={styles.card}>
      <div className={styles.cardMain}>
        <div className={styles.thumbWrap}>
          <img
            className={styles.thumb}
            src={car?.imageUrl || FALLBACK_IMG}
            alt={car?.name}
            onError={(e) => { e.target.src = FALLBACK_IMG; }}
          />
          <div className={`${styles.thumbBadge} ${booking.status === 'confirmed' ? styles.thumbGreen : booking.status === 'cancelled' ? styles.thumbRed : styles.thumbAmber}`}>
            {st.label}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.carTitle}>{car?.name || 'Unknown Vehicle'}</div>
          {car && (
            <div className={styles.carTags}>
              <span className={styles.tag}><i className={`bi ${CAR_TYPE_ICONS[car.carType] || 'bi-car-front'}`} />{car.carType}</span>
              <span className={styles.tag}><i className={`bi ${FUEL_TYPE_ICONS[car.fuelType] || 'bi-fuel-pump'}`} />{car.fuelType}</span>
              <span className={styles.tag}><i className="bi bi-people" />{car.seats} seats</span>
            </div>
          )}
          <div className={styles.dateRow}>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>Pick-up</div>
              <div className={styles.dateVal}>{formatDate(booking.startDate)}</div>
            </div>
            <div className={styles.dateSep}>
              <i className="bi bi-arrow-right" />
              <span>{days} day{days !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.dateBlock}>
              <div className={styles.dateLabel}>Return</div>
              <div className={styles.dateVal}>{formatDate(booking.endDate)}</div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.price}>${booking.totalPrice?.toFixed(2)}</div>
          <div className={styles.priceLabel}>${car?.pricePerDay}/day × {days}d</div>
          <div className={styles.actionBtns}>
            {booking.status === 'pending' && (
              <button className="btn-gold w-100" style={{ padding: '8px', fontSize: '0.82rem' }} onClick={onPay}>
                <i className="bi bi-credit-card me-1" />Pay Now
              </button>
            )}
            <button className={`btn-outline-dim w-100 ${styles.detailsBtn}`} onClick={() => setExpanded(!expanded)}>
              <i className={`bi bi-chevron-${expanded ? 'up' : 'down'} me-1`} />
              {expanded ? 'Less' : 'Details'}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className={styles.expanded}>
          <div className={styles.expandedGrid}>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Booking ID</span>
              <span className={styles.expandVal} style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{booking._id}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Booked On</span>
              <span className={styles.expandVal}>{formatDate(booking.createdAt)}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Status</span>
              <span className={`status-pill ${st.cls}`}>{st.label}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Daily Rate</span>
              <span className={styles.expandVal}>${car?.pricePerDay}/day</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Duration</span>
              <span className={styles.expandVal}>{days} day{days !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandLabel}>Total</span>
              <span className={styles.expandVal} style={{ color: 'var(--gold)', fontWeight: 600 }}>${booking.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.pickupInfo}>
            <i className="bi bi-geo-alt-fill" style={{ color: 'var(--gold)' }} />
            <span>Pick-up: <strong>42 Motorway Blvd, San Francisco, CA 94102</strong></span>
          </div>
          <div className={styles.includes}>
            {['Basic Insurance', 'Roadside Assistance', '24/7 Support', 'GPS Navigation'].map((f) => (
              <span key={f} className={styles.includeChip}>
                <i className="bi bi-check-circle-fill" style={{ color: '#4ade80', fontSize: '0.75rem' }} />{f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
