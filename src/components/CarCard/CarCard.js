import React from 'react';
import { CAR_TYPE_ICONS, FUEL_TYPE_ICONS, FALLBACK_IMG } from '../../utils/helpers';
import styles from './CarCard.module.css';

export default function CarCard({ car, onBook }) {
  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imgWrap}>
        <img
          src={car.imageUrl}
          alt={car.name}
          className={styles.img}
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        <span className={styles.badge}>
          <i className={`bi ${CAR_TYPE_ICONS[car.carType] || 'bi-car-front'} me-1`} />
          {car.carType}
        </span>
        <span
          className={`${styles.availDot} ${car.available ? styles.available : styles.unavailable}`}
          title={car.available ? 'Available' : 'Unavailable'}
        />
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.name}>{car.name}</div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <i className={`bi ${FUEL_TYPE_ICONS[car.fuelType] || 'bi-fuel-pump'}`} />
            {car.fuelType}
          </span>
          <span className={styles.metaItem}>
            <i className="bi bi-people" />
            {car.seats} seats
          </span>
        </div>

        <div className={styles.priceRow}>
          <div>
            <div className={styles.price}>${car.pricePerDay}</div>
            <div className={styles.priceLabel}>per day</div>
          </div>
          <button
            className={styles.bookBtn}
            disabled={!car.available}
            onClick={() => onBook(car)}
          >
            {car.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}
