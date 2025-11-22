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
  TextInput,
  Switch
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// --- Dummy Data for Results ---
const SEARCH_RESULTS = [
  {
    id: 1,
    name: 'Bajaj RE Tuk-Tuk',
    status: 'Available',
    location: 'Peradeniya',
    price: 'Rs 1500.00',
    image: require('../../assets/cards/bajajre.png'), 
  },
  {
    id: 2,
    name: 'Honda Dio',
    status: 'Available',
    location: 'Kandy',
    price: 'Rs 1500.00',
    image: require('../../assets/cards/hondadio.png'),
  },
];

// --- Component: Horizontal Result Card ---
const ResultCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.resultCard} onPress={onPress} activeOpacity={0.8}>
      <Image source={item.image} style={styles.resultImage} />
      
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.name}</Text>
        <Text style={styles.resultStatus}>{item.status}</Text>
        
        <View style={styles.resultLocationRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color="#00E096" />
          <Text style={styles.resultLocation}>{item.location}</Text>
        </View>
        
        <Text style={styles.resultPrice}>
          {item.price} <Text style={styles.perDayText}>/day</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Component: Visual Price Slider (Custom UI) ---
const VisualDualSlider = () => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrackBackground} />
      <View style={styles.sliderTrackActive} />
      
      <View style={[styles.sliderThumb, { left: '25%' }]}>
        <View style={styles.sliderThumbInner} />
      </View>
      
      <View style={[styles.sliderThumb, { left: '75%' }]}>
        <View style={styles.sliderThumbInner} />
      </View>

      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabelText}>1000</Text>
        <Text style={styles.sliderLabelText}>5000</Text>
      </View>
    </View>
  );
};

export default function SearchScreen({ navigation }) {
  const [includeDriver, setIncludeDriver] = useState(true);
  const [minPrice, setMinPrice] = useState('1500');
  const [maxPrice, setMaxPrice] = useState('4000');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 1. Top Navbar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Sri Lanka</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="account-circle-outline" size={32} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Page Title */}
        <Text style={styles.pageTitle}>Find Your Perfect Ride</Text>

        {/* 1. Vehicle Type */}
        <TouchableOpacity style={styles.inputField}>
          <MaterialCommunityIcons name="car-outline" size={20} color="#00E096" style={styles.inputIcon} />
          <Text style={styles.inputText}>Vehicle Type</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* 2. Location */}
        <View style={styles.inputField}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="#00E096" style={styles.inputIcon} />
          <TextInput 
            placeholder="Location" 
            placeholderTextColor="#333" 
            style={styles.textInput}
          />
        </View>

        {/* 3. Driver Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.labelBold}>Include Driver</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#13EC80" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIncludeDriver(!includeDriver)}
            value={includeDriver}
          />
        </View>

        {/* 4. Price Slider */}
        <Text style={styles.labelBold}>Price Range (Per day)</Text>
        <VisualDualSlider />

        {/* Price Inputs */}
        <View style={styles.priceInputRow}>
          <View style={styles.priceInputWrapper}>
             <Text style={styles.priceLabel}>From</Text>
             <View style={styles.smallInput}>
                <TextInput 
                  value={minPrice} 
                  onChangeText={setMinPrice} 
                  keyboardType="numeric" 
                  style={styles.smallInputText} 
                />
             </View>
          </View>

          <View style={styles.priceInputWrapper}>
             <Text style={styles.priceLabel}>To</Text>
             <View style={styles.smallInput}>
                <TextInput 
                  value={maxPrice} 
                  onChangeText={setMaxPrice} 
                  keyboardType="numeric" 
                  style={styles.smallInputText} 
                />
             </View>
          </View>
        </View>

        {/* 5. Search Button */}
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* 6. Search Results */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>6 Results Found</Text>
        </View>

        {/* --- UPDATED NAVIGATION LOGIC HERE --- */}
        {SEARCH_RESULTS.map((item) => (
          <ResultCard 
            key={item.id} 
            item={item} 
            onPress={() => navigation.navigate('Home', { screen: 'Details' })} 
          />
        ))}

        <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>

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
    padding: 20,
    paddingBottom: 100,
  },
  pageTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    color: '#000',
    marginBottom: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#555',
    flex: 1,
  },
  textInput: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#000',
    flex: 1,
    height: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  labelBold: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderTrackBackground: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
  },
  sliderTrackActive: {
    height: 4,
    backgroundColor: '#13EC80',
    borderRadius: 2,
    position: 'absolute',
    left: '25%',
    width: '50%',
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#13EC80',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 8, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sliderThumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#13EC80',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: 35,
  },
  sliderLabelText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: 'gray',
    fontSize: 14,
  },
  priceInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
    gap: 20,
  },
  priceInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  priceLabel: {
      fontFamily: 'PlusJakartaSans_700Bold',
      fontSize: 18,
      marginRight: 10,
  },
  smallInput: {
      backgroundColor: '#fff',
      width: 100,
      height: 45,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
  },
  smallInputText: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 18,
      color: '#555',
      textAlign: 'center',
      width: '100%',
  },
  searchButton: {
    backgroundColor: '#13EC80',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#13EC80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  searchButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000', 
  },
  resultsHeader: {
    marginBottom: 15,
  },
  resultsCount: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#000',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  resultInfo: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  resultTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 2,
  },
  resultStatus: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  resultLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLocation: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: 'gray',
    marginLeft: 4,
  },
  resultPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
  perDayText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: 'gray',
  },
  seeAllBtn: {
      alignItems: 'flex-end',
      marginTop: 5,
  },
  seeAllText: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 14,
      color: '#000',
  }
});