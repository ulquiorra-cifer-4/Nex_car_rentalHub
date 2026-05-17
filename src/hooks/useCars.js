import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCars } from '../utils/api';

const DEFAULT_FILTERS = {
  carType: '',
  fuelType: '',
  minPrice: '',
  maxPrice: '',
};

/**
 * Custom hook that manages car fetching + client-side filter state.
 * Debounces API calls by 500ms when price inputs change.
 */
export function useCars() {
  const [cars, setCars]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const debounceRef           = useRef(null);

  const loadCars = useCallback(async (activeFilters) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchCars(activeFilters);
      setCars(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cars.');
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadCars(DEFAULT_FILTERS);
  }, [loadCars]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => loadCars(next), 500);
      return next;
    });
  }, [loadCars]);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    loadCars(DEFAULT_FILTERS);
  }, [loadCars]);

  return { cars, loading, error, filters, handleFilterChange, handleReset };
}
