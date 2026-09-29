import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importamos tus pantallas principales
import HomeScreen from './screens/HomeScreen';
import DadosScreen from './screens/DadosScreen';
import MemoramaScreen from './screens/MemoramaScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';
import DivisasScreen from './screens/DivisasScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// --- PANTALLA GENÉRICA PARA RELLENAR LAS TABS ---
// Esta la usarás para la segunda pestaña de cada juego (Estadísticas, Ajustes, etc.)
function InfoScreen({ route }) {
  return (
    <View style={styles.infoContainer}>
      <Ionicons name="construct-outline" size={80} color="#ccc" />
      <Text style={styles.infoText}>Pantalla extra para {route.name}</Text>
    </View>
  );
}

// --- ESTILO PREMIUM PARA LAS TABS FLOTANTES ---
const tabOpcionesComunes = {
  headerShown: false,
  tabBarActiveTintColor: '#FF2D55',
  tabBarInactiveTintColor: 'gray',
  tabBarShowLabel: true, // Mostramos texto para que distingas las nuevas pestañas
  tabBarStyle: {
    position: 'absolute', bottom: 20, left: 20, right: 20, elevation: 10,
    backgroundColor: '#ffffff', borderRadius: 15, height: 65, paddingBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 10,
  }
};

// --- NAVEGADORES DE TABS INDIVIDUALES (UNO POR CADA JUEGO) ---

function DadosTabs() {
  return (
    <Tab.Navigator screenOptions={tabOpcionesComunes}>
      <Tab.Screen name="Jugar" component={DadosScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="dice" size={size} color={color} /> }} />
      <Tab.Screen name="Historial" component={InfoScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="list" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

function MemoramaTabs() {
  return (
    <Tab.Navigator screenOptions={tabOpcionesComunes}>
      <Tab.Screen name="Juego" component={MemoramaScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="albums" size={size} color={color} /> }} />
      <Tab.Screen name="Puntos" component={InfoScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="trophy" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

function TicTacToeTabs() {
  return (
    <Tab.Navigator screenOptions={tabOpcionesComunes}>
      <Tab.Screen name="Partida" component={TicTacToeScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="game-controller" size={size} color={color} /> }} />
      <Tab.Screen name="Ajustes" component={InfoScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="settings" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

function DivisasTabs() {
  return (
    <Tab.Navigator screenOptions={tabOpcionesComunes}>
      <Tab.Screen name="Calculadora" component={DivisasScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="cash" size={size} color={color} /> }} />
      <Tab.Screen name="Mercado" component={InfoScreen} 
        options={{ tabBarIcon: ({color, size}) => <Ionicons name="trending-up" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

// --- NAVEGACIÓN DRAWER (Lateral Principal) ---
function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#1C1C1E' }, // Barra superior oscura "Mamalona"
        drawerActiveBackgroundColor: '#FF2D55',
        drawerActiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} options={{ drawerIcon: ({color}) => <Ionicons name="home" size={22} color={color}/> }} />
      <Drawer.Screen name="Lanzar Dados" component={DadosTabs} options={{ drawerIcon: ({color}) => <Ionicons name="dice" size={22} color={color}/> }} />
      <Drawer.Screen name="Memorama" component={MemoramaTabs} options={{ drawerIcon: ({color}) => <Ionicons name="albums" size={22} color={color}/> }} />
      <Drawer.Screen name="Gato (Tic Tac Toe)" component={TicTacToeTabs} options={{ drawerIcon: ({color}) => <Ionicons name="game-controller" size={22} color={color}/> }} />
      <Drawer.Screen name="Divisas" component={DivisasTabs} options={{ drawerIcon: ({color}) => <Ionicons name="cash" size={22} color={color}/> }} />
    </Drawer.Navigator>
  );
}

// --- SPLASHSCREEN ANIMADO ---
function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true })
    ]).start(() => {
      setTimeout(() => navigation.replace('MainApp'), 1000);
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Ionicons name="rocket" size={80} color="white" style={{marginBottom: 20}} />
      <Animated.Text style={[styles.splashText, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        VidaFdo
      </Animated.Text>
    </View>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' },
  splashText: { fontSize: 48, fontWeight: 'bold', color: 'white' },
  infoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' },
  infoText: { fontSize: 20, color: '#888', marginTop: 10, fontWeight: '600' }
});