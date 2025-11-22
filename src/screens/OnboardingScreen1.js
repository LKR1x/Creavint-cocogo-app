import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions,
  StatusBar 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen1({ navigation }) {
  return (
    <ImageBackground 
      source={require('../../assets/onboarding_bg1.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* 2. Content Container - Pushes content to the bottom */}
      <View style={styles.contentContainer}>
        
        {/* Title */}
        <Text style={styles.title}>Your ride, Your way</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>Simple steps for your perfect trip.</Text>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Onboarding2')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

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
    justifyContent: 'flex-end', // Push everything to the bottom
    paddingHorizontal: 30,
    paddingBottom: 60, // Add space from the bottom edge
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 36,
    color: '#000',
    marginBottom: 10,
    textAlign: 'left', // Matches the alignment inimage
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: '#666', // Dark gray for subtitle
    marginBottom: 40,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#13EC80', 
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#13EC80', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#000', // Black text on neon green button
    fontSize: 18,
  },
});