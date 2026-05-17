import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useBookings } from '../../hooks/useBookings';
import Spinner from '../../components/Spinner/Spinner';
import { formatDate, calcRentalDays, STATUS_CONFIG, CAR_TYPE_ICONS, FUEL_TYPE_ICONS, FALLBACK_IMG } from '../../utils/helpers';
import styles from './MyBookingsPage.module.css';

const STATUS_TABS = ['', 'pending', 'confirmed', 'cancelled'];

export default function MyBookingsPage() {
  const { user } = useApp();
  const navigate  = useNavigate();

  // Redirect if not logged in
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

  const tabLabel = (s) => (s ? STATUS_CONFIG[s]?.label : 'All');
  const tabCount = (s) => (s ? bookings.filter((b) => b.status === s).length : bookings.length);

  return (
    <>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className="section-title">MY <span>BOOKINGS</span></div>
          <div className="section-sub">Manage your rental history</div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* Status filter tabs */}
        <div className={styles.tabs}>
          {STATUS_TABS.map((s) => (
            <button
              key={s || 'all'}
              className={`btn-outline-dim ${styles.tab} ${statusFilter === s ? styles.tabActive : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {tabLabel(s)}&nbsp;
              <span className={styles.tabCount}>{tabCount(s)}</span>
            </button>
          ))}
        </div>

        {/* States */}
        {loading ? (
          <div className={styles.center}>
            <Spinner />
          </div>
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
          <div>
            {displayed.map((booking) => (
              <BookingItem key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ── Individual booking card ─────────────────────────────────────────────── */
function BookingItem({ booking }) {
  const car   = booking.carId;
  const st    = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;
  const days  = calcRentalDays(booking.startDate, booking.endDate);

  return (
    <div className={styles.item}>
      {/* Thumbnail */}
      {car?.imageUrl ? (
        <img
          className={styles.thumb}
          src={car.imageUrl}
          alt={car?.name}
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
      ) : (
        <div className={`${styles.thumb} ${styles.thumbPlaceholder}`}>
          <i className="bi bi-car-front" />
        </div>
      )}

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.carTitle}>{car?.name || 'Unknown Car'}</div>

        {car && (
          <div className={styles.carMeta}>
            <i className={`bi ${CAR_TYPE_ICONS[car.carType] || 'bi-car-front'} me-1`} />
            {car.carType}&nbsp;&bull;&nbsp;
            <i className={`bi ${FUEL_TYPE_ICONS[car.fuelType] || 'bi-fuel-pump'} me-1`} />
            {car.fuelType}
          </div>
        )}

        <div className={styles.dates}>
          <i className="bi bi-calendar-range me-1" />
          {formatDate(booking.startDate)} &rarr; {formatDate(booking.endDate)}
          {days > 0 && ` (${days} day${days !== 1 ? 's' : ''})`}
        </div>

        <span className={`status-pill ${st.cls}`}>{st.label}</span>
      </div>

      {/* Price + booked date */}
      <div className={styles.priceCol}>
        <div className={styles.price}>${booking.totalPrice?.toFixed(2)}</div>
        <div className={styles.priceLabel}>total</div>
        <div className={styles.bookedOn}>
          Booked {formatDate(booking.createdAt)}
        </div>
      </div>
    </div>
  );
}
