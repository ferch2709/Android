import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function WaterScreen() {
  const [weight, setWeight] = useState('');
  const [targetMl, setTargetMl] = useState(2500);
  const [consumedMl, setConsumedMl] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const progressAnim = useRef(new Animated.Value(0)).current;

  const calculateTarget = () => {
    setErrorMsg('');
    const w = parseFloat(weight);
    if (!weight || isNaN(w) || w < 20 || w > 300) {
      setErrorMsg('Ingresa un peso válido (20 a 300 kg).');
      return;
    }

   
    const newTarget = Math.round(w * 35);
    setTargetMl(newTarget);
    updateProgress(consumedMl, newTarget);
  };

  const addWater = (amount) => {
    const nextVal = consumedMl + amount;
    setConsumedMl(nextVal);
    updateProgress(nextVal, targetMl);
  };

  const resetWater = () => {
    setConsumedMl(0);
    updateProgress(0, targetMl);
  };

  const updateProgress = (current, total) => {
    const percentage = Math.min(current / total, 1);
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Meta diaria de agua recomendada según tu peso</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tu Peso (kg):</Text>
        <View style={styles.calcRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 70"
            placeholderTextColor={COLORS.textMuted}
            value={weight}
            onChangeText={setWeight}
          />
          <TouchableOpacity style={styles.btnSmall} onPress={calculateTarget}>
            <Text style={styles.btnSmallText}>Calcular Meta</Text>
          </TouchableOpacity>
        </View>
        {errorMsg !== '' && <Text style={styles.errorText}>⚠️ {errorMsg}</Text>}
      </View>

      <View style={styles.progressCard}>
        <Ionicons name="water" size={48} color="#38BDF8" style={{ alignSelf: 'center' }} />
        <Text style={styles.consumedText}>{consumedMl} <Text style={{ fontSize: 18 }}>/ {targetMl} ml</Text></Text>
        
        
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.glassCount}>Equivalente a {(consumedMl / 250).toFixed(1)} vasos de 250 ml</Text>
      </View>

      <View style={styles.quickAddRow}>
        <TouchableOpacity style={styles.addBtn} onPress={() => addWater(250)}>
          <Ionicons name="add" size={20} color={COLORS.primary} />
          <Text style={styles.addBtnText}>+250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={() => addWater(500)}>
          <Ionicons name="add" size={20} color={COLORS.primary} />
          <Text style={styles.addBtnText}>+500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={resetWater}>
          <Ionicons name="refresh" size={20} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  subtitle: { color: COLORS.textMuted, fontSize: 13, marginBottom: 15 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 16, marginBottom: 18 },
  label: { color: COLORS.text, fontWeight: '600', marginBottom: 8 },
  calcRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#0F172A', color: COLORS.text, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: '#334155' },
  btnSmall: { backgroundColor: COLORS.primary, borderRadius: 8, paddingHorizontal: 14, justifyContent: 'center' },
  btnSmallText: { color: '#0F172A', fontWeight: 'bold' },
  errorText: { color: COLORS.danger, fontSize: 12, marginTop: 8 },
  progressCard: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 20, alignItems: 'center' },
  consumedText: { color: COLORS.text, fontSize: 32, fontWeight: 'bold', marginVertical: 10 },
  progressBarBg: { width: '100%', height: 16, backgroundColor: '#0F172A', borderRadius: 8, overflow: 'hidden', marginVertical: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#38BDF8', borderRadius: 8 },
  glassCount: { color: COLORS.textMuted, fontSize: 13, marginTop: 6 },
  quickAddRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.cardBg, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
  addBtnText: { color: COLORS.text, fontWeight: 'bold', marginLeft: 4 },
  resetBtn: { backgroundColor: COLORS.cardBg, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#334155', justifyContent: 'center', alignItems: 'center' },
});