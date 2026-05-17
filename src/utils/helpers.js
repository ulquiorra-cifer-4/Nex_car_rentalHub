/**
 * Format a date string or Date object to a readable string.
 * e.g. "Aug 1, 2024"
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate rental days between two date strings.
 * Returns 0 if invalid or end <= start.
 */
export function calcRentalDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const diff = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
  return diff > 0 ? diff : 0;
}

/**
 * Returns today's date as "YYYY-MM-DD" for use as min on date inputs.
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

/** Icon map for car type */
export const CAR_TYPE_ICONS = {
  sedan:   'bi-car-front',
  SUV:     'bi-truck',
  luxury:  'bi-gem',
  compact: 'bi-car-front-fill',
  minivan: 'bi-bus-front',
};

/** Icon map for fuel type */
export const FUEL_TYPE_ICONS = {
  petrol:   'bi-fuel-pump',
  diesel:   'bi-fuel-pump-diesel',
  electric: 'bi-lightning-charge',
};

/** Status display config */
export const STATUS_CONFIG = {
  pending:   { label: 'Pending',   cls: 'status-pending'   },
  confirmed: { label: 'Confirmed', cls: 'status-confirmed' },
  cancelled: { label: 'Cancelled', cls: 'status-cancelled' },
};

/** Fallback image for broken car images */
export const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=60';
