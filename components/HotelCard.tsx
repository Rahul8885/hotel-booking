import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { Hotel } from '@/types/hotel';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    router.push(`/hotel/${hotel.id}`);
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100)}
      style={animatedStyle}
    >
      <TouchableOpacity 
        style={styles.card}
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
      >
        <Image source={{ uri: hotel.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {hotel.name}
            </Text>
            <View style={styles.rating}>
              <Star color="#F59E0B" size={16} fill="#F59E0B" />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <MapPin color="#6B7280" size={14} />
            <Text style={styles.location} numberOfLines={1}>
              {hotel.location}
            </Text>
          </View>
          
          <View style={styles.footer}>
            <View>
              <Text style={styles.price}>${hotel.price}</Text>
              <Text style={styles.priceLabel}>per night</Text>
            </View>
            <Text style={styles.reviews}>
              {hotel.reviews} reviews
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  reviews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});