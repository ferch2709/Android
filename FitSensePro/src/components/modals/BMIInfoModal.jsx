import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function BMIInfoModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Clasificación OMS</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={26} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
          <Text style={styles.desc}>Rangos de Índice de Masa Corporal para adultos:</Text>
          
          <View style={[styles.row, { borderLeftColor: '#38BDF8' }]}>
            <Text style={styles.label}>Bajo peso</Text>
            <Text style={styles.value}>&lt; 18.5</Text>
          </View>
          <View style={[styles.row, { borderLeftColor: COLORS.primary }]}>
            <Text style={styles.label}>Peso Normal</Text>
            <Text style={styles.value}>18.5 – 24.9</Text>
          </View>
          <View style={[styles.row, { borderLeftColor: COLORS.accent }]}>
            <Text style={styles.label}>Sobrepeso</Text>
            <Text style={styles.value}>25.0 – 29.9</Text>
          </View>
          <View style={[styles.row, { borderLeftColor: COLORS.danger }]}>
            <Text style={styles.label}>Obesidad</Text>
            <Text style={styles.value}>&ge; 30.0</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.btnText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  content: { backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  desc: { color: COLORS.textMuted, fontSize: 13, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#0F172A', borderRadius: 8, marginBottom: 8, borderLeftWidth: 5 },
  label: { color: COLORS.text, fontWeight: '600' },
  value: { color: COLORS.textMuted },
  button: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  btnText: { color: '#0F172A', fontWeight: 'bold', fontSize: 16 },
});