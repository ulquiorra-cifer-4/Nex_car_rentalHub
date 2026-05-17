import React from 'react';
import styles from './FilterBar.module.css';

const CAR_TYPES  = ['sedan', 'SUV', 'luxury', 'compact', 'minivan'];
const FUEL_TYPES = ['petrol', 'diesel', 'electric'];

export default function FilterBar({ filters, onChange, onReset, total, loading }) {
  return (
    <div className={styles.bar}>
      <div className="container">
        <div className="row g-2 align-items-end">

          {/* Car Type */}
          <div className="col-6 col-sm-3 col-lg-2">
            <label className={styles.label}>Car Type</label>
            <select
              className={styles.select}
              value={filters.carType}
              onChange={(e) => onChange('carType', e.target.value)}
            >
              <option value="">All Types</option>
              {CAR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div className="col-6 col-sm-3 col-lg-2">
            <label className={styles.label}>Fuel Type</label>
            <select
              className={styles.select}
              value={filters.fuelType}
              onChange={(e) => onChange('fuelType', e.target.value)}
            >
              <option value="">All Fuels</option>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="col-6 col-sm-3 col-lg-2">
            <label className={styles.label}>Min Price/day</label>
            <input
              type="number"
              className={styles.input}
              placeholder="$0"
              value={filters.minPrice}
              min={0}
              onChange={(e) => onChange('minPrice', e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div className="col-6 col-sm-3 col-lg-2">
            <label className={styles.label}>Max Price/day</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Any"
              value={filters.maxPrice}
              min={0}
              onChange={(e) => onChange('maxPrice', e.target.value)}
            />
          </div>

          {/* Reset */}
          <div className="col-6 col-sm-3 col-lg-2 d-flex align-items-end">
            <button className={`btn-outline-dim w-100 ${styles.resetBtn}`} onClick={onReset}>
              <i className="bi bi-arrow-counterclockwise me-1" />Reset
            </button>
          </div>

          {/* Result count */}
          <div className="col-6 col-sm-3 col-lg-2 d-flex align-items-end justify-content-end">
            <span className={styles.count}>
              {loading ? '...' : `${total} car${total !== 1 ? 's' : ''} found`}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
