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

// --- Categories Data ---
const CATEGORIES = [
  { id: 'all', name: 'All', icon: null },
  { id: 'cars', name: 'Cars', icon: 'car-outline' },
  { id: 'tuktuks', name: 'Tuk Tuks', icon: 'rickshaw' }, 
  { id: 'scooters', name: 'Scooters', icon: 'moped-outline' },
];

export default function MapScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 1. Header with BACK BUTTON */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Explore Sri Lanka</Text>
        
        <TouchableOpacity>
          <MaterialCommunityIcons name="account-circle-outline" size={32} color="#555" />
        </TouchableOpacity>
      </View>

      {/* 2. Map Content */}
      <View style={styles.container}>
        
        <Image 
            source={require('../../assets/map.png')} 
            style={styles.mapImage} 
        />

        <View style={styles.overlayContainer}>
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
        </View>

        <TouchableOpacity style={styles.myLocationButton}>
            <MaterialCommunityIcons name="crosshairs-gps" size={38} color="#000000ff" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
      flex: 1,
      position: 'relative',
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
  mapImage: {
      width: width,
      height: '100%', 
      resizeMode: 'cover',
  },
  overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 20,
  },
  searchPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
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
    marginTop: 20, 
    paddingLeft: 20, 
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
  myLocationButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#13EC80',
      width: 72,
      height: 72,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#00E096',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
  }
});