import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import NutritionHelpModal from '../components/modals/NutritionHelpModal';

export default function NutritionScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); 
  const [goal, setGoal] = useState('maintain'); 
  const [macros, setMacros] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [helpVisible, setHelpVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const calculateNutrition = () => {
    setErrorMsg('');
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!weight || !height || !age) {
      setErrorMsg('Completa todos los campos para calcular.');
      return;
    }
    if (w < 20 || w > 300 || h < 60 || h > 250 || a < 10 || a > 100) {
      setErrorMsg('Por favor revisa que las medidas y edad sean válidas.');
      return;
    }

  
    let tmb = 0;
    if (gender === 'male') {
      tmb = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      tmb = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    
    let totalCalories = tmb * 1.375;
    if (goal === 'lose') totalCalories -= 400;
    if (goal === 'gain') totalCalories += 350;

   
    const proteinG = Math.round(w * 2);
    const fatG = Math.round(w * 0.9);
    const carbsG = Math.max(0, Math.round((totalCalories - (proteinG * 4 + fatG * 9)) / 4));

    setMacros({
      calories: Math.round(totalCalories),
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
    });

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Text style={styles.subtitle}>Gasto Calórico y Macronutrientes Diarios</Text>
        <TouchableOpacity onPress={() => setHelpVisible(true)}>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[styles.genderBtn, gender === 'male' && styles.genderBtnActive]}
            onPress={() => setGender('male')}
          >
            <Ionicons name="male" size={18} color={gender === 'male' ? '#0F172A' : COLORS.textMuted} />
            <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>Hombre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderBtn, gender === 'female' && styles.genderBtnActive]}
            onPress={() => setGender('female')}
          >
            <Ionicons name="female" size={18} color={gender === 'female' ? '#0F172A' : COLORS.textMuted} />
            <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>Mujer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowInputs}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="70" placeholderTextColor={COLORS.textMuted} value={weight} onChangeText={setWeight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="170" placeholderTextColor={COLORS.textMuted} value={height} onChangeText={setHeight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Edad</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="25" placeholderTextColor={COLORS.textMuted} value={age} onChangeText={setAge} />
          </View>
        </View>

        <Text style={styles.label}>Objetivo:</Text>
        <View style={styles.goalRow}>
          {['lose', 'maintain', 'gain'].map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.goalBtn, goal === g && styles.goalBtnActive]}
              onPress={() => setGoal(g)}
            >
              <Text style={[styles.goalText, goal === g && styles.goalTextActive]}>
                {g === 'lose' ? 'Perder Grasa' : g === 'maintain' ? 'Mantener' : 'Aumentar Músculo'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {errorMsg !== '' && <Text style={styles.errorText}>⚠️ {errorMsg}</Text>}

        <TouchableOpacity style={styles.button} onPress={calculateNutrition}>
          <Text style={styles.btnText}>Calcular Metas</Text>
        </TouchableOpacity>
      </View>

      {macros && (
        <Animated.View style={[styles.resCard, { opacity: fadeAnim }]}>
          <Text style={styles.calLabel}>Calorías Objetivo Recomendadas</Text>
          <Text style={styles.calValue}>{macros.calories} <Text style={{ fontSize: 18 }}>kcal/día</Text></Text>

          <View style={styles.macroRow}>
            <View style={styles.macroBox}>
              <Text style={styles.macroTitle}>Proteínas</Text>
              <Text style={[styles.macroGrams, { color: '#38BDF8' }]}>{macros.protein}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroTitle}>Carbohidratos</Text>
              <Text style={[styles.macroGrams, { color: COLORS.accent }]}>{macros.carbs}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroTitle}>Grasas</Text>
              <Text style={[styles.macroGrams, { color: COLORS.primary }]}>{macros.fat}g</Text>
            </View>
          </View>
        </Animated.View>
      )}

      <NutritionHelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  subtitle: { color: COLORS.textMuted, fontSize: 13 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 18, marginBottom: 20 },
  genderRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  genderBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 8, backgroundColor: '#0F172A', borderWidth: 1, borderColor: '#334155' },
  genderBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  genderText: { color: COLORS.textMuted, marginLeft: 6, fontWeight: 'bold' },
  genderTextActive: { color: '#0F172A' },
  rowInputs: { flexDirection: 'row', gap: 10 },
  label: { color: COLORS.text, fontWeight: '600', marginBottom: 6, fontSize: 13 },
  input: { backgroundColor: '#0F172A', color: COLORS.text, borderRadius: 8, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: '#334155', textAlign: 'center' },
  goalRow: { flexDirection: 'row', gap: 6, marginBottom: 15 },
  goalBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#0F172A', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  goalBtnActive: { borderColor: COLORS.primary, backgroundColor: '#064E3B' },
  goalText: { color: COLORS.textMuted, fontSize: 11, fontWeight: 'bold' },
  goalTextActive: { color: COLORS.primary },
  errorText: { color: COLORS.danger, fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
  resCard: { backgroundColor: COLORS.cardBg, borderRadius: 14, padding: 18, alignItems: 'center' },
  calLabel: { color: COLORS.textMuted, fontSize: 13 },
  calValue: { color: COLORS.primary, fontSize: 36, fontWeight: 'bold', marginVertical: 6 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 },
  macroBox: { flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#0F172A', borderRadius: 10, marginHorizontal: 4 },
  macroTitle: { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
  macroGrams: { fontSize: 20, fontWeight: 'bold' },
});