import React from 'react';
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
  Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function OwnerContactScreen({ navigation }) {

  const handleCall = () => {
    Linking.openURL('tel:+94771234567');
  };

  const handleWhatsapp = () => {
    Linking.openURL('whatsapp://send?phone=+94771234567');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Details</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Profile Section (Moved Up) */}
        <View style={styles.profileContainer}>
          {/* Ripples */}
          <View style={styles.rippleOuter}>
            <View style={styles.rippleMiddle}>
              <View style={styles.rippleInner}>
                <Image 
                  source={require('../../assets/owner.jpg')} 
                  style={styles.profileImage} 
                />
              </View>
            </View>
          </View>
          
          <Text style={styles.ownerName}>Mr. Perera</Text>
          
          <Text style={styles.descriptionText}>
            👋 Hey there! I'm Perera. Looking for a ride? I can help with any vehicle, just call!
          </Text>
        </View>

        {/* 3. Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <MaterialCommunityIcons name="phone" size={24} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.callButtonText}>Call (+94)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsapp}>
            <MaterialCommunityIcons name="whatsapp" size={24} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.whatsappButtonText}>Whatsapp</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Pickup Location */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Pickup Location</Text>
          <View style={styles.addressRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#13EC80" />
            <Text style={styles.addressText}>Sri Dalada Veediya, Kandy</Text>
          </View>
        </View>

        {/* 5. UPDATED: Map Card with Inner Frame */}
        <View style={styles.mapCard}>
          
          {/* New Inner Frame for the "Window" effect */}
          <View style={styles.mapInnerFrame}>
            <View style={styles.mapImageContainer}>
              <Image 
                source={require('../../assets/map_small.png')} 
                style={styles.mapImage} 
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.mapCardFooter}>
            <Text style={styles.tapMapText}>Tap map to get direction</Text>
            <TouchableOpacity style={styles.shareBtn}>
              <MaterialCommunityIcons name="share-variant-outline" size={20} color="gray" style={{ marginRight: 5 }} />
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
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

  // Profile Section
  profileContainer: {
    alignItems: 'center',
    marginTop: 10, // Moved UP (was 40)
    marginBottom: 20,
    paddingHorizontal: 30,

  },
  rippleOuter: {
    width: 160, // smaller to fit better up top
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(19, 236, 128, 0.1)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, 
  },
  rippleMiddle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'rgba(19, 236, 128, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#13EC80', 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ownerName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 8, // Moved up slightly
  },
  descriptionText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Buttons
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#13EC80',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#13EC80',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  callButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: '#000',
  },
  whatsappButton: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
  },
  whatsappButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: '#000',
  },

  // Location
  locationSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#555',
    marginLeft: 6,
  },

  // Map Card
  mapCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 30,
    paddingBottom: 5,
  },
  // NEW: Inner Frame to hold the map (The "Window" effect)
  mapInnerFrame: {
    padding: 12, // Creates the whitespace frame
  },
  mapImageContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16, // Rounding the map inside the frame
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapPinOverlay: {
    position: 'absolute',
  },
  mapCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tapMapText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: 'gray',
  },
});