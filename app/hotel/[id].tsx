import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Wifi, Coffee, Car, Dumbbell, Clock, Calendar } from 'lucide-react-native';
import { hotels } from '@/data/hotels';
import { Hotel } from '@/types/hotel';
import Animated, { FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Pool': null,
  'Spa': null,
  'Restaurant': Coffee,
  'Bar': null,
  'Gym': Dumbbell,
  'Beach Access': null,
  'Room Service': null,
  'Business Center': null,
  'Concierge': null,
  'Valet': Car,
  'Parking': Car,
};

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const scrollX = useSharedValue(0);

  useEffect(() => {
    if (id) {
      const foundHotel = hotels.find(h => h.id === id);
      setHotel(foundHotel || null);
    }
  }, [id]);

  const handleImageScroll = (event: any) => {
    const slideSize = width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentImageIndex(index);
  };

  const handleBookNow = () => {
    if (hotel) {
      router.push({
        pathname: '/checkout',
        params: { hotelId: hotel.id }
      });
    }
  };

  const handleBack = () => {
    router.back();
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Image Gallery */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {hotel.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.backButtonOverlay} onPress={handleBack}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          
          <View style={styles.imageIndicators}>
            {hotel.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === currentImageIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.5)' }
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Hotel Info */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.locationRow}>
                <MapPin color="#6B7280" size={16} />
                <Text style={styles.location}>{hotel.address} {hotel?.country} {hotel?.city}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Star color="#F59E0B" size={20} fill="#F59E0B" />
              <Text style={styles.rating}>{hotel.rating}</Text>
              <Text style={styles.reviewCount}>({hotel.reviews})</Text>
            </View>
          </View>

          <Text style={styles.description}>{hotel.description}</Text>

          {/* Check-in/out Times */}
          {/* <Animated.View entering={FadeInDown.delay(300)} style={styles.timesContainer}>
            <View style={styles.timeItem}>
              <Clock color="#2563EB" size={20} />
              <View style={styles.timeContent}>
                <Text style={styles.timeLabel}>Check-in</Text>
                <Text style={styles.timeValue}>{hotel.ch}</Text>
              </View>
            </View>
            <View style={styles.timeItem}>
              <Clock color="#2563EB" size={20} />
              <View style={styles.timeContent}>
                <Text style={styles.timeLabel}>Check-out</Text>
                <Text style={styles.timeValue}>{hotel.checkOut}</Text>
              </View>
            </View>
          </Animated.View> */}

          {/* Amenities */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.amenitiesContainer}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {hotel.amenities.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity];
                return (
                  <Animated.View 
                    key={amenity}
                    entering={FadeInDown.delay(500 + index * 50)}
                    style={styles.amenityItem}
                  >
                    {IconComponent ? (
                      <IconComponent color="#2563EB" size={20} />
                    ) : (
                      <View style={styles.amenityIconPlaceholder} />
                    )}
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>

          {/* Pricing */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.pricingContainer}>
            <View style={styles.priceRow}>
              <View>
                <Text style={styles.priceAmount}>${hotel.pricePerNight}</Text>
                <Text style={styles.priceLabel}>per night</Text>
              </View>
              {/* <Text style={styles.hotelType}>{hotel.type}</Text> */}
            </View>
          </Animated.View>
        </Animated.View>
      </ScrollView>

      {/* Book Now Button */}
      <Animated.View entering={FadeInUp.delay(700)} style={styles.bookingContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Calendar color="#ffffff" size={20} />
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 100,
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
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  hotelName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginLeft: 2,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  timesContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  timeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContent: {
    marginLeft: 8,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  timeValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 6,
  },
  amenityIconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  pricingContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  hotelType: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bookingContainer: {
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
  bookButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
});