import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Event, events } from '@/data/events'; // Import events from the data file
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";
import EventCard from '@/components/EventCard';

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = new Date(event.date); // Ensure valid Date object
    const eventDateStr = format(eventDate, 'yyyy-MM-dd');
    if (!acc[eventDateStr]) {
      acc[eventDateStr] = [];
    }
    acc[eventDateStr].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Get events for selected date
  const selectedDateEvents = date
    ? eventsByDate[format(date, 'yyyy-MM-dd')] || []
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-dmv-blue text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Event Calendar</h1>
            <p className="text-lg opacity-90">Browse events by date</p>
          </div>
        </section>
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[400px,1fr] gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className={cn("rounded-md border w-full pointer-events-auto")}
                  modifiers={{
                    hasEvents: (date) => {
                      if (!date) return false; // Add null check
                      const dateStr = format(date, 'yyyy-MM-dd');
                      return !!eventsByDate[dateStr];
                    },
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      fontWeight: 'bold',
                      backgroundColor: 'rgb(var(--dmv-blue))',
                      color: 'rgb(var(--dmv-blue))',
                    },
                    today: {
                      border: '4px solid rgb(var(--dmv-blue))',
                      fontWeight: 'bold',
                    },
                  }}
                />
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-5 rounded-full bg-dmv-blue"></div>
                    <span className="text-sm">Has Events</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDate(new Date())}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Today
                  </Button>
                </div>
              </div>
              <div>
                {date ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Events for {format(date, 'MMMM d, yyyy')}
                    </h2>
                    {selectedDateEvents.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {selectedDateEvents.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    ) : (
                      <Card className="p-8 text-center">
                        <p className="text-muted-foreground">
                          No events scheduled for this date
                        </p>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Select a date to view events
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CalendarView;
