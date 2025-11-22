import 'react-native-gesture-handler'; 
import * as React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer'; // Added extra imports here
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import { 
  useFonts, 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold 
} from '@expo-google-fonts/plus-jakarta-sans';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MapScreen from './src/screens/MapScreen';
import VehicleDetailsScreen from './src/screens/VehicleDetailsScreen';
import OwnerContactScreen from './src/screens/OwnerContactScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen1 from './src/screens/OnboardingScreen1';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import PostVehicleScreen from './src/screens/PostVehicleScreen';

const BookingsScreen = () => <View style={{flex:1, backgroundColor:'#fff'}}><Text>Bookings Screen</Text></View>;
const SavedScreen = () => <View style={{flex:1, backgroundColor:'#fff'}}><Text>Saved Screen</Text></View>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// --- 1. CUSTOM DRAWER CONTENT COMPONENT ---
function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        
        {/* A. LOGO SECTION */}
        <View style={styles.drawerHeader}>
          
          <View style={styles.logoPlaceholder}>
             <Image source={require('./assets/logo.png')} style={styles.logo} /> 
             <Text style={styles.logoText}>COCOGO</Text>
          </View>
        </View>

        {/* B. MENU ITEMS (This renders the "Post Vehicle" button) */}
        <View style={{ paddingTop: 10 }}>
            <DrawerItemList {...props} />
        </View>

      </DrawerContentScrollView>

      {/* C. FOOTER SECTION */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Creavint-app</Text>
        <Text style={styles.footerText}>cocogo</Text>
        <View style={styles.divider} />
        <Text style={styles.footerName}>Pasindu lakruwan</Text>
      </View>
    </View>
  );
}

// --- Navigators ---

function HomeStackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={VehicleDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerContact" component={OwnerContactScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MapPage" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = 'magnify'; 
          else if (route.name === 'Bookings') iconName = focused ? 'calendar-text' : 'calendar-text-outline';
          else if (route.name === 'Saved') iconName = focused ? 'bookmark' : 'bookmark-outline';
          return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#00E096',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 12, marginBottom: 10 }, 
        tabBarStyle: { height: 80, backgroundColor: '#fff', borderTopWidth: 0, paddingTop: 10, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackGroup} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      // 2. Use our Custom Content
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#13EC80', // Green text for active
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { 
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: 18,
          marginLeft: 0,
        }
      }}
    >
      {/* Option 1: Dashboard (HIDDEN FROM MENU, BUT EXISTS) */}
      <Drawer.Screen 
        name="Dashboard" 
        component={MainTabNavigator} 
        options={{
          drawerItemStyle: { display: 'none' } // <--- HIDES HOME BUTTON
        }}
      />

      {/* Option 2: Post Vehicle (VISIBLE) */}
      <Drawer.Screen 
        name="PostVehicle" 
        component={PostVehicleScreen} 
        options={{
          title: 'Add Vehicles',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle" size={28} color={color}/>
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) return null; 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
          <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
          <Stack.Screen name="MainApp" component={MainDrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// --- 3. DRAWER STYLES ---
const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  logoPlaceholder: {
    marginTop:50,
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 24,
    color: '#000',
    marginTop: 10,
  },
  // If using an actual image, use this style:
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  footerName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: '#333',
  }
});