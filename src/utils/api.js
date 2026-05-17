import axios from 'axios';

const BASE_URL = 'https://nex-rental-hub.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Cars ──────────────────────────────────────────────────────────────────────

/**
 * Fetch all cars with optional filters.
 * @param {{ carType?, fuelType?, minPrice?, maxPrice?, available? }} filters
 */
export const fetchCars = (filters = {}) => {
  const params = {};
  if (filters.carType)  params.carType  = filters.carType;
  if (filters.fuelType) params.fuelType = filters.fuelType;
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  if (filters.available !== undefined) params.available = filters.available;
  return api.get('/cars', { params });
};

export const fetchCarById = (id) => api.get(`/cars/${id}`);

// ── Bookings ──────────────────────────────────────────────────────────────────

/**
 * Create a new booking. totalPrice is auto-calculated by the backend.
 */
export const createBooking = ({ carId, userEmail, startDate, endDate }) =>
  api.post('/bookings', { carId, userEmail, startDate, endDate });

/**
 * Fetch all bookings for a given user email.
 */
export const fetchBookingsByEmail = (userEmail, status) => {
  const params = { userEmail };
  if (status) params.status = status;
  return api.get('/bookings', { params });
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const registerUser = ({ name, email, password }) =>
  api.post('/users/register', { name, email, password });

export const loginUser = ({ email, password }) =>
  api.post('/users/login', { email, password });

export default api;
