export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  images: string[];
  description: string;
  amenities: string[];
  
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}