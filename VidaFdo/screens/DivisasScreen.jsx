import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function DivisasScreen() {
  const [usd, setUsd] = useState('');
  const [monedaDestino, setMonedaDestino] = useState('MXN');

  // Tasas de cambio fijas locales
  const tasas = {
    MXN: 17.50,
    EUR: 0.92,
    JPY: 147.50
  };

  const calcular = () => {
    Haptics.selectionAsync(); // Vibración sutil al cambiar o calcular
    if (!usd) return 0;
    return (parseFloat(usd) * tasas[monedaDestino]).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Conversor Universal 💱</Text>
        <Text style={styles.subtitle}>Convierte Dólares (USD) a otras monedas</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ingresa USD ($)"
          placeholderTextColor="#777"
          value={usd}
          onChangeText={setUsd}
        />

        {/* Botones para seleccionar moneda */}
        <View style={styles.optionsContainer}>
          {['MXN', 'EUR', 'JPY'].map((moneda) => (
            <TouchableOpacity
              key={moneda}
              style={[styles.optionBtn, monedaDestino === moneda && styles.optionBtnActive]}
              onPress={() => {
                setMonedaDestino(moneda);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={[styles.optionText, monedaDestino === moneda && styles.optionTextActive]}>
                {moneda}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Total estimado:</Text>
          <Text style={styles.resultValue}>
            ${calcular()} {monedaDestino}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7', padding: 20 },
  card: {
    width: '100%', backgroundColor: '#1C1C1E', borderRadius: 24, padding: 25,
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 15, elevation: 10
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#8E8E93', marginBottom: 20 },
  input: {
    backgroundColor: '#2C2C2E', color: '#fff', fontSize: 22, padding: 15,
    borderRadius: 14, marginBottom: 20, textAlign: 'center'
  },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  optionBtn: { flex: 1, backgroundColor: '#2C2C2E', padding: 12, borderRadius: 10, marginHorizontal: 4, alignItems: 'center' },
  optionBtnActive: { backgroundColor: '#FF2D55' },
  optionText: { color: '#fff', fontWeight: 'bold' },
  optionTextActive: { color: '#fff' },
  resultContainer: { borderTopWidth: 1, borderTopColor: '#3A3A3C', paddingTop: 20, alignItems: 'center' },
  resultLabel: { color: '#8E8E93', fontSize: 16 },
  resultValue: { color: '#34C759', fontSize: 38, fontWeight: 'bold', marginTop: 5 }
});