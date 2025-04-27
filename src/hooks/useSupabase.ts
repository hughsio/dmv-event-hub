import { useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import { supabase, SavedEvent, LikedEvent, logSupabaseError } from '@/lib/supabase';

export const useSupabase = () => {
  const { user, isLoaded } = useClerkUser();
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [likedEvents, setLikedEvents] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(isLoaded);
  const [error, setError] = useState<string | null>(null);

  // Fetch saved and liked events when Clerk is loaded AND user ID is available
  useEffect(() => {
    if (!isLoaded || !user?.id) {
      if (isLoaded) {
        setSavedEvents([]);
        setLikedEvents([]);
        setRegisteredEvents([]);
        setIsLoading(false);
        setError(null);
      }
      return;
    }

    console.log(`[useSupabase] useEffect triggered: Fetching events for user ${user.id}`);

    const fetchUserEvents = async () => {
      setIsLoading(true);
      try {
        setError(null);

        const { data: savedData, error: savedError } = await supabase
          .from('saved_events')
          .select('event_id')
          .eq('user_id', user.id);
        
        if (savedError) {
          logSupabaseError('saved_events fetch', savedError);
        }
        
        const { data: likedData, error: likedError } = await supabase
          .from('liked_events')
          .select('event_id')
          .eq('user_id', user.id);
        
        if (likedError) {
          logSupabaseError('liked_events fetch', likedError);
        }
        
        const { data: registrationsData, error: registrationsError } = await supabase
          .from('registrations')
          .select('event_id')
          .eq('user_id', user.id);
        
        if (registrationsError) {
          logSupabaseError('registrations fetch', registrationsError);
        }
        
        console.log("[useSupabase] Fetched saved events data:", savedData);
        console.log("[useSupabase] Fetched liked events data:", likedData);
        console.log("[useSupabase] Fetched registrations data:", registrationsData);
        setSavedEvents(savedData ? savedData.map(item => item.event_id) : []);
        setLikedEvents(likedData ? likedData.map(item => item.event_id) : []);
        setRegisteredEvents(registrationsData ? registrationsData.map(item => item.event_id) : []);
        
        if (savedError && likedError && registrationsError) {
          setError('Failed to fetch your saved events');
        }
      } catch (err) {
        console.error('Error in fetchUserEvents:', err);
        setError('Failed to fetch your saved events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEvents();
  }, [user?.id, isLoaded]);

  // Save an event
  const saveEvent = async (eventId: string) => {
    console.log(`[useSupabase] saveEvent called. User ID: ${user?.id}, Event ID: ${eventId}`);
    if (!user?.id) {
      console.log("[useSupabase] No user ID, returning false.");
      return false;
    }
    
    try {
      if (savedEvents.includes(eventId)) return true;
      
      const { error } = await supabase
        .from('saved_events')
        .insert([
          { user_id: user.id, event_id: eventId }
        ]);
      
      if (error) {
        logSupabaseError('save event', error);
        throw error;
      }
      
      setSavedEvents(prev => [...prev, eventId]);
      return true;
    } catch (err) {
      console.error('Error saving event:', err);
      return false;
    }
  };

  // Remove a saved event
  const removeSavedEvent = async (eventId: string) => {
    console.log(`[useSupabase] removeSavedEvent called. User ID: ${user?.id}, Event ID: ${eventId}`);
    if (!user?.id) {
      console.log("[useSupabase] No user ID, returning false.");
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('saved_events')
        .delete()
        .eq('user_id', user.id)
        .eq('event_id', eventId);
      
      if (error) {
        logSupabaseError('remove saved event', error);
        throw error;
      }
      
      setSavedEvents(prev => prev.filter(id => id !== eventId));
      return true;
    } catch (err) {
      console.error('Error removing saved event:', err);
      return false;
    }
  };

  // Like or unlike an event
  const toggleLikeEvent = async (eventId: string) => {
    console.log(`[useSupabase] toggleLikeEvent called. User ID: ${user?.id}, Event ID: ${eventId}`);
    if (!user?.id) {
      console.log("[useSupabase] No user ID, returning false.");
      return false;
    }
    
    try {
      const isLiked = likedEvents.includes(eventId);
      
      if (isLiked) {
        const { error } = await supabase
          .from('liked_events')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);
        
        if (error) {
          logSupabaseError('unlike event', error);
          throw error;
        }
        
        setLikedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        const { error } = await supabase
          .from('liked_events')
          .insert([
            { user_id: user.id, event_id: eventId }
          ]);
        
        if (error) {
          logSupabaseError('like event', error);
          throw error;
        }
        
        setLikedEvents(prev => [...prev, eventId]);
      }
      
      return true;
    } catch (err) {
      console.error('Error toggling event like:', err);
      return false;
    }
  };

  // Check if an event is saved
  const isEventSaved = (eventId: string) => {
    return savedEvents.includes(eventId);
  };

  // Check if an event is liked
  const isEventLiked = (eventId: string) => {
    return likedEvents.includes(eventId);
  };

  const addRegisteredEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;
    setRegisteredEvents(prev => [...prev, eventId]);
  };

  return {
    savedEvents,
    likedEvents,
    registeredEvents,
    saveEvent,
    removeSavedEvent,
    toggleLikeEvent,
    isEventSaved,
    isEventLiked,
    isLoading: !isLoaded || isLoading,
    error,
    addRegisteredEvent,
  };
}; 