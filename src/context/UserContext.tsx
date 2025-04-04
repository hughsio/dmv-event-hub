
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Event } from '@/data/events';

interface UserContextType {
  savedEvents: string[];
  likedEvents: string[];
  saveEvent: (eventId: string) => void;
  likeEvent: (eventId: string) => void;
  removeSavedEvent: (eventId: string) => void;
  isEventSaved: (eventId: string) => boolean;
  isEventLiked: (eventId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [likedEvents, setLikedEvents] = useState<string[]>([]);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedFromStorage = localStorage.getItem('dmv-saved-events');
    const likedFromStorage = localStorage.getItem('dmv-liked-events');
    
    if (savedFromStorage) {
      setSavedEvents(JSON.parse(savedFromStorage));
    }
    
    if (likedFromStorage) {
      setLikedEvents(JSON.parse(likedFromStorage));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('dmv-saved-events', JSON.stringify(savedEvents));
    localStorage.setItem('dmv-liked-events', JSON.stringify(likedEvents));
  }, [savedEvents, likedEvents]);

  const saveEvent = (eventId: string) => {
    setSavedEvents((prev) => {
      if (prev.includes(eventId)) {
        return prev;
      }
      toast({
        title: "Event saved",
        description: "Event has been added to your saved list",
      });
      return [...prev, eventId];
    });
  };

  const removeSavedEvent = (eventId: string) => {
    setSavedEvents((prev) => {
      const updated = prev.filter(id => id !== eventId);
      if (updated.length !== prev.length) {
        toast({
          title: "Event removed",
          description: "Event has been removed from your saved list",
        });
      }
      return updated;
    });
  };

  const likeEvent = (eventId: string) => {
    setLikedEvents((prev) => {
      if (prev.includes(eventId)) {
        const updated = prev.filter(id => id !== eventId);
        return updated;
      }
      return [...prev, eventId];
    });
  };

  const isEventSaved = (eventId: string) => savedEvents.includes(eventId);
  const isEventLiked = (eventId: string) => likedEvents.includes(eventId);

  return (
    <UserContext.Provider value={{
      savedEvents,
      likedEvents,
      saveEvent,
      likeEvent,
      removeSavedEvent,
      isEventSaved,
      isEventLiked
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
