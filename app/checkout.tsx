import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Users, CreditCard, CircleCheck as CheckCircle, User, Mail, Phone, LogIn } from 'lucide-react-native';
import { hotels } from '@/data/hotels';
import { Hotel } from '@/types/hotel';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function CheckoutScreen() {
  const { hotelId } = useLocalSearchParams<{ hotelId: string }>();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [checkInDate, setCheckInDate] = useState('2024-06-15');
  const [checkOutDate, setCheckOutDate] = useState('2024-06-22');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const API_BASE_URL = 'http://13.222.49.166:3000/api'
  useEffect(() => {
    if (hotelId) {
      const foundHotel = hotels.find(h => h.id === hotelId);
      setHotel(foundHotel || null);
    }
  }, [hotelId]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFullName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [isAuthenticated, user]);

  const calculateNights = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    if (!hotel) return 0;
    const nights = calculateNights();
    const subtotal = hotel.pricePerNight * nights;
    const taxes = subtotal * 0.12; // 12% tax
    const fees = 25; // Service fees
    return subtotal + taxes + fees;
  };

  const handleConfirmBooking = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
     const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}` // Assuming user token is available
        },
        body: JSON.stringify({
          guestDetails: {
            fullName,
            email,
            phone,
          },
          hotelId: hotel?.id,
          checkInDate,
          checkOutDate,
          guests,
          totalAmount: calculateTotal(),
        }),
      });
    const data = await response.json();
    console.log('Booking response:', data);
    if (data.data.booking.id) {
      const paymentIntent = await fetch(`${API_BASE_URL}/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,// Assuming user token is available
        },
        body: JSON.stringify({
          bookingId: data.data.booking.id, // Use the booking ID from the response
          amount: calculateTotal() * 100, // Convert to cents
         
          // currency: 'usd',
          // description: `Booking for ${hotel?.name} from ${checkInDate} to ${checkOutDate}`,
        }),

          // 
      });
      const paymentRes = await paymentIntent.json();
      console.log('Payment intent response:', paymentRes);
    }
    setShowConfirmation(true);
  };

  const handlePaymentComplete = () => {
    setShowConfirmation(false);
    // In a real app, this would process the payment
    setTimeout(() => {
      Alert.alert(
        'Booking Confirmed!',
        'Your hotel reservation has been confirmed. Check your email for details.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/')
          }
        ]
      );
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSignIn = () => {
    router.push('/auth');
  };

  if (!hotel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Hotel not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <TouchableOpacity style={styles.backButtonHeader} onPress={handleBack}>
            <ArrowLeft color="#111827" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.signInPrompt}>
          <View style={styles.signInIcon}>
            <LogIn color="#6B7280" size={48} />
          </View>
          <Text style={styles.signInTitle}>Sign in to continue booking</Text>
          <Text style={styles.signInSubtitle}>
            You need to be signed in to complete your hotel reservation
          </Text>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <LogIn color="#ffffff" size={20} />
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  const nights = calculateNights();
  const subtotal = hotel.pricePerNight * nights;
  const taxes = subtotal * 0.12;
  const fees = 25;
  const total = calculateTotal();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
        <TouchableOpacity style={styles.backButtonHeader} onPress={handleBack}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hotel Summary */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.hotelSummary}>
          <Image source={{ uri: hotel.imageUrl }} style={styles.hotelImage} />
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName} numberOfLines={2}>{hotel.name}</Text>
            <Text style={styles.hotelLocation}>{hotel.address} {hotel?.city} {hotel.country}</Text>
            <Text style={styles.hotelPrice}>${hotel.pricePerNight}/night</Text>
          </View>
        </Animated.View>

        {/* Booking Details */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.bookingRow}>
            <View style={styles.bookingItem}>
              <Calendar color="#2563EB" size={20} />
              <View style={styles.bookingContent}>
                <Text style={styles.bookingLabel}>Check-in</Text>
                <TextInput
                  style={styles.dateInput}
                  value={checkInDate}
                  onChangeText={setCheckInDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>
            
            <View style={styles.bookingItem}>
              <Calendar color="#2563EB" size={20} />
              <View style={styles.bookingContent}>
                <Text style={styles.bookingLabel}>Check-out</Text>
                <TextInput
                  style={styles.dateInput}
                  value={checkOutDate}
                  onChangeText={setCheckOutDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>
          </View>

          <View style={styles.guestsContainer}>
            <Users color="#2563EB" size={20} />
            <View style={styles.guestsContent}>
              <Text style={styles.bookingLabel}>Guests</Text>
              <View style={styles.guestsControls}>
                <TouchableOpacity 
                  style={styles.guestButton}
                  onPress={() => setGuests(Math.max(1, guests - 1))}
                >
                  <Text style={styles.guestButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.guestsCount}>{guests}</Text>
                <TouchableOpacity 
                  style={styles.guestButton}
                  onPress={() => setGuests(guests + 1)}
                >
                  <Text style={styles.guestButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Guest Information */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Information</Text>
          
          <View style={styles.inputContainer}>
            <User color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Mail color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Phone color="#6B7280" size={20} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </Animated.View>

        {/* Price Breakdown */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>${hotel.pricePerNight} × {nights} nights</Text>
            <Text style={styles.priceValue}>${subtotal.toLocaleString()}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & fees</Text>
            <Text style={styles.priceValue}>${(taxes + fees).toFixed(0)}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Confirm Button */}
      <Animated.View entering={FadeInUp.delay(600)} style={styles.confirmContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
          <CreditCard color="#ffffff" size={20} />
          <Text style={styles.confirmButtonText}>Confirm & Pay ${total.toLocaleString()}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Payment Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeInUp.delay(100)} style={styles.modalContent}>
            <CheckCircle color="#059669" size={64} />
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalText}>
              You're about to pay ${total.toLocaleString()} for your booking at {hotel.name}.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonSecondary}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.modalButtonSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={handlePaymentComplete}
              >
                <Text style={styles.modalButtonPrimaryText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButtonHeader: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  hotelSummary: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  hotelInfo: {
    flex: 1,
    marginLeft: 16,
  },
  hotelName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  hotelLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  hotelPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  bookingRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookingItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  bookingContent: {
    flex: 1,
    marginLeft: 12,
  },
  bookingLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  dateInput: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestsContent: {
    flex: 1,
    marginLeft: 12,
  },
  guestsControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: '#F3F4F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  guestsCount: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    paddingVertical: 16,
    marginLeft: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  confirmButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  confirmButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  modalButtonSecondary: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  modalButtonPrimary: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
});