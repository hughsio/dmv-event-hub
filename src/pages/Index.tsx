import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { events } from '@/data/events';
import { useAuth } from '@clerk/clerk-react';

const Index = () => {
  const { isSignedIn } = useAuth();
  const featuredEvents = events.filter(event => event.isFeatured);
  const upcomingEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-dmv-blue text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover<span className="text-dmv-pink"> DMV's</span> Best Events
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Explore the hottest events happening in DMV! 
              Find concerts, festivals, workshops, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/explore">
                <Button size="lg" className="bg-dmv-gold hover:bg-dmv-gold/90 text-dmv-blue font-semibold">
                  Find Events
                </Button>
              </Link>
              {isSignedIn && (
                <Link to="/profile">
                  <Button size="lg" variant="outline" className="border-white text-dmv-blue hover:bg-white/10">
                    My Events
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="py-16 px-4 bg-dmv-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Featured Events</h2>
            <Link to="/explore" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              See all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {featuredEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Museum Events */}
      <section className="py-16 px-4 bg-dmv-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Museum Events</h2>
            <Link to="/museum-events" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              See all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events
              .filter(event => event.category === 'Museums')
              .slice(0, 4)
              .map(event => (
                <EventCard key={event.id} event={event} />
              ))
            }
          </div>
          <div className="text-center mt-8">
            <Link to="/museum-events">
              <Button size="lg" className="bg-dmv-blue hover:bg-dmv-blue/90 text-white">
                View All Museum Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Events */}
      <section className="py-16 px-4 bg-dmv-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Restaurant Events</h2>
            <Link to="/restaurant-events" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              See all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events
              .filter(event => event.category === 'Restaurant')
              .slice(0, 4)
              .map(event => (
                <EventCard key={event.id} event={event} />
              ))
            }
          </div>
          <div className="text-center mt-8">
            <Link to="/restaurant-events"> 
              <Button size="lg" className="bg-dmv-blue hover:bg-dmv-blue/90 text-white">
                View All Restaurant Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Upcoming Events</h2>
            <Link to="/explore" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              See all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call To Action Section */}
      <section className="py-16 px-4 bg-dmv-pink/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-dmv-blue mb-6">Never Miss an Event Again</h2>
          <p className="text-lg mb-8">
            Save your favorite events, get personalized recommendations, and share events with friends.
          </p>
          <Link to={isSignedIn ? "/profile" : "/sign-up"}>
            <Button size="lg" className="bg-dmv-blue hover:bg-dmv-blue/90">
              {isSignedIn ? "View Your Event Profile" : "Create Your Event Profile"}
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
