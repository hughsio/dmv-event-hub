import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn, RedirectToSignUp } from '@clerk/clerk-react';
import Index from './pages/Index';
import ExploreEvents from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Link } from 'react-router-dom';
import MuseumEvents from './pages/MuseumEvents';
import RestaurantEvents from './pages/RestaurantEvents';

import CalendarView from './pages/Calendar';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/explore" element={<ExploreEvents />} />
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/event/:eventId" element={<EventDetails />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/museum-events" element={<MuseumEvents />} />
      <Route path='/restaurant-events' element={<RestaurantEvents />} />

      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <>
            <SignedIn>
              <Profile />
            </SignedIn>
            <SignedOut>
              <RedirectToSignUp />
            </SignedOut>
          </>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
