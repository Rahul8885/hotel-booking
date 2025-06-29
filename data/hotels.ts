import { Hotel } from '@/types/hotel';



export const hotels: Hotel[] = [
  {
    id: '1',
    name: "Grand Palace Hotel",
    description: "Luxury hotel in the heart of the city with world-class amenities and exceptional service.",
    address: "123 Main Street, Downtown",
    city: "New York",
    country: "USA",
    reviews: 150,
    pricePerNight: 250.00,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"
    ],
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa", "Room Service", "Parking"]
  },
  {
    id: '5',
    name: "Ocean View Resort",
    description: "Beautiful beachfront resort with stunning ocean views and tropical atmosphere.",
    address: "456 Beach Boulevard",
    city: "Miami",
    country: "USA",
    pricePerNight: 180.00,
    reviews: 200,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: ["WiFi", "Beach Access", "Pool", "Restaurant", "Bar", "Water Sports"]
  },
  {
    id: '2',
    name: "Mountain Lodge",
    description: "Cozy mountain retreat perfect for nature lovers and adventure seekers.",
    address: "789 Mountain Road",
    city: "Denver",
    country: "USA",
    reviews: 80,
    pricePerNight: 120.00,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    amenities: ["WiFi", "Fireplace", "Hiking", "Restaurant", "Parking", "Pet Friendly"]
  },
  {
    id: '3',
    name: "Business Suites",
    description: "Modern business hotel with all amenities for corporate travelers.",
    address: "321 Business District",
    city: "Chicago",
    country: "USA",
    reviews: 120,
    pricePerNight: 200.00,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800"
    ],
    amenities: ["WiFi", "Business Center", "Gym", "Restaurant", "Meeting Rooms", "Airport Shuttle"]
  },
  {
    id: '4',
    name: "Historic Inn",
    description: "Charming historic hotel with vintage charm and modern comfort.",
    address: "654 Heritage Lane",
    city: "Boston",
    country: "USA",
    reviews: 90,
    pricePerNight: 150.00,
    rating: 4.1,
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    amenities: ["WiFi", "Restaurant", "Bar", "Parking", "Historic Tours", "Library"]
  }
];