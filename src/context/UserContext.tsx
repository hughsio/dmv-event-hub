import React, { createContext, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '../hooks/useSupabase';
import { useUser as useClerkUser } from '@clerk/clerk-react';

interface UserContextType {
  savedEvents: string[];
  likedEvents: string[];
  registeredEvents: string[];
  saveEvent: (eventId: string) => Promise<boolean>;
  likeEvent: (eventId: string) => Promise<boolean>;
  removeSavedEvent: (eventId: string) => Promise<boolean>;
  isEventSaved: (eventId: string) => boolean;
  isEventLiked: (eventId: string) => boolean;
  isEventRegistered: (eventId: string) => boolean;
  addRegisteredEvent: (eventId: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * UserProvider component that serves as a wrapper for Supabase user data
 * It manages user's saved and liked events with graceful error handling
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { isLoaded: isClerkLoaded } = useClerkUser();
  const { 
    savedEvents, 
    likedEvents, 
    registeredEvents,
    saveEvent: supabaseSaveEvent,
    removeSavedEvent: supabaseRemoveSaveEvent,
    toggleLikeEvent,
    isEventSaved, 
    isEventLiked,
    isLoading,
    error,
    addRegisteredEvent
  } = useSupabase();

  // Log the state received from useSupabase before providing it
  console.log(`[UserContext] Providing State - isLoading (Hook): ${isLoading}, isClerkLoaded: ${isClerkLoaded}, Saved: [${savedEvents.join(', ')}], Liked: [${likedEvents.join(', ')}], Registered: [${registeredEvents.join(', ')}]`);

  // Show any errors from Supabase, but only once Clerk has loaded
  // This prevents showing errors during the initial auth state resolution
  React.useEffect(() => {
    if (error && isClerkLoaded) {
      // Show a more user-friendly error message
      toast({
        title: "Connection Issue",
        description: "We couldn't connect to the database. Some features may not work properly.",
        variant: "destructive",
        // Make the toast stay longer so user has a chance to see it
        duration: 5000,
      });
      
      // Log the actual error for debugging
      console.error("Supabase error:", error);
    }
  }, [error, toast, isClerkLoaded]);

  // Save an event with toast notification
  const saveEvent = async (eventId: string) => {
    try {
      const success = await supabaseSaveEvent(eventId);
      if (success) {
        toast({
          title: "Event saved",
          description: "Event has been added to your saved list",
        });
      } else {
        // Only show error toast if the operation actually failed
        // (not if the user isn't logged in, which returns false but isn't an error)
        if (isClerkLoaded) {
          toast({
            title: "Couldn't save event",
            description: "Please try again later",
            variant: "destructive",
          });
        }
      }
      return success;
    } catch (err) {
      console.error("Error in saveEvent:", err);
      toast({
        title: "Couldn't save event",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  // Remove a saved event with toast notification
  const removeSavedEvent = async (eventId: string) => {
    try {
      const success = await supabaseRemoveSaveEvent(eventId);
      if (success) {
        toast({
          title: "Event removed",
          description: "Event has been removed from your saved list",
        });
      } else if (isClerkLoaded) {
        toast({
          title: "Couldn't remove event",
          description: "Please try again later",
          variant: "destructive",
        });
      }
      return success;
    } catch (err) {
      console.error("Error in removeSavedEvent:", err);
      toast({
        title: "Couldn't remove event",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  // Toggle like event with no toast
  const likeEvent = async (eventId: string) => {
    try {
      return await toggleLikeEvent(eventId);
    } catch (err) {
      console.error("Error in likeEvent:", err);
      return false;
    }
  };

  const isEventRegistered = (eventId: string) => {
    return registeredEvents.includes(eventId);
  };

  return (
    <UserContext.Provider value={{
      savedEvents,
      likedEvents,
      registeredEvents,
      saveEvent,
      likeEvent,
      removeSavedEvent,
      isEventSaved,
      isEventLiked,
      isEventRegistered,
      addRegisteredEvent,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access user context for saved and liked events
 * @returns UserContextType object with all user event functions and data
 * @throws Error if used outside of UserProvider
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
