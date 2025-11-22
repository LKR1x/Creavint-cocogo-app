import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Wait 3 seconds then go to Onboarding
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/splash_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Fallback text if image fails */}
      <Text style={styles.brandText}>COCOGO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Off-white background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00E096', // The Brand Green
    letterSpacing: 2,
  },
});