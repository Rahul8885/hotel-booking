import { Hotel } from '@/types/hotel';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Palazzo Resort',
    location: 'Santorini, Greece',
    price: 420,
    rating: 4.9,
    reviews: 847,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience luxury at its finest with breathtaking views of the Aegean Sea. Our resort offers world-class amenities, exceptional service, and an unforgettable Mediterranean experience.',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Beach Access', 'Room Service'],
    coordinates: { latitude: 36.3932, longitude: 25.4615 },
    type: 'Resort',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM'
  },
  {
    id: '2',
    name: 'Urban Boutique Hotel',
    location: 'New York, USA',
    price: 285,
    rating: 4.7,
    reviews: 1203,
    image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Modern elegance in the heart of Manhattan. Perfect for business travelers and city explorers seeking luxury accommodations with easy access to all NYC attractions.',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Bar', 'Business Center', 'Concierge', 'Room Service'],
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    type: 'Boutique',
    checkIn: '3:00 PM',
    checkOut: '12:00 PM'
  },
  {
    id: '3',
    name: 'Tropical Paradise Lodge',
    location: 'Bali, Indonesia',
    price: 180,
    rating: 4.8,
    reviews: 692,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Immerse yourself in the natural beauty of Bali. Our eco-friendly lodge offers stunning jungle views, authentic cultural experiences, and unparalleled tranquility.',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Yoga Studio', 'Garden', 'Cultural Tours'],
    coordinates: { latitude: -8.3405, longitude: 115.0920 },
    type: 'Lodge',
    checkIn: '2:00 PM',
    checkOut: '11:00 AM'
  },
  {
    id: '4',
    name: 'Alpine Mountain Resort',
    location: 'Swiss Alps, Switzerland',
    price: 520,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxury meets adventure in the heart of the Swiss Alps. Perfect for skiing enthusiasts and nature lovers seeking premium accommodations with mountain views.',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Bar', 'Ski Equipment', 'Fireplace', 'Mountain Guides'],
    coordinates: { latitude: 46.5197, longitude: 7.4815 },
    type: 'Resort',
    checkIn: '4:00 PM',
    checkOut: '10:00 AM'
  },
  {
    id: '5',
    name: 'Coastal Breeze Hotel',
    location: 'Miami, USA',
    price: 320,
    rating: 4.6,
    reviews: 934,
    image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Art Deco elegance meets modern luxury on Miami Beach. Enjoy direct beach access, vibrant nightlife, and world-class dining in the heart of South Beach.',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Bar', 'Gym', 'Nightclub', 'Valet'],
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
    type: 'Hotel',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM'
  },
  {
    id: '6',
    name: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    price: 680,
    rating: 4.8,
    reviews: 1156,
    image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Experience the pinnacle of luxury in the golden dunes of Dubai. Our resort offers unmatched opulence with desert adventures, world-class spa treatments, and exceptional cuisine.',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Desert Safari', 'Helicopter Tours', 'Butler Service'],
    coordinates: { latitude: 25.2048, longitude: 55.2708 },
    type: 'Resort',
    checkIn: '3:00 PM',
    checkOut: '12:00 PM'
  }
];