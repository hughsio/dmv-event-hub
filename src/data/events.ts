
import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  organizer: string;
  price: string;
  isFeatured: boolean;
  attendees: number;
  liked?: boolean;
  saved?: boolean;
}

export const categories = [
  "Arts",
  "Charity",
  "Education",
  "Family",
  "Food & Drink",
  "Just for Fun",
  "Music",
  "Museums",
  "Networking",
  "Nightlife",
  "Outdoors",
  "Restaurants",
  "Shopping",
  "Sports",
  "Tech",
  "Other"
];

export const events: Event[] = [
  {
    id: uuidv4(),
    title: "Cherry Blossom Festival",
    description: "Join us for the annual Cherry Blossom Festival celebrating the beautiful cherry trees and Japanese culture. Enjoy performances, food vendors, and activities for all ages.",
    date: "2025-04-10",
    time: "10:00 AM - 7:00 PM",
    location: "Tidal Basin, Washington DC",
    category: "Outdoors",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    organizer: "National Park Service",
    price: "Free",
    isFeatured: true,
    attendees: 275
  },
  {
    id: uuidv4(),
    title: "Capital Jazz Festival",
    description: "Experience the best in smooth jazz with top artists performing live under the stars. Food, drinks, and good vibes included.",
    date: "2025-06-12",
    time: "6:00 PM - 11:00 PM",
    location: "Wolf Trap, Vienna, VA",
    category: "Music",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    organizer: "Capital Jazz Productions",
    price: "$75 - $150",
    isFeatured: true,
    attendees: 180
  },
  {
    id: uuidv4(),
    title: "Taste of Bethesda",
    description: "Sample delicious foods from over 60 restaurants and enjoy live entertainment throughout the day.",
    date: "2025-05-04",
    time: "11:00 AM - 4:00 PM",
    location: "Woodmont Triangle, Bethesda, MD",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    organizer: "Bethesda Urban Partnership",
    price: "Free entry",
    isFeatured: false,
    attendees: 132
  },
  {
    id: uuidv4(),
    title: "Alexandria Art Festival",
    description: "Browse and shop artwork from over 150 artists, enjoy live music, and participate in interactive art demonstrations.",
    date: "2025-04-25",
    time: "10:00 AM - 6:00 PM",
    location: "King Street, Alexandria, VA",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    organizer: "Alexandria Arts Society",
    price: "Free",
    isFeatured: true,
    attendees: 95
  },
  {
    id: uuidv4(),
    title: "DC Tech Meetup",
    description: "Connect with fellow tech professionals, share ideas, and hear from industry experts about the latest trends in technology.",
    date: "2025-05-15",
    time: "6:30 PM - 9:00 PM",
    location: "Capital One Arena, Washington DC",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    organizer: "DC Tech",
    price: "$10",
    isFeatured: false,
    attendees: 63
  },
  {
    id: uuidv4(),
    title: "Nationals vs. Phillies",
    description: "Cheer on the Washington Nationals as they take on the Philadelphia Phillies in this exciting divisional matchup.",
    date: "2025-05-20",
    time: "7:05 PM",
    location: "Nationals Park, Washington DC",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0",
    organizer: "Washington Nationals",
    price: "$25 - $300",
    isFeatured: false,
    attendees: 218
  },
  {
    id: uuidv4(),
    title: "Maryland Wine Festival",
    description: "Sample wines from Maryland's top wineries, enjoy live music, and indulge in gourmet food pairings.",
    date: "2025-06-05",
    time: "12:00 PM - 6:00 PM",
    location: "Carroll County Farm Museum, Westminster, MD",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
    organizer: "Maryland Wineries Association",
    price: "$35 in advance, $40 at the door",
    isFeatured: true,
    attendees: 157
  },
  {
    id: uuidv4(),
    title: "Smithsonian Folklife Festival",
    description: "Immerse yourself in diverse cultural traditions through performances, crafts, cooking demonstrations, and storytelling.",
    date: "2025-06-26",
    time: "11:00 AM - 9:00 PM",
    location: "National Mall, Washington DC",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1562164038-91cfe1d7cbce",
    organizer: "Smithsonian Institution",
    price: "Free",
    isFeatured: false,
    attendees: 189
  },
  {
    id: uuidv4(),
    title: "DC Bike Week",
    description: "Join us for the annual DC Bike Week celebrating city and the all the bike trails DC has to offer.",
    date: "2025-04-10",
    time: "10:00 AM - 7:00 PM",
    location: "Tidal Basin, Washington DC",
    category: "Outdoors",
    image: "https://images.unsplash.com/photo-1610651218119-cd161e98b319",
    organizer: "DC Bike Club",
    price: "Free",
    isFeatured: true,
    attendees: 275
  }
];
