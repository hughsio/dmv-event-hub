
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, Share2, Calendar, MapPin } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Event } from '@/data/events';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const { likeEvent, saveEvent, removeSavedEvent, isEventLiked, isEventSaved } = useUser();
  
  const liked = isEventLiked(event.id);
  const saved = isEventSaved(event.id);
  
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

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      featured ? "md:flex md:h-80" : "h-full"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        featured ? "md:w-1/2" : "h-52"
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
        "flex flex-col flex-1",
        featured ? "md:w-1/2" : ""
      )}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <Link to={`/event/${event.id}`} className="hover:text-dmv-blue">
              <h3 className={cn(
                "font-bold text-dmv-dark",
                featured ? "text-xl md:text-2xl" : "text-lg"
              )}>{event.title}</h3>
            </Link>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 rounded-full", 
                  liked ? "text-rose-500" : "text-muted-foreground"
                )}
                onClick={() => likeEvent(event.id)}
                aria-label={liked ? "Unlike" : "Like"}
              >
                <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => saved ? removeSavedEvent(event.id) : saveEvent(event.id)}
                aria-label={saved ? "Unsave" : "Save"}
              >
                <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="flex flex-col space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)} • {event.time}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <p className={cn(
            "text-sm text-muted-foreground",
            featured ? "" : "line-clamp-2"
          )}>
            {event.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="text-sm font-medium">
            {event.price}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Link to={`/event/${event.id}`}>
              <Button size="sm" className="bg-dmv-blue hover:bg-dmv-blue/90 text-xs">
                View Details
              </Button>
            </Link>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default EventCard;
