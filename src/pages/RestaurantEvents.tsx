import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from "lucide-react";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";  
import Footer from "@/components/Footer"; 
import { Event, events } from '@/data/events';
import { useUser } from "@clerk/clerk-react";
import { supabase } from '@/lib/supabase';

const RestaurantEvents = () => {
    const [restaurantEvents, setRestaurantEvents] = useState<Event[]>([]);
    const { user, isSignedIn } = useUser(); // Getting the user state from Clerk
    const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
    const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);

    // Fetch user's registrations when user is loaded

    useEffect(() => {
        const filteredEvents = events.filter(event => event.category === "Restaurant");
        setRestaurantEvents(filteredEvents);
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Restuarant Events</h1>
            
            {/* Optional: Show loading indicator while fetching registrations */}
            {/* {isLoadingRegistrations && <p>Loading registration status...</p>} */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantEvents.length > 0 ? (
                restaurantEvents.map((event) => (
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
                <p className="text-center text-gray-600 col-span-full">No Restaurant events found.</p>
              )}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/events" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View All Events
                <ArrowLeft className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      );
    };
    
    export default RestaurantEvents;
//