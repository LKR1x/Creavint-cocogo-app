import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform,
  Switch,
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function PostVehicleScreen({ navigation }) {
  const [driverAvailable, setDriverAvailable] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post a Vehicle</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- SECTION 1: Vehicle Type --- */}
        <Text style={styles.sectionHeader}>1. Select your Vehicle Type</Text>
        <TouchableOpacity style={styles.dropdownInput}>
            <MaterialCommunityIcons name="car-outline" size={20} color="#13EC80" style={{ marginRight: 10 }} />
            <Text style={styles.placeholderText}>Vehicle Type</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>


        {/* --- SECTION 2: Vehicle Details --- */}
        <Text style={styles.sectionHeader}>2. Vehicle Details</Text>
        
        <Text style={styles.label}>Vehicle Model & Year</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="e.g., Toyota Aqua, 2018" 
                placeholderTextColor="#aaa"
                style={styles.textInput}
            />
        </View>

        <Text style={styles.label}>Vehicle Number</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="e.g., AB 1234" 
                placeholderTextColor="#aaa"
                style={styles.textInput}
            />
        </View>

        <Text style={styles.label}>Description</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput 
                placeholder="Describe key features of your Vehicle..." 
                placeholderTextColor="#aaa"
                multiline={true}
                numberOfLines={4}
                style={[styles.textInput, styles.textArea]}
            />
        </View>


        {/* --- SECTION 3: Vehicle Photos --- */}
        <Text style={styles.sectionHeader}>3. Vehicle Photos</Text>
        
        {/* Upload Area */}
        <TouchableOpacity style={styles.uploadBox}>
            <MaterialCommunityIcons name="image-plus" size={40} color="gray" />
            <Text style={styles.uploadText}>Tap to upload photos</Text>
            <Text style={styles.uploadSubText}>Add at least 3 high-quality images</Text>
        </TouchableOpacity>

        {/* Thumbnails Row (Dummy Images) */}
        <View style={styles.thumbnailRow}>
            <Image source={require('../../assets/cards/Ather.png')} style={styles.thumbnail} />
            <Image source={require('../../assets/cards/hondadio.png')} style={styles.thumbnail} />
            <Image source={require('../../assets/cards/bajajre.png')} style={styles.thumbnail} />
        </View>


        {/* --- SECTION 4: Driver & Location --- */}
        <Text style={styles.sectionHeader}>4. Driver & Location</Text>
        
        {/* Driver Toggle */}
        <View style={styles.toggleRow}>
            <Text style={styles.labelNoMargin}>Driver Available for this vehicle</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#13EC80" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setDriverAvailable(!driverAvailable)}
                value={driverAvailable}
            />
        </View>

        <Text style={styles.label}>Vehicle Location</Text>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#13EC80" style={{ marginRight: 10 }} />
            <TextInput 
                placeholder="e.g., Colombo, Sri Lanka" 
                placeholderTextColor="#aaa"
                style={styles.textInput}
            />
        </View>


        {/* --- SECTION 5: Contact & Pricing --- */}
        <Text style={styles.sectionHeader}>5. Contact & Pricing</Text>

        <Text style={styles.label}>Contact Number</Text>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone-outline" size={20} color="#13EC80" style={{ marginRight: 10 }} />
            <TextInput 
                placeholder="+94 77 123 4567" 
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                style={styles.textInput}
            />
        </View>

        <Text style={styles.label}>Daily Rate</Text>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="cash" size={20} color="#13EC80" style={{ marginRight: 10 }} />
            <TextInput 
                placeholder="Rs. 1000.00" 
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                style={styles.textInput}
            />
        </View>

        {/* --- Submit Button --- */}
        <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Add Listing</Text>
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
    padding: 20,
    paddingBottom: 100,
  },

  // Section Headers
  sectionHeader: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
  },

  // Labels & Inputs
  label: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
    marginTop: 5,
  },
  labelNoMargin: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#000',
    height: '100%',
  },
  
  // Dropdown specific
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  placeholderText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: 'gray',
  },

  // Text Area
  textAreaContainer: {
    height: 180, 
    alignItems: 'flex-start', 
    paddingVertical: 15,
  },
  textArea: {
    textAlignVertical: 'top', // Android fix for text area
  },

  // Upload Area
  uploadBox: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderStyle: 'dashed',
    borderRadius: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  uploadText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: 'gray',
    fontSize: 18,
    marginTop: 15,
  },
  uploadSubText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  thumbnail: {
    width: 90,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  // Driver Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#13EC80',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#13EC80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
});