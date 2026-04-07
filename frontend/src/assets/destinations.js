const destinations = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    category: "Beach",
    price: 15000,
    rating: 4.7,
    reviewCount: 2840,
    duration: "5 Days / 4 Nights",
    bestSeason: "Nov – Feb",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554678422-8ab5f9bfd5a1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage make Goa India's ultimate coastal escape.",
    highlights: ["Baga Beach", "Dudhsagar Falls", "Old Goa Churches", "Spice Plantations"],
    reviews: [
      { id: 1, user: "Arjun Mehta", avatar: "https://i.pravatar.cc/50?img=11", rating: 5, date: "Jan 2025", comment: "Absolutely magical experience! The beaches were pristine and the food was outstanding." },
      { id: 2, user: "Priya Sharma", avatar: "https://i.pravatar.cc/50?img=5", rating: 4, date: "Dec 2024", comment: "Great nightlife and sunsets. Can get crowded in peak season but totally worth it." },
      { id: 3, user: "Rahul Singh", avatar: "https://i.pravatar.cc/50?img=15", rating: 5, date: "Feb 2025", comment: "Perfect honeymoon destination. The resorts were luxurious and staff very helpful." }
    ],
    included: ["Hotel Stay", "Breakfast", "Airport Transfer", "Sightseeing Tours"]
  },
  {
    id: 2,
    name: "Manali",
    country: "India",
    category: "Adventure",
    price: 18000,
    rating: 4.8,
    reviewCount: 3120,
    duration: "6 Days / 5 Nights",
    bestSeason: "Oct – Jun",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Snow-capped peaks, roaring rivers and adrenaline-pumping adventure in the heart of the Himalayas.",
    highlights: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "River Rafting"],
    reviews: [
      { id: 1, user: "Vikram Nair", avatar: "https://i.pravatar.cc/50?img=12", rating: 5, date: "Mar 2025", comment: "The snow was incredible. Rohtang Pass is a must-do. Loved every moment!" },
      { id: 2, user: "Sneha Patel", avatar: "https://i.pravatar.cc/50?img=9", rating: 5, date: "Jan 2025", comment: "Adventure capital of India! Paragliding over snow was surreal." },
      { id: 3, user: "Karan Verma", avatar: "https://i.pravatar.cc/50?img=22", rating: 4, date: "Feb 2025", comment: "Roads can be tricky but the views make everything worth it." }
    ],
    included: ["Hotel Stay", "All Meals", "Airport Transfer", "Adventure Activities"]
  },
  {
    id: 3,
    name: "Jaipur",
    country: "India",
    category: "Cultural",
    price: 12000,
    rating: 4.6,
    reviewCount: 1980,
    duration: "4 Days / 3 Nights",
    bestSeason: "Oct – Mar",
    badge: "Heritage Gem",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
gallery: [
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=80"
],
    description: "The Pink City dazzles with majestic forts, royal palaces, colorful bazaars and Rajasthani cuisine.",
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    reviews: [
      { id: 1, user: "Anita Roy", avatar: "https://i.pravatar.cc/50?img=3", rating: 5, date: "Dec 2024", comment: "History comes alive here! The Amber Fort at night is breathtaking." },
      { id: 2, user: "Suresh Kumar", avatar: "https://i.pravatar.cc/50?img=18", rating: 4, date: "Nov 2024", comment: "Rich culture, amazing food. The bazaars are a shoppers paradise." },
      { id: 3, user: "Meera Joshi", avatar: "https://i.pravatar.cc/50?img=7", rating: 5, date: "Jan 2025", comment: "Absolutely loved every corner of Jaipur. The colors, the people, the food!" }
    ],
    included: ["Heritage Hotel Stay", "Breakfast", "Elephant Ride", "City Tour"]
  },
  {
    id: 4,
    name: "Kerala Backwaters",
    country: "India",
    category: "Nature",
    price: 22000,
    rating: 4.9,
    reviewCount: 4200,
    duration: "7 Days / 6 Nights",
    bestSeason: "Sep – Mar",
    badge: "Editor's Choice",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Float through emerald waterways on a houseboat, surrounded by lush greenery and serene village life.",
    highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Kovalam Beach", "Kathakali Dance"],
    reviews: [
      { id: 1, user: "David Wilson", avatar: "https://i.pravatar.cc/50?img=33", rating: 5, date: "Feb 2025", comment: "The houseboat experience is unlike anything in the world. Pure bliss!" },
      { id: 2, user: "Lakshmi Nair", avatar: "https://i.pravatar.cc/50?img=44", rating: 5, date: "Jan 2025", comment: "God's Own Country truly lives up to its name. Breathtaking at every turn." },
      { id: 3, user: "Tom Bradley", avatar: "https://i.pravatar.cc/50?img=25", rating: 4, date: "Mar 2025", comment: "The backwaters cruise was the highlight of our India trip by far." }
    ],
    included: ["Houseboat Stay", "All Meals", "Ayurvedic Spa", "Guided Tours"]
  },
  {
    id: 5,
    name: "Ladakh",
    country: "India",
    category: "Adventure",
    price: 28000,
    rating: 4.9,
    reviewCount: 3650,
    duration: "8 Days / 7 Nights",
    bestSeason: "Jun – Sep",
    badge: "Bucket List",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Earth's most dramatic landscape — barren mountains, sapphire lakes, ancient monasteries and infinite stars.",
    highlights: ["Pangong Lake", "Leh Palace", "Nubra Valley", "Khardung La Pass"],
    reviews: [
      { id: 1, user: "Aditya Chopra", avatar: "https://i.pravatar.cc/50?img=16", rating: 5, date: "Jul 2024", comment: "Pangong Lake at sunrise changed my life. The most beautiful place on Earth." },
      { id: 2, user: "Sarah Johnson", avatar: "https://i.pravatar.cc/50?img=47", rating: 5, date: "Aug 2024", comment: "As a photographer, Ladakh is paradise. Every frame is a masterpiece." },
      { id: 3, user: "Nikhil Bajaj", avatar: "https://i.pravatar.cc/50?img=20", rating: 5, date: "Jun 2024", comment: "The bike trip through Ladakh was the greatest adventure of my life." }
    ],
    included: ["Camping & Hotel", "All Meals", "Bike Rental", "Permits & Guide"]
  },
  {
    id: 6,
    name: "Varanasi",
    country: "India",
    category: "Cultural",
    price: 10000,
    rating: 4.5,
    reviewCount: 2100,
    duration: "3 Days / 2 Nights",
    bestSeason: "Oct – Mar",
    badge: "Spiritual Journey",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
gallery: [
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80"
],
    description: "One of the world's oldest cities — Varanasi awakens the soul with its ancient ghats, rituals and sacred Ganges.",
    highlights: ["Ganga Aarti", "Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath"],
    reviews: [
      { id: 1, user: "Marco Rossi", avatar: "https://i.pravatar.cc/50?img=60", rating: 5, date: "Nov 2024", comment: "The Ganga Aarti ceremony at dusk is one of the most powerful experiences of my life." },
      { id: 2, user: "Pooja Tiwari", avatar: "https://i.pravatar.cc/50?img=8", rating: 4, date: "Jan 2025", comment: "Ancient, raw, spiritual. Varanasi is unlike any place on earth." },
      { id: 3, user: "James Lee", avatar: "https://i.pravatar.cc/50?img=52", rating: 5, date: "Dec 2024", comment: "Every alley tells a story. A truly humbling and beautiful city." }
    ],
    included: ["Guesthouse Stay", "Breakfast", "Boat Ride", "Temple Tour"]
  }
];

export default destinations;