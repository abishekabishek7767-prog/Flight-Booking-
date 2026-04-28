import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackgroundDriftPlanes from './components/animations/BackgroundDriftPlanes';
import SideScrollPlane from './components/animations/SideScrollPlane';
import Preloader from './components/animations/Preloader';

// Production optimization: Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const SeatSelection = lazy(() => import('./pages/SeatSelection'));
const PassengerDetails = lazy(() => import('./pages/PassengerDetails'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const Profile = lazy(() => import('./pages/Profile'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const SavedTrips = lazy(() => import('./pages/SavedTrips'));

// Scroll to top on navigation helper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Preloader />
      <BackgroundDriftPlanes />
      <SideScrollPlane />
      <Navbar />
      <ScrollToTop />
      
      <main style={{ flex: '1 0 auto' }}>
        <Suspense fallback={<div style={{ height: '100vh', background: 'var(--color-bg-primary)' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/booking/:id" element={<SeatSelection />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/saved" element={<SavedTrips />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
