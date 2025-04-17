import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share2, Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { events } from '@/data/events';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { likeEvent, saveEvent, removeSavedEvent, isEventLiked, isEventSaved, isLoading, savedEvents, likedEvents } = useUser();
  const [likePending, setLikePending] = useState(false);
  const [savePending, setSavePending] = useState(false);
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center flex-col p-8">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/explore')}>
            Browse Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  console.log(`[EventDetails] Rendering - Event ID: ${event.id}, IsLoading: ${isLoading}, IsLiked: ${isEventLiked(event.id)}, IsSaved: ${isEventSaved(event.id)}`);
  console.log(`[EventDetails] Context State - Saved: [${savedEvents.join(', ')}], Liked: [${likedEvents.join(', ')}]`);
  
  const liked = isEventLiked(event.id);
  const saved = isEventSaved(event.id);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at ${event.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = async () => {
    console.log(`[EventDetails] handleLike called for event: ${event.id}`);
    if (likePending) return;
    setLikePending(true);
    try {
      console.log(`[EventDetails] Calling likeEvent from context...`);
      await likeEvent(event.id);
      console.log(`[EventDetails] likeEvent call finished.`);
    } finally {
      setLikePending(false);
    }
  };

  const handleSaveToggle = async () => {
    console.log(`[EventDetails] handleSaveToggle called for event: ${event.id}, current saved state: ${saved}`);
    if (savePending) return;
    setSavePending(true);
    try {
      if (saved) {
        console.log(`[EventDetails] Calling removeSavedEvent from context...`);
        await removeSavedEvent(event.id);
        console.log(`[EventDetails] removeSavedEvent call finished.`);
      } else {
        console.log(`[EventDetails] Calling saveEvent from context...`);
        await saveEvent(event.id);
        console.log(`[EventDetails] saveEvent call finished.`);
      }
    } finally {
      setSavePending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header with Image */}
        <div className="relative h-80 md:h-96 bg-dmv-blue">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-white bg-black/20 hover:bg-black/40"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <Badge className="mb-3 bg-dmv-pink text-white">
              {event.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-lg opacity-90">{event.organizer}</p>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="mb-6">
                  <div className="text-xl font-bold mb-1">{event.price}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-dmv-blue mt-0.5" />
                    <div>
                      <div className="font-semibold">Date and Time</div>
                      <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                      <div className="text-sm text-gray-600">{event.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-dmv-blue mt-0.5" />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-sm text-gray-600">{event.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-dmv-blue mt-0.5" />
                    <div>
                      <div className="font-semibold">Attendees</div>
                      <div className="text-sm text-gray-600">{event.attendees} people going</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button size="lg" className="bg-dmv-blue hover:bg-dmv-blue/90">
                    Register Now
                  </Button>
                  
                  {isLoading ? (
                    <div className="flex space-x-2">
                      <Skeleton className="flex-1 h-10" />
                      <Skeleton className="flex-1 h-10" />
                      <Skeleton className="flex-1 h-10" />
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        className={cn(
                          "flex-1 flex items-center justify-center",
                          liked ? "text-rose-500 border-rose-500" : ""
                        )}
                        onClick={handleLike}
                        disabled={likePending}
                      >
                        <Heart className="h-4 w-4 mr-2" fill={liked ? "currentColor" : "none"} />
                        {liked ? "Liked" : "Like"}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className={cn(
                          "flex-1 flex items-center justify-center",
                          saved ? "text-dmv-blue border-dmv-blue" : ""
                        )}
                        onClick={handleSaveToggle}
                        disabled={savePending}
                      >
                        <Bookmark className="h-4 w-4 mr-2" fill={saved ? "currentColor" : "none"} />
                        {saved ? "Saved" : "Save"}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex-1 flex items-center justify-center"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
