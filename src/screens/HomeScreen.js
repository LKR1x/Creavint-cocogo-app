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
  Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// --- Dummy Data ---
const VEHICLES = [
  {
    id: 1,
    name: 'Bajaj RE 2018',
    location: 'Kandy',
    price: 'Rs.2000.00',
    rating: 4.6,
    image: require('../../assets/cards/bajajre.png'), 
    type: 'Tuk Tuk'
  },
  {
    id: 2,
    name: 'Honda Dio 2018',
    location: 'Gampola',
    price: 'Rs.1500.00',
    rating: 4.2,
    image: require('../../assets/cards/hondadio.png'),
    type: 'Scooter'
  },
  {
    id: 3,
    name: 'Ather 450S',
    location: 'Peradeniya',
    price: 'Rs.1500.00',
    rating: 4.0,
    image: require('../../assets/cards/Ather.png'), 
    type: 'Scooter'
  },
  {
    id: 4.4,
    name: 'Toyota Prius',
    location: 'Kandy',
    price: 'Rs.4500.00',
    rating: 4.1,
    image: require('../../assets/cards/prius.png'), 
    type: 'Car'
  }
];

// --- Categories Data ---
const CATEGORIES = [
  { id: 'all', name: 'All', icon: null },
  { id: 'cars', name: 'Cars', icon: 'car-outline' },
  { id: 'tuktuks', name: 'Tuk Tuks', icon: 'rickshaw' }, 
  { id: 'scooters', name: 'Scooters', icon: 'moped-outline' },
];

// --- Component: Vehicle Card ---
const VehicleCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <MaterialCommunityIcons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.ratingRow}>
          <MaterialCommunityIcons name="star" size={14} color="#00E096" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>

        <View style={styles.locationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#00E096" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <Text style={styles.priceText}>
          {item.price}<Text style={styles.perDayText}>/day</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 1. HEADER WITH DRAWER MENU */}
      <View style={styles.header}>
        {/* This opens the Slider Menu */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Explore Sri Lanka</Text>
        
        <TouchableOpacity>
          <MaterialCommunityIcons name="account-circle-outline" size={32} color="#555" />
        </TouchableOpacity>
      </View>

      {/* 2. SCROLLABLE CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.searchPlaceholder}>
             <MaterialCommunityIcons name="magnify" size={20} color="#00E096" />
             <Text style={styles.searchText}>Search by Location or Vehicle</Text>
        </View>

        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}
                  onPress={() => setActiveCategory(cat.id)}
                >
                  {cat.icon && (
                    <MaterialCommunityIcons 
                      name={cat.icon} 
                      size={20} 
                      color={isActive ? '#000000ff' : '#000'} 
                      style={{ marginRight: 8 }}
                    />
                  )}
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.gridContainer}>
          {VEHICLES.map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              item={vehicle} 
              onPress={() => navigation.navigate('Details')} 
            />
          ))}
        </View>
      </ScrollView>

      {/* 3. FLOATING BUTTON TO GO TO MAP PAGE */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('MapPage')} 
      >
        <MaterialCommunityIcons name="map-outline" size={30} color="#000000ff" style={{ marginRight: 8 }} />
        <Text style={styles.floatingButtonText}>Map</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
    paddingHorizontal: 20,
    paddingBottom: 80, 
    paddingTop: 20, 
  },
  searchPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginTop: 0, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  searchText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18, 
    color: 'gray',
    marginLeft: 10,
  },
  categoryContainer: {
    marginVertical: 20, 
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12, 
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  categoryBtnActive: {
    backgroundColor: '#13EC80', 
    elevation: 0,
  },
  categoryText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18, 
    color: '#000',
  },
  categoryTextActive: {
    color: '#000000ff', 
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 180, 
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 4,
  },
  cardContent: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18, 
    marginLeft: 4,
    color: '#333',
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18, 
    color: '#000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16, 
    color: 'gray',
    marginLeft: 4,
  },
  priceText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18, 
    color: '#000',
  },
  perDayText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: 'gray',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#13EC80', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    borderRadius: 70, 
    elevation: 5,
    shadowColor: '#00E096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#000000ff',
    fontSize: 18, 
  },
});