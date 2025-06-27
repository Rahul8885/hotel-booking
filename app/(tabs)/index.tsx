import { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { hotels } from '@/data/hotels';
import HotelCard from '@/components/HotelCard';
import SearchBar from '@/components/SearchBar';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = useMemo(() => {
    if (!searchQuery.trim()) return hotels;
    
    return hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleFilterPress = () => {
    // Future implementation for filter modal
    console.log('Filter pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.title}>Find your perfect stay</Text>
      </Animated.View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={handleFilterPress}
        placeholder="Search destinations, hotels..."
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Found ${filteredHotels.length} results` : 'Featured Hotels'}
          </Text>
        </Animated.View>

        {filteredHotels.map((hotel, index) => (
          <HotelCard key={hotel.id} hotel={hotel} index={index} />
        ))}

        {filteredHotels.length === 0 && (
          <Animated.View entering={FadeInDown.delay(300)} style={styles.noResults}>
            <Text style={styles.noResultsText}>No hotels found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search terms
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});