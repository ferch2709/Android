import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import BMIScreen from '../screens/BMIScreen';
import NutritionScreen from '../screens/NutritionScreen';
import SensorScreen from '../screens/SensorScreen';
import WaterScreen from '../screens/WaterScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.cardBg },
        headerTintColor: COLORS.text,
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: COLORS.cardBg,
          borderTopColor: '#334155',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'IMC') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Nutrición') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Sensor') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Agua') {
            iconName = focused ? 'water' : 'water-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="IMC" component={BMIScreen} options={{ title: 'Composición' }} />
      <Tab.Screen name="Nutrición" component={NutritionScreen} options={{ title: 'Calorías' }} />
      <Tab.Screen name="Sensor" component={SensorScreen} options={{ title: 'Entrenador' }} />
      <Tab.Screen name="Agua" component={WaterScreen} options={{ title: 'Hidratación' }} />
    </Tab.Navigator>
  );
}