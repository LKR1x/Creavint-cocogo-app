import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Dimensions, 
  StatusBar 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen2({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Sinhala', 'Tamil'];

  return (
    // 1. Background Image Container
    <ImageBackground 
      source={require('../../assets/onboarding_bg_2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* 2. Content Container */}
      <View style={styles.contentContainer}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>COCOGO</Text>
        </View>

        {/* Language Selection Section */}
        <View style={styles.selectionSection}>
          <Text style={styles.sectionTitle}>Select your Language</Text>

          {languages.map((lang) => (
            <TouchableOpacity 
              key={lang} 
              style={[
                styles.langButton, 
                selectedLanguage === lang && styles.langButtonActive // Highlight if selected
              ]}
              onPress={() => setSelectedLanguage(lang)}
              activeOpacity={0.9}
            >
              <Text style={[
                styles.langText,
                selectedLanguage === lang && styles.langTextActive
              ]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.hintText}>
            Your language preference can be changed at anytime in settings
          </Text>

          <TouchableOpacity 
            style={styles.getStartedButton} 
            onPress={() => navigation.replace('MainApp')} // Navigate to Main App
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between', // Distributes Header, Middle, Footer evenly
    paddingTop: 100, // Push content down from top
    paddingBottom: 50, // Push content up from bottom
  },
  
  // --- Header ---
  headerSection: {
    alignItems: 'center',
    marginTop:-15,
  },
  welcomeText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 36,
    color: '#000',
    marginBottom: 0,
  },
  brandText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 40,
    color: '#000',
    textTransform: 'uppercase',
  },

  // --- Middle Selection ---
  selectionSection: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#000',
    marginBottom: 25,
  },
  langButton: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    // Shadow for elevation effect
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  langButtonActive: {
    borderWidth: 1.5,
    borderColor: '#13EC80', // Green border for active
    backgroundColor: '#F0FFF9', // Light green tint
  },
  langText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
    color: '#000',
  },
  langTextActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#000',
  },

  // --- Footer ---
  footerSection: {
    alignItems: 'center',
    width: '100%',
  },
  hintText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  getStartedButton: {
    backgroundColor: '#13EC80', // Primary Green
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#13EC80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  getStartedButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#000',
  },
});