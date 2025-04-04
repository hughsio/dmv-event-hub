
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { events } from '@/data/events';
import { Heart, Bookmark, CalendarClock } from 'lucide-react';

const Profile = () => {
  const { savedEvents, likedEvents } = useUser();
  const [activeTab, setActiveTab] = useState('saved');
  
  const savedEventsList = events.filter(event => savedEvents.includes(event.id));
  const likedEventsList = events.filter(event => likedEvents.includes(event.id));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-dmv-blue text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-3">My Events</h1>
            <p className="text-lg opacity-90">Track and manage your favorite events in the DMV area</p>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="saved" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-8">
                <TabsList className="h-12">
                  <TabsTrigger 
                    value="saved" 
                    className="flex items-center h-10 px-4 data-[state=active]:bg-dmv-blue data-[state=active]:text-white"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Saved Events ({savedEvents.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="liked" 
                    className="flex items-center h-10 px-4 data-[state=active]:bg-dmv-blue data-[state=active]:text-white"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Liked Events ({likedEvents.length})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="saved">
                {savedEventsList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedEventsList.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-2xl font-semibold mb-2">No saved events yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Events you save will appear here for easy access.
                    </p>
                    <Button className="bg-dmv-blue hover:bg-dmv-blue/90" onClick={() => window.location.href = '/explore'}>
                      Explore Events
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="liked">
                {likedEventsList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likedEventsList.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-2xl font-semibold mb-2">No liked events yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Events you like will appear here.
                    </p>
                    <Button className="bg-dmv-blue hover:bg-dmv-blue/90" onClick={() => window.location.href = '/explore'}>
                      Explore Events
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
