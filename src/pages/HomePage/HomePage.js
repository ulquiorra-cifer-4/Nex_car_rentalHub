import React, { useState } from 'react';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import FilterBar from '../../components/FilterBar/FilterBar';
import CarCard from '../../components/CarCard/CarCard';
import BrandsSection from '../../components/BrandsSection/BrandsSection';
import BookingModal from '../../components/BookingModal/BookingModal';
import AuthModal from '../../components/AuthModal/AuthModal';
import Spinner from '../../components/Spinner/Spinner';
import { useCars } from '../../hooks/useCars';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { cars, loading, error, filters, handleFilterChange, handleReset } = useCars();

  const [selectedCar, setSelectedCar] = useState(null);
  const [showAuth,    setShowAuth]    = useState(false);

  return (
    <>
      <HeroCarousel />

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        total={cars.length}
        loading={loading}
      />

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        {/* Section heading */}
        <div className={styles.sectionHead}>
          <div>
            <div className="section-title">AVAILABLE <span>FLEET</span></div>
            <div className="section-sub">Choose your perfect ride</div>
          </div>
        </div>

        {/* States: loading / error / empty / grid */}
        {loading ? (
          <div className={styles.center}>
            <Spinner />
            <div className={styles.loadingText}>Loading fleet...</div>
          </div>
        ) : error ? (
          <div className={styles.center}>
            <div className="empty-state__icon"><i className="bi bi-wifi-off" /></div>
            <div className="empty-state__title">Connection Error</div>
            <div className="empty-state__subtitle">{error}</div>
            <button className="btn-gold mt-3" onClick={handleReset}>Retry</button>
          </div>
        ) : cars.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon"><i className="bi bi-car-front" /></div>
            <div className="empty-state__title">No Cars Found</div>
            <div className="empty-state__subtitle">Try adjusting your filters</div>
            <button className="btn-gold mt-3" onClick={handleReset}>Clear Filters</button>
          </div>
        ) : (
          <div className="row g-4">
            {cars.map((car) => (
              <div key={car._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <CarCard car={car} onBook={setSelectedCar} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onAuthNeeded={() => setShowAuth(true)}
        />
      )}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Brand logos strip */}
      <BrandsSection />
    </>
  );
}
