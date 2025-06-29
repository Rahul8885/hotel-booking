import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { User, Calendar, MapPin, CreditCard, Settings, LogOut, Clock, LogIn } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
// import { userBookings } from '@/data/user';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export default function BookingScreen() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const API_BASE_URL = 'http://13.222.49.166:3000/api'
  const [userBookings, setUserBookings] = useState([])
  const token = user?.token; // <- assuming you have a token in your user object
 useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/user?page=1&limit=100`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // <- assuming you have `token` from your auth hook
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
        console.log('Bookings data:', JSON.stringify(data.data.bookings));
      if (res.ok && data.success) {
        const flattened = data.data.bookings.map(b => ({
          ...b,
          hotelName: b.hotel?.name,
          hotelImage: b.hotel?.imageUrl,
        }));
        setUserBookings(flattened);
      } else {
        console.warn('Failed to load bookings:', data.message);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  if (isAuthenticated && token) {
    fetchBookings();
  }
}, [isAuthenticated, token]);

  const handleSignIn = () => {
    router.push({
      pathname: '/auth/signin',
      params: { redirect: 'profile' }
    });
  };

 

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#059669';
      case 'pending':
        return '#D97706';
      case 'cancelled':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✕';
      default:
        return '?';
    }
  };

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.delay(100)} style={styles.signInPrompt}>
          <View style={styles.signInIcon}>
            <User color="#6B7280" size={48} />
          </View>
          <Text style={styles.signInTitle}>Sign in to view your profile</Text>
          <Text style={styles.signInSubtitle}>
            Access your bookings, manage your account, and get personalized recommendations
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <LogIn color="#ffffff" size={20} />
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
                 <Text style={styles.title}>Your Bookings</Text>
                 {/* <Text style={styles.subtitle}>Discover amazing destinations and hotels</Text> */}
               </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.statsContainer}>
           
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userBookings.length}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {userBookings.filter(b => b?.status === 'confirmed').length}
            </Text>
            <Text style={styles.statLabel}>Confirmed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              ${userBookings.reduce((sum, booking) => sum + booking?.totalAmount, 0).toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </Animated.View>

        {/* Booking History */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
         
          
          {userBookings.map((booking, index) => (
            <Animated.View 
              key={booking.id}
              entering={FadeInRight.delay(400 + index * 100)}
              style={styles.bookingCard}
            >
              <Image source={{ uri: booking?.hotelImage }} style={styles.bookingImage} />
              <View style={styles.bookingContent}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingHotelName} numberOfLines={1}>
                    {booking.hotelName}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {getStatusIcon(booking.status)} {booking.status}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.bookingDetails}>
                  <View style={styles.bookingDetailRow}>
                    <Calendar color="#6B7280" size={14} />
                    <Text style={styles.bookingDetailText}>
                      {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.bookingDetailRow}>
                    <User color="#6B7280" size={14} />
                    <Text style={styles.bookingDetailText}>
                      {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.bookingPrice}>${booking?.totalAmount.toLocaleString() || ""}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Menu Options */}
     
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
     header: {
    paddingHorizontal: 20,
    paddingTop: 30,
   
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    // paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  signInPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  signInIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signInTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  signInSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  signInButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  signInButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    backgroundColor: '#059669',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 8,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  bookingContent: {
    flex: 1,
    marginLeft: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookingHotelName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  bookingDetails: {
    marginBottom: 8,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  bookingPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginLeft: 12,
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#DC2626',
  },
});