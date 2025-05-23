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
    id: "cherry-blossom-festival",
    title: "Cherry Blossom Festival",
    description: "Join us for the annual Cherry Blossom Festival celebrating the beautiful cherry trees and Japanese culture. Enjoy performances, food vendors, and activities for all ages. Don't miss the stunning cherry blossoms in full bloom!",
    date: "2025-04-10",
    time: "10:00 AM - 7:00 PM",
    location: "Tidal Basin, Washington DC",
    category: "Outdoors",
    image: "https://novayorkevoce.com/wp-content/uploads/2014/04/capa2.jpg",
    organizer: "National Park Service",
    price: "Free",
    isFeatured: true,
    attendees: 275
  },
  {
    id: "capital-jazz-festival",
    title: "Capital Jazz Festival",
    description: "Experience the best in smooth jazz with top artists performing live under the stars. Food, drinks, and good vibes included. Join us for a night of unforgettable music and fun!",
    date: "2025-06-12",
    time: "6:00 PM - 11:00 PM",
    location: "Wolf Trap, Vienna, VA",
    category: "Music",
    image: "https://www.capitaljazz.com/fest/2025/wp/wp-content/uploads/2024/06/CJF2024_0013_Jodeci.jpg",
    organizer: "Capital Jazz Productions",
    price: "$75 - $150",
    isFeatured: true,
    attendees: 180
  },
  {
    id: "taste-of-bethesda",
    title: "Taste of Bethesda",
    description: "Sample delicious foods from over 60 restaurants and enjoy live entertainment throughout the day. This event is perfect for food lovers and families looking for a fun day out.",
    date: "2025-05-04",
    time: "11:00 AM - 4:00 PM",
    location: "Woodmont Triangle, Bethesda, MD",
    category: "Food & Drink",
    image: "https://i.pinimg.com/originals/aa/3b/2d/aa3b2dbd698d81e18141c87224fe99b9.jpg",
    organizer: "Bethesda Urban Partnership",
    price: "Free entry",
    isFeatured: false,
    attendees: 132
  },
  {
    id: "alexandria-art-festival",
    title: "Alexandria Art Festival",
    description: "Browse and shop artwork from over 150 artists, enjoy live music, and participate in interactive art demonstrations. Don't miss the chance to meet the artists!",
    date: "2025-04-25",
    time: "10:00 AM - 6:00 PM",
    location: "King Street, Alexandria, VA",
    category: "Arts",
    image: "https://www.alxnow.com/files/2022/05/Artist-Cat-Clausen-at-the-Alexandria-Old-Town-Springtime-Art-Festival-May-14-2022.-staff-photo-by-James-Cullum-1260x840.jpg",
    organizer: "Alexandria Arts Society",
    price: "Free",
    isFeatured: true,
    attendees: 95
  },
  {
    id: "dc-tech-meetup",
    title: "DC Tech Meetup",
    description: "Connect with fellow tech professionals, share ideas, and hear from industry experts about the latest trends in technology. This is a great opportunity to network and learn from each other.",
    date: "2025-05-15",
    time: "6:30 PM - 9:00 PM",
    location: "Capital One Arena, Washington DC",
    category: "Tech",
    image: "https://media.licdn.com/dms/image/sync/D4E27AQHadTbKZzbttA/articleshare-shrink_800/0/1709735455208?e=2147483647&v=beta&t=SdMpFU5g0Y4dmx3UN_vozHRzvwyHhoEdaZ40vMWVl2M",
    organizer: "DC Tech",
    price: "$10",
    isFeatured: false,
    attendees: 63
  },
  {
    id: "nats-vs-phillies",
    title: "Nationals vs. Phillies",
    description: "Cheer on the Washington Nationals as they take on the Philadelphia Phillies in this exciting divisional matchup. Enjoy a night of baseball, food, and fun at Nationals Park.",
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
    id: "maryland-wine-festival",
    title: "Maryland Wine Festival",
    description: "Sample wines from Maryland's top wineries, enjoy live music, and indulge in gourmet food pairings. This festival is a must for wine lovers and foodies alike.",
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
    id: "smithsonian-folklife-festival",
    title: "Smithsonian Folklife Festival",
    description: "Immerse yourself in diverse cultural traditions through performances, crafts, cooking demonstrations, and storytelling. This year's theme focuses on the rich heritage of the American South.",
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
    id: "dc-bike-week",
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
    id: "ancient-artifacts-exhibit",
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
    id: "night-at-planetarium",
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
    id: "interactive-science-lab-day",
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
  {
    id: uuidv4(),
    title: "Chinatown Dining",
    description: "Have a fun time eating savory local chinese food.",
    date: "2025-6-23",
    time: "2:00 PM - 7:00 PM",
    location: "Chinatown, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1558306674-e6f520248f1d",
    organizer: "Chinatown Community Cultural Center",
    price: "$20",
    isFeatured: false,
    attendees: 30
  }, 
  {
    id: uuidv4(),
    title: "DC Chocolate, Wine & Whiskey Festival",
    description: "Come to the National Union Building to have many sweet treats and drinks for refined tastes.",
    date: "2025-3-11",
    time: "12:00 AM - 7:00 PM",
    location: "National Union Building, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1627647227768-705244233b56",
    organizer: " TasteUSA",
    price: "$20",
    isFeatured: false,
    attendees: 30
  }, 
  {
    id: uuidv4(),
    title: "Founding Farmers DC",
    description: "Taste some of the best food in DC, all of it having iconic american flare.",
    date: "2025-5-10",
    time: "7:00 AM - 10:00 PM",
    location: "Founding Farmers DC, Washington D.C.",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1562513872-634b8fae6dbe",
    organizer: "Founding Farmers DC",
    price: "$50",
    isFeatured: false,
    attendees: 30
  }, 

];
