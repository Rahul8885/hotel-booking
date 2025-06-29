import { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { hotels } from '@/data/hotels';
import HotelCard from '@/components/HotelCard';
import SearchBar from '@/components/SearchBar';
import { Star, DollarSign, MapPin } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'reviews';
type FilterOption = 'all' | 'resort' | 'boutique' | 'hotel' | 'lodge';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchQuery.toLowerCase()) 
        // hotel.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(hotel => 
        hotel.city.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, filterBy]);

  const handleFilterPress = () => {
    // Cycle through filter options
    const options: FilterOption[] = ['all', 'resort', 'boutique', 'hotel', 'lodge'];
    const currentIndex = options.indexOf(filterBy);
    const nextIndex = (currentIndex + 1) % options.length;
    setFilterBy(options[nextIndex]);
  };

  const getSortIcon = (option: SortOption) => {
    switch (option) {
      case 'price-low':
      case 'price-high':
        return <DollarSign size={16} color="#2563EB" />;
      case 'rating':
        return <Star size={16} color="#2563EB" />;
      case 'reviews':
        return <MapPin size={16} color="#2563EB" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={styles.title}>Search & Filter</Text>
      </Animated.View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={handleFilterPress}
        placeholder="Search destinations, hotels..."
      />

      <Animated.View entering={FadeInDown.delay(200)} style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortContainer}>
          {[
            { key: 'rating', label: 'Top Rated' },
            { key: 'price-low', label: 'Price: Low to High' },
            { key: 'price-high', label: 'Price: High to Low' },
            { key: 'reviews', label: 'Most Reviews' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortButton,
                sortBy === option.key && styles.sortButtonActive
              ]}
              onPress={() => setSortBy(option.key as SortOption)}
            >
              {getSortIcon(option.key as SortOption)}
              <Text style={[
                styles.sortButtonText,
                sortBy === option.key && styles.sortButtonTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>
            Filter: {filterBy === 'all' ? 'All Types' : filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}
          </Text>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeInDown.delay(300)}>
          <Text style={styles.resultsCount}>
            {filteredAndSortedHotels.length} hotels found
          </Text>
        </Animated.View>

        {filteredAndSortedHotels.map((hotel, index) => (
          <HotelCard key={hotel.id} hotel={hotel} index={index} />
        ))}

        {filteredAndSortedHotels.length === 0 && (
          <Animated.View entering={FadeInDown.delay(400)} style={styles.noResults}>
            <Text style={styles.noResultsText}>No hotels found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search or filter options
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  filtersContainer: {
    paddingVertical: 12,
  },
  sortContainer: {
    paddingHorizontal: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  sortButtonActive: {
    backgroundColor: '#EBF4FF',
  },
  sortButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  sortButtonTextActive: {
    color: '#2563EB',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
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