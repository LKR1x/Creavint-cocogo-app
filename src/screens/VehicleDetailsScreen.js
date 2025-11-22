import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');
// Calculate width for the square card (Screen Width - Horizontal Padding of 20*2)
const CARD_WIDTH = width - 40; 

// --- Dummy Images for Slider ---
const IMAGES = [
  require('../../assets/cards/bajajre.png'), 
  require('../../assets/cards/bajajre.png'),
  require('../../assets/cards/bajajre.png'),
];

export default function VehicleDetailsScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Handle Scroll for Pagination Dots
  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle Details</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. UPDATED: Square Image Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={onScroll}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={styles.imageScrollView}
          >
            {IMAGES.map((img, index) => (
              <Image key={index} source={img} style={styles.carouselImage} />
            ))}
          </ScrollView>
          
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {IMAGES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeSlide === index ? styles.dotActive : styles.dotInactive
                ]}
              />
            ))}
          </View>
        </View>

        {/* 3. Title & Status */}
        <View style={styles.titleRow}>
          <Text style={styles.vehicleTitle}>Bajaj RE Tuk-Tuk</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Available</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={18} color="#13EC80" />
          <Text style={styles.locationText}>Sri Dalada Veediya, Kandy</Text>
        </View>

        {/* 4. Features Grid */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="car-seat" size={38} color="#13EC80" />
            <Text style={styles.featureText}>3 Seats</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="car-shift-pattern" size={38} color="#13EC80" />
            <Text style={styles.featureText}>Manual</Text>
          </View>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="gas-station" size={38} color="#13EC80" />
            <Text style={styles.featureText}>Petrol</Text>
          </View>
        </View>

        {/* 5. Driver Checkbox */}
        <View style={styles.driverRow}>
          <MaterialCommunityIcons name="checkbox-marked-outline" size={24} color="#13EC80" />
          <Text style={styles.driverText}>Driver available for this Vehicle</Text>
        </View>

        {/* 6. Price */}
        <Text style={styles.priceText}>
          Rs.2000.00 <Text style={styles.perDayText}>/day</Text>
        </Text>

        {/* 7. Rating Card */}
        <View style={styles.sectionCard}>
          <View style={styles.ratingContainer}>
            <View>
              <Text style={styles.bigRating}>4.6</Text>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map((star) => (
                <MaterialCommunityIcons 
                    key={star} 
                    name="star" 
                    size={50} // UPDATED: Increased size to 40
                    color="#13EC80" 
                />
              ))}
            </View>
          </View>
        </View>

        {/* 8. Description Card */}
        <View style={styles.sectionCard}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletItem}>• 2018 model</Text>
            <Text style={styles.bulletItem}>• 3-seater</Text>
            <Text style={styles.bulletItem}>• Excellent fuel efficiency</Text>
            <Text style={styles.bulletItem}>• Smooth city handling</Text>
            <Text style={styles.bulletItem}>• Low maintenance</Text>
            <Text style={styles.bulletItem}>• Ideal for short trips</Text>
            <Text style={styles.bulletItem}>• Manual transmission</Text>
            <Text style={styles.bulletItem}>• Well-maintained interior</Text>
          </View>
        </View>

        {/* 9. Bottom Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.ownerButton}>
            <Text style={styles.ownerButtonText}>Owner Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => navigation.navigate('OwnerContact')}
          >
            <Text style={styles.contactButtonText}>View Contact Details</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Header
  header: {
    height: 74,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // UPDATED: Carousel Styles
  carouselContainer: {
    width: CARD_WIDTH, // Use calculated width
    height: CARD_WIDTH-20, // Make it Square
    marginHorizontal: 20, // Add margins
    marginTop: 20, // Add margins
    borderRadius: 20, // Rounded Corners
    overflow: 'hidden', // Clip images to rounded corners
    marginBottom: 15,
    position: 'relative',
    backgroundColor: '#fff', // Fallback color
    elevation: 3, // Optional: Add shadow to the image card itself
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageScrollView: {
    width: CARD_WIDTH,
    height: CARD_WIDTH-20,
  },
  carouselImage: {
    width: CARD_WIDTH, 
    height: CARD_WIDTH,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 20, 
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  // Info Section
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  vehicleTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: '#000',
  },
  statusBadge: {
    backgroundColor: '#13EC80',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#000',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#555',
    marginLeft: 5,
    fontSize: 18,
  },

  // Features Grid
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    width: '30%', 
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featureText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },

  // Driver & Price
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  driverText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    marginLeft: 8,
    color: '#000',
  },
  priceText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  perDayText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 18,
    color: '#555',
  },

  // Cards
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigRating: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 36,
    color: '#000',
    lineHeight: 38,
  },
  ratingLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#555',
  },
  starsRow: {
    flexDirection: 'row',
  },
  
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: '#000',
  },
  bulletPoints: {
    marginTop: 5,
  },
  bulletItem: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: 'gray',
    marginBottom: 6,
    lineHeight: 20,
  },

  // Buttons
  buttonGroup: {
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 15,
  },
  ownerButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ownerButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
  contactButton: {
    backgroundColor: '#13EC80',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#13EC80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  contactButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000', 
  },
});