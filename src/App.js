import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import MyBookingsPage from './pages/MyBookingsPage/MyBookingsPage';
import AuthModal from './components/AuthModal/AuthModal';
import ToastContainer from './components/Toast/ToastContainer';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer/Footer';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar onAuthClick={() => setShowAuth(true)} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        {/* Global toast notifications */}
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
}
