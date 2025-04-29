import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share2, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Event } from '@/data/events';
import { useUser as useClerkUser, useAuth } from '@clerk/clerk-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/lib/supabase';

interface EventCardProps {
  event: Event;
  featured?: boolean;
  likeEvent?: (id: string) => void;
  saveEvent?: (id: string) => void;
  removeSavedEvent?: (id: string) => void;
  isEventLiked?: (id: string) => boolean;
  isEventSaved?: (id: string) => boolean;
  isInitiallyRegistered?: boolean;
  isEventShared?: (id: string) => boolean;
  isEventRegistered?: (id: string) => boolean;
  isRegistered?: boolean;
  isLoading?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  featured = false,
  likeEvent, 
  saveEvent, 
  removeSavedEvent, 
  isEventLiked, 
  isEventSaved,
  isInitiallyRegistered
}) => {
  const { user, isSignedIn } = useClerkUser();
  const { getToken } = useAuth();
  const { addRegisteredEvent } = useUser();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(isInitiallyRegistered ?? false);

  useEffect(() => {
    setIsRegistered(isInitiallyRegistered ?? false);
  }, [isInitiallyRegistered]);

  const liked = isEventLiked ? isEventLiked(event.id) : false;
  const saved = isEventSaved ? isEventSaved(event.id) : false;
  const handleLike = likeEvent ? () => likeEvent(event.id) : () => console.warn("likeEvent not provided");
  const handleSave = saveEvent && removeSavedEvent ? () => saved ? removeSavedEvent(event.id) : saveEvent(event.id) : () => console.warn("saveEvent/removeSavedEvent not provided");

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at ${event.location}`,
        url: window.location.origin + '/event/' + event.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/event/' + event.id);
      alert('Link copied to clipboard!');
    }
  };

  const handleRegister = async () => {
    if (!isSignedIn || !user) {
      setRegistrationError("Please sign in to register.");
      return;
    }
    if (isRegistered) return;

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token not available.");
      }

      console.log("[handleRegister] Event ID:", event.id);
      const requestBody = JSON.stringify({ eventId: event.id });
      console.log("[handleRegister] Stringified Body:", requestBody);
      if (!event.id) {
         console.error("[handleRegister] event.id is missing!");
         throw new Error("Cannot register: event ID is missing.");
      }

      // Use direct fetch instead of Supabase client
      const response = await fetch(
        'https://stnmwckuxkjjbawxbkkx.supabase.co/functions/v1/register-event',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: requestBody
        }
      );
      
      // Get response as text first
      const responseText = await response.text();
      console.log("[handleRegister] Raw response:", responseText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("[handleRegister] Failed to parse response as JSON:", e);
        throw new Error("Invalid response from server");
      }
      
      if (!response.ok) {
        console.error("[handleRegister] Server error:", data);
        throw new Error(data.error || "Server returned an error");
      }
      
      console.log('Registration successful:', data);
      setIsRegistered(true);
      
      // Update the global context
      addRegisteredEvent(event.id);

    } catch (error: any) {
      console.error("Registration failed:", error);
      setRegistrationError(error.message || "Failed to register. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col",
      featured ? "md:flex-row md:h-80" : "h-full"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        featured ? "md:w-1/2 md:h-full" : "h-52 w-full"
      )}>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-dmv-blue text-white">
          {event.category}
        </Badge>
      </div>
      
      <div className={cn(
        "flex flex-col flex-1 p-4",
        featured ? "md:w-1/2" : ""
      )}>
        <CardHeader className="p-0 pb-2">
          <div className="flex justify-between items-start">
            <Link to={`/event/${event.id}`} className="hover:text-dmv-blue flex-1 mr-2">
              <h3 className={cn(
                "font-bold text-dmv-dark",
                featured ? "text-xl md:text-2xl" : "text-lg"
              )}>{event.title}</h3>
            </Link>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-full", liked ? "text-rose-500" : "text-muted-foreground")} onClick={handleLike} aria-label={liked ? "Unlike" : "Like"}>
                <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleSave} aria-label={saved ? "Unsave" : "Save"}>
                <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pt-2 flex-grow">
          <div className="flex flex-col space-y-1 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formatDate(event.date)} • {event.time}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <p className={cn(
            "text-sm text-muted-foreground mb-3",
            featured ? "" : "line-clamp-2"
          )}>
            {event.description}
          </p>
          
          {registrationError && (
             <p className="text-xs text-red-600 mt-1">{registrationError}</p>
           )}
        </CardContent>
        
        <CardFooter className="p-0 pt-2 mt-auto">
           <div className="flex justify-between items-center w-full">
             <div className="text-sm font-medium text-gray-700">
               {event.price}
             </div>
             <div className="flex space-x-2">
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="text-xs"
                 onClick={handleShare}
               >
                 <Share2 className="h-3 w-3 mr-1" /> Share
               </Button>
               <Link to={`/event/${event.id}`}>
                 <Button size="sm" variant="outline" className="text-xs">
                   Details
                 </Button>
               </Link>
               <Button 
                 size="sm" 
                 className="bg-dmv-blue hover:bg-dmv-blue/90 text-xs"
                 onClick={handleRegister}
                 disabled={!isSignedIn || isRegistering || isRegistered}
               >
                 {isRegistering ? 'Registering...' : (isRegistered ? 'Registered' : 'Register')}
               </Button>
             </div>
           </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default EventCard;
