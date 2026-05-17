import { useState, useEffect, useCallback } from 'react';
import { fetchBookingsByEmail } from '../utils/api';

/**
 * Custom hook to fetch and manage bookings for a given user.
 * @param {string|null} userEmail
 */
export function useBookings(userEmail) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetchBookingsByEmail(userEmail);
      setBookings(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => { load(); }, [load]);

  const displayed = statusFilter
    ? bookings.filter((b) => b.status === statusFilter)
    : bookings;

  return {
    bookings,
    displayed,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    reload: load,
  };
}
