import { User, Booking } from '@/types/hotel';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
  joinDate: '2022-03-15'
};

export const userBookings: Booking[] = [
  {
    id: '1',
    hotelId: '1',
    hotelName: 'Grand Palazzo Resort',
    hotelImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2024-06-15',
    checkOut: '2024-06-22',
    guests: 2,
    totalPrice: 2940,
    status: 'confirmed',
    bookingDate: '2024-01-10'
  },
  {
    id: '2',
    hotelId: '3',
    hotelName: 'Tropical Paradise Lodge',
    hotelImage: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2024-04-20',
    checkOut: '2024-04-25',
    guests: 1,
    totalPrice: 900,
    status: 'confirmed',
    bookingDate: '2024-02-28'
  },
  {
    id: '3',
    hotelId: '2',
    hotelName: 'Urban Boutique Hotel',
    hotelImage: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2024-08-10',
    checkOut: '2024-08-14',
    guests: 1,
    totalPrice: 1140,
    status: 'pending',
    bookingDate: '2024-01-25'
  }
];