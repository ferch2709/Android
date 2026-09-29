import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

export default function DadosScreen() {
  const [dado, setDado] = useState(1);

  const lanzarDado = () => {
    // Hace que el celular vibre de forma "pesada"
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const random = Math.floor(Math.random() * 6) + 1;
    setDado(random);
  };

  useEffect(() => {
    // Configurar acelerómetro para "Agitar" (Shake)
    Accelerometer.setUpdateInterval(400);
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      // Si el movimiento es fuerte, lanza el dado
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 2.5) {
        lanzarDado();
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.instruccion}>Agita el celular o presiona</Text>
      <View style={styles.dadoContainer}>
        <Text style={styles.dado}>{dado}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={lanzarDado}>
        <Text style={styles.btnText}>Lanzar Dado 🎲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' },
  instruccion: { fontSize: 16, color: '#888', marginBottom: 20 },
  dadoContainer: {
    width: 150, height: 150, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 20, marginBottom: 40,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15, elevation: 10,
  },
  dado: { fontSize: 80, fontWeight: 'bold', color: '#FF2D55' },
  btn: { backgroundColor: '#FF2D55', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, shadowColor: '#FF2D55', shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
  btnText: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});