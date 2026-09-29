import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  
  // Lista de accesos directos para las tarjetas
  const menuItems = [
    { title: 'Lanzar Dados', icon: 'dice', color: '#FF2D55', screen: 'Lanzar Dados', desc: '¡Prueba tu suerte!' },
    { title: 'Memorama', icon: 'albums', color: '#5856D6', screen: 'Memorama', desc: 'Ejercita tu mente' },
    { title: 'Tic Tac Toe', icon: 'game-controller', color: '#0A84FF', screen: 'Gato (Tic Tac Toe)', desc: 'Juega vs CPU o Local' },
    { title: 'Divisas', icon: 'cash', color: '#34C759', screen: 'Divisas', desc: 'Conversor universal' },
  ];

  const handlePressCard = (screenName) => {
    Haptics.selectionAsync();
    navigation.navigate(screenName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado de Bienvenida */}
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <Ionicons name="flash" size={14} color="#FFD60A" />
          <Text style={styles.badgeText}> Bienvenido a VidaFdo</Text>
        </View>
        <Text style={styles.title}>¿Qué quieres hacer hoy?</Text>
        <Text style={styles.subtitle}>Selecciona una herramienta o juego del panel inferior para comenzar.</Text>
      </View>

      {/* Grid de Tarjetas (Dashboard) */}
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handlePressCard(item.screen)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={32} color={item.color} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            
            <View style={styles.cardFooter}>
              <Text style={[styles.actionText, { color: item.color }]}>Abrir</Text>
              <Ionicons name="arrow-forward" size={16} color={item.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#F2F2F7', 
    padding: 20, 
    alignItems: 'center' 
  },
  headerCard: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: { color: '#FFD60A', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#8E8E93', lineHeight: 20 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: (width - 50) / 2, // Dos tarjetas por fila con espacio simétrico
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#8E8E93', marginBottom: 12 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 8,
  },
  actionText: { fontSize: 13, fontWeight: 'bold' },
});