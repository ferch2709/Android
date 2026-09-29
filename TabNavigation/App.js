import { View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({ 
          headerShown: false,
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-sharp';
            } else if (route.name === 'Buscar') {
              iconName = focused ? 'search' : 'search-sharp';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
          })}
        >
        <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        />
        <Tab.Screen 
        name="Buscar" 
        component={SearchScreen} 
        />
        <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

