import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function NutritionHelpModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Ionicons name="information-circle" size={40} color={COLORS.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
          <Text style={styles.title}>¿Cómo se calcula?</Text>
          <Text style={styles.text}>
            1. <Text style={styles.bold}>TMB (Fórmula Harris-Benedict):</Text> Mide la energía mínima que gasta tu cuerpo en reposo.
          </Text>
          <Text style={styles.text}>
            2. <Text style={styles.bold}>Factor de Actividad:</Text> Multiplica tu TMB por tus entrenamientos reales.
          </Text>
          <Text style={styles.text}>
            3. <Text style={styles.bold}>Objetivos:</Text>
            {'\n'}• Perder Grasa: Déficit de -400 kcal.
            {'\n'}• Ganar Músculo: Superávit de +300 kcal.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.btnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 25 },
  content: { backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 12 },
  text: { color: COLORS.textMuted, fontSize: 13, lineHeight: 20, marginBottom: 8 },
  bold: { color: COLORS.text, fontWeight: 'bold' },
  button: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#0F172A', fontWeight: 'bold' },
});