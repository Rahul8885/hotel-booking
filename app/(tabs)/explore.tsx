import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { MapPin, TrendingUp, Award, Users } from 'lucide-react-native';
import { hotels } from '@/data/hotels';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const destinations = [
  { name: 'Santorini, Greece', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600', hotels: 1 },
  { name: 'New York, USA', image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=600', hotels: 1 },
  { name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600', hotels: 1 },
  { name: 'Swiss Alps, Switzerland', image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600', hotels: 1 },
];

export default function ExploreScreen() {
  const router = useRouter();

  const topRatedHotels = hotels.filter(hotel => hotel.rating >= 4.8).slice(0, 3);
  const luxuryHotels = hotels.filter(hotel => hotel.price >= 500).slice(0, 3);

  const handleDestinationPress = (destination: string) => {
    // Navigate to search with destination filter
    console.log('Navigate to destination:', destination);
  };

  const handleHotelPress = (hotelId: string) => {
    router.push(`/hotel/${hotelId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover amazing destinations and hotels</Text>
        </Animated.View>

        {/* Popular Destinations */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp color="#2563EB" size={24} />
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {destinations.map((destination, index) => (
              <Animated.View 
                key={destination.name}
                entering={FadeInRight.delay(300 + index * 100)}
              >
                <TouchableOpacity 
                  style={styles.destinationCard}
                  onPress={() => handleDestinationPress(destination.name)}
                >
                  <Image source={{ uri: destination.image }} style={styles.destinationImage} />
                  <View style={styles.destinationOverlay}>
                    <Text style={styles.destinationName}>{destination.name}</Text>
                    <Text style={styles.destinationHotels}>{destination.hotels} hotel</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Top Rated Hotels */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award color="#F59E0B" size={24} />
            <Text style={styles.sectionTitle}>Top Rated Hotels</Text>
          </View>
          
          {topRatedHotels.map((hotel, index) => (
            <Animated.View 
              key={hotel.id}
              entering={FadeInDown.delay(500 + index * 100)}
            >
              <TouchableOpacity 
                style={styles.hotelListItem}
                onPress={() => handleHotelPress(hotel.id)}
              >
                <Image source={{ uri: hotel.image }} style={styles.hotelListImage} />
                <View style={styles.hotelListContent}>
                  <Text style={styles.hotelListName}>{hotel.name}</Text>
                  <View style={styles.hotelListLocation}>
                    <MapPin color="#6B7280" size={14} />
                    <Text style={styles.hotelListLocationText}>{hotel.location}</Text>
                  </View>
                  <View style={styles.hotelListFooter}>
                    <Text style={styles.hotelListPrice}>${hotel.price}/night</Text>
                    <Text style={styles.hotelListRating}>★ {hotel.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Luxury Collection */}
        <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users color="#059669" size={24} />
            <Text style={styles.sectionTitle}>Luxury Collection</Text>
          </View>
          
          {luxuryHotels.map((hotel, index) => (
            <Animated.View 
              key={hotel.id}
              entering={FadeInDown.delay(800 + index * 100)}
            >
              <TouchableOpacity 
                style={styles.hotelListItem}
                onPress={() => handleHotelPress(hotel.id)}
              >
                <Image source={{ uri: hotel.image }} style={styles.hotelListImage} />
                <View style={styles.hotelListContent}>
                  <Text style={styles.hotelListName}>{hotel.name}</Text>
                  <View style={styles.hotelListLocation}>
                    <MapPin color="#6B7280" size={14} />
                    <Text style={styles.hotelListLocationText}>{hotel.location}</Text>
                  </View>
                  <View style={styles.hotelListFooter}>
                    <Text style={styles.hotelListPrice}>${hotel.price}/night</Text>
                    <Text style={styles.hotelListRating}>★ {hotel.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
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
  horizontalScroll: {
    paddingHorizontal: 20,
  },
  destinationCard: {
    width: 200,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  destinationHotels: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
  hotelListItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  hotelListImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  hotelListContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  hotelListName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  hotelListLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotelListLocationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  hotelListFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelListPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  hotelListRating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
  },
});