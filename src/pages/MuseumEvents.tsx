import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Event, events } from '@/data/events';
import { useUser } from '@clerk/clerk-react'; // Import Clerk hook
import { supabase } from '@/lib/supabase'; // Import Supabase client

const MuseumEvents = () => {
  const [museumEvents, setMuseumEvents] = useState<Event[]>([]);
  const { user, isSignedIn } = useUser(); // Get user state from Clerk
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);

  // Filter local events for the museum category
  useEffect(() => {
    const filteredEvents = events.filter(event => event.category === 'Museums');
    setMuseumEvents(filteredEvents);
  }, []); 

  // Fetch user's registrations when user is loaded
  useEffect(() => {
    const fetchRegistrations = async () => {
      if (isSignedIn && user) {
        setIsLoadingRegistrations(true);
        try {
          const { data, error } = await supabase
            .from('registrations')
            .select('event_id') // Only select the event_id column
            .eq('user_id', user.id); // Filter by the current user's ID

          if (error) {
            console.error("Error fetching registrations:", error);
            throw error;
          }

          // Create a Set of event IDs the user is registered for
          const eventIdSet = new Set(data?.map(reg => reg.event_id) || []);
          setRegisteredEventIds(eventIdSet);

        } catch (err) {
          // Handle potential errors during fetch (optional: show error message)
          setRegisteredEventIds(new Set()); // Reset on error
        } finally {
          setIsLoadingRegistrations(false);
        }
      } else {
        // If user is not signed in, clear any existing registration data
        setRegisteredEventIds(new Set());
      }
    };

    fetchRegistrations();
  }, [user, isSignedIn]); // Re-run this effect if user or isSignedIn changes

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Museum Events</h1>
        
        {/* Optional: Show loading indicator while fetching registrations */}
        {/* {isLoadingRegistrations && <p>Loading registration status...</p>} */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {museumEvents.length > 0 ? (
            museumEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                // Pass the registration status down to the card
                isInitiallyRegistered={registeredEventIds.has(event.id)}
                // You might need to re-add like/save props if they were managed by a context before
                // likeEvent={...} 
                // saveEvent={...}
                // removeSavedEvent={...}
                // isEventLiked={...}
                // isEventSaved={...}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No museum events found.</p>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/events" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View All Events
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MuseumEvents;