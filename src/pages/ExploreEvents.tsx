
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { events, Event } from '@/data/events';

const ExploreEvents = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Parse URL for category filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Filter events based on search term and category
  useEffect(() => {
    let result = [...events];
    
    if (selectedCategory) {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(lowerSearchTerm) ||
        event.description.toLowerCase().includes(lowerSearchTerm) ||
        event.location.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    setFilteredEvents(result);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-dmv-blue text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Explore Events</h1>
            
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search events, venues, or locations..."
                  className="bg-white text-black pr-12 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1 top-1 h-10 w-10"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            </div>
            
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploreEvents;
