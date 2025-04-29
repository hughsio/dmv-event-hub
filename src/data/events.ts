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
    id: "9b1dc4a6-afb1-4ebb-9139-4832d346c5cf",
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
    id: "8ca5fa01-9ae4-4fc9-aeb8-c07f03c8d00a",
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
    id: "3c2c0fa6-2a14-41ac-ab3f-5e1534f82495",
    title: "Taste of Bethesda",
    description: "Sample delicious foods from over 60 restaurants and enjoy live entertainment throughout the day.",
    date: "2025-05-04",
    time: "11:00 AM - 4:00 PM",
    location: "Woodmont Triangle, Bethesda, MD",
    category: "Food & Drink",
    image: "https://unsplash.com/photos/man-inside-food-stall-ye5T5R0G-GA",
    organizer: "Bethesda Urban Partnership",
    price: "Free entry",
    isFeatured: false,
    attendees: 132
  },
  {
    id: "14af0dfc-0440-4ffc-be71-06c3cae498b6",
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
    id: "5a9f3e7d-c8b2-4a0e-9b1d-8c6e4f5a2b3d",
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
    id: "6212b297-2781-485b-973b-981d193c0e3d",
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
    id: "7d4e8f9a-1b2c-3d4e-5f6g-7h8i9j0k1l2m",
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
    id: "8a7b6c5d-4e3f-2g1h-0i9j-8k7l6m5n4o3p",
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
    id: "2907852b-0eed-4904-bdb8-d29ca49a0741",
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
  },
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "Ancient Artifacts Exhibit",
    description: "Explore the fascinating world of ancient artifacts, showcasing relics from civilizations across the globe.",
    date: "2025-05-15",
    time: "9:00 AM - 5:00 PM",
    location: "National Museum of History, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1653723360014-8859ed15b76f",
    organizer: "National Museum of History",
    price: "$20",
    isFeatured: false,
    attendees: 150
  },
  {
    id: "9z8y7x6w-5v4u-3t2s-1r0q-9p8o7n6m5l4k",
    title: "Night at the Planetarium",
    description: "An immersive stargazing experience with guided tours through the cosmos, perfect for all ages.",
    date: "2025-06-08",
    time: "7:00 PM - 10:00 PM",
    location: "Smithsonian Air and Space Museum, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1557472358-30dfd470c24b",
    organizer: "Smithsonian Planetarium Team",
    price: "Free",
    isFeatured: true,
    attendees: 320
  },
  {
    id: "3j4k5l6m-7n8o-9p0q-1r2s-3t4u5v6w7x8y",
    title: "Interactive Science Lab Day",
    description: "Hands-on exhibits and experiments that bring science to life for students and curious minds of all ages.",
    date: "2025-07-12",
    time: "11:00 AM - 4:00 PM",
    location: "Children's Science Museum, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1717962690206-2d2f6ddac9db",
    organizer: "DC Science Explorers",
    price: "$10",
    isFeatured: false,
    attendees: 200
  },
  {
    id: uuidv4(),
    title: "Impressionist Masters Showcase",
    description: "Experience iconic paintings from Monet, Renoir, and Degas, brought together for a limited-time exhibition.",
    date: "2025-08-05",
    time: "10:00 AM - 6:00 PM",
    location: "National Art Gallery, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1735605918310-73ad27a5dd6b",
    organizer: "National Art Gallery",
    price: "$15",
    isFeatured: true,
    attendees: 500
  },
  {
    id: uuidv4(),
    title: "Innovation Through the Ages",
    description: "Discover how inventions from ancient times to the modern era have shaped the world we live in.",
    date: "2025-09-14",
    time: "9:30 AM - 5:30 PM",
    location: "Smithsonian Museum of American History, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1630756539201-f435ba29f1fe",
    organizer: "Smithsonian Exhibitions",
    price: "Free",
    isFeatured: false,
    attendees: 450
  },
  {
    id: uuidv4(),
    title: "Dinosaur Discovery Day",
    description: "A full day of fossil digs, dinosaur exhibits, and educational workshops for families and kids.",
    date: "2025-07-20",
    time: "10:00 AM - 3:00 PM",
    location: "National Museum of Natural History, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1553338258-24fe91e8baf3",
    organizer: "Natural History Education Team",
    price: "$12",
    isFeatured: false,
    attendees: 275
  },
  {
    id: uuidv4(),
    title: "African American Heritage Celebration",
    description: "An inspiring day of storytelling, exhibits, and performances honoring African American culture and history.",
    date: "2025-10-02",
    time: "11:00 AM - 6:00 PM",
    location: "National Museum of African American History and Culture, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1738235465258-8a69981f353d",
    organizer: "Heritage and Culture Initiative",
    price: "Free",
    isFeatured: true,
    attendees: 600
  },
  {
    id: uuidv4(),
    title: "STEAM Adventure Day",
    description: "Interactive exhibits combining Science, Technology, Engineering, Art, and Math for kids and families.",
    date: "2025-11-09",
    time: "10:00 AM - 2:00 PM",
    location: "Children’s Science Museum, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1569837921581-b4ab4ff69592",
    organizer: "Children’s Science Museum",
    price: "$8",
    isFeatured: false,
    attendees: 180
  },
  {
    id: uuidv4(),
    title: "Photography Through the Decades",
    description: "Travel through time with iconic photographs from the early 1900s to today’s digital era.",
    date: "2025-08-25",
    time: "12:00 PM - 7:00 PM",
    location: "Contemporary Arts Museum, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1636957455275-453a1042afa6",
    organizer: "Contemporary Arts Collective",
    price: "$10",
    isFeatured: false,
    attendees: 220
  },
  {
    id: uuidv4(),
    title: "Robots and Beyond: The Future of Technology",
    description: "An interactive tech exhibit showcasing robotics, AI advancements, and future innovations.",
    date: "2025-12-01",
    time: "10:00 AM - 5:00 PM",
    location: "Museum of Science and Technology, Washington DC",
    category: "Museums",
    image: "https://images.unsplash.com/photo-1653570450203-a9ea9d8d0ddf",
    organizer: "Museum of Science and Technology",
    price: "$18",
    isFeatured: true,
    attendees: 350
  },
  
  {
    id: uuidv4(),
    title: "Gordon Ramsay Hell's Kitchen - Washington D.C. Experience",
    description: "Eat some of the best food in D.C at Gordon Ramsay’s award-winning restaurant and drink the best of local wines.",
    date: "2025-08-15",
    time: "5:00 PM - 11:00 PM",
    location: "Gordon Ramsay Hell's Kitchen, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1599655345131-6eb73b81d8d6",
    organizer: "DC Foodies",
    price: "$150",
    isFeatured: false,
    attendees: 40
  },      
  {
    id: uuidv4(),
    title: "Burger Fest 2025",
    description: "Have burgers from all over D.C via food trucks that’ll dazzle your tastebuds.",
    date: "2025-10-1",
    time: "9:00 AM - 4:00 PM",
    location: "Anacostia Park, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?q",
    organizer: "DC Foodies",
    price: "$5",
    isFeatured: false,
    attendees: 40
  }, 
  {
    id: uuidv4(),
    title: "Whiskey Charlie Rooftop Bar",
    description: "Taste and relax in the good life while having a lovely sight of DC life below.",
    date: "2025-5-26",
    time: "2:00 PM - 12:00 PM",
    location: "Conaopy By Hilton, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1599066634419-0e3572eeb169",
    organizer: "DC Foodies",
    price: "$30",
    isFeatured: false,
    attendees: 30
  }, 

];
