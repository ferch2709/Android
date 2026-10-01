import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import BMIInfoModal from '../components/modals/BMIInfoModal';
import ConfirmResetModal from '../components/modals/ConfirmResetModal';

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [modalInfo, setModalInfo] = useState(false);
  const [modalReset, setModalReset] = useState(false);

  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleCalculate = () => {
    setErrorMsg('');
    const w = parseFloat(weight);
    const h = parseFloat(height);

    // Validaciones estrictas anti-crash
    if (!weight || !height) {
      setErrorMsg('Por favor completa ambos campos.');
      return;
    }
    if (isNaN(w) || isNaN(h)) {
      setErrorMsg('Ingresa valores numéricos válidos.');
      return;
    }
    if (h < 50 || h > 250) {
      setErrorMsg('La altura debe estar entre 50 y 250 cm.');
      return;
    }
    if (w < 20 || w > 350) {
      setErrorMsg('El peso debe estar entre 20 y 350 kg.');
      return;
    }

  
    const heightM = h / 100;
    const imc = w / (heightM * heightM);

  
    const idealMin = 18.5 * (heightM * heightM);
    const idealMax = 24.9 * (heightM * heightM);

    let category = '';
    let color = COLORS.primary;
    if (imc < 18.5) {
      category = 'Bajo peso';
      color = '#38BDF8';
    } else if (imc < 25) {
      category = 'Peso Normal';
      color = COLORS.primary;
    } else if (imc < 30) {
      category = 'Sobrepeso';
      color = COLORS.accent;
    } else {
      category = 'Obesidad';
      color = COLORS.danger;
    }

    setResult({
      imc: imc.toFixed(1),
      category,
      color,
      idealRange: `${idealMin.toFixed(1)} - ${idealMax.toFixed(1)} kg`,
    });

  
    slideAnim.setValue(30);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
    setErrorMsg('');
    setModalReset(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Text style={styles.subtitle}>Calcula tu masa corporal y peso ideal</Text>
        <TouchableOpacity onPress={() => setModalInfo(true)}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Peso Corporal (kg)</Text>
        <TextInput
          style={[styles.input, errorMsg && !weight ? styles.inputError : null]}
          keyboardType="numeric"
          placeholder="Ej: 75.5"
          placeholderTextColor={COLORS.textMuted}
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Estatura (cm)</Text>
        <TextInput
          style={[styles.input, errorMsg && !height ? styles.inputError : null]}
          keyboardType="numeric"
          placeholder="Ej: 175"
          placeholderTextColor={COLORS.textMuted}
          value={height}
          onChangeText={setHeight}
        />

        {errorMsg !== '' && <Text style={styles.errorText}>⚠️ {errorMsg}</Text>}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
            <Text style={styles.btnText}>Calcular IMC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={() => setModalReset(true)}>
            <Ionicons name="refresh" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      {result && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.resLabel}>Tu Índice de Masa Corporal</Text>
          <Text style={[styles.resValue, { color: result.color }]}>{result.imc}</Text>
          <View style={[styles.badge, { backgroundColor: result.color }]}>
            <Text style={styles.badgeText}>{result.category}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.idealLabel}>Rango de peso saludable sugerido:</Text>
          <Text style={styles.idealValue}>{result.idealRange}</Text>
        </Animated.View>
      )}

      <BMIInfoModal visible={modalInfo} onClose={() => setModalInfo(false)} />
      <ConfirmResetModal visible={modalReset} onConfirm={handleReset} onCancel={() => setModalReset(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  subtitle: { color: COLORS.textMuted, fontSize: 13 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 18, marginBottom: 20 },
  label: { color: COLORS.text, fontWeight: '600', marginBottom: 6, fontSize: 14 },
  input: { backgroundColor: '#0F172A', color: COLORS.text, borderRadius: 8, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  inputError: { borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: 12, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 5 },
  calcBtn: { flex: 1, backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center' },
  resetBtn: { backgroundColor: '#334155', padding: 14, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  resLabel: { color: COLORS.textMuted, fontSize: 14 },
  resValue: { fontSize: 44, fontWeight: 'bold', marginVertical: 6 },
  badge: { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#0F172A', fontWeight: 'bold', fontSize: 13 },
  divider: { width: '100%', height: 1, backgroundColor: '#334155', marginVertical: 15 },
  idealLabel: { color: COLORS.textMuted, fontSize: 12 },
  idealValue: { color: COLORS.text, fontSize: 16, fontWeight: 'bold', marginTop: 4 },
});