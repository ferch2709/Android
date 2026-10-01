import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function SensorConfigModal({ visible, sensitivity, onSelect, onClose }) {
  const options = [
    { label: 'Baja (Menos sensible, ideal para saltos)', value: 14.5 },
    { label: 'Media (Estándar para sentadillas)', value: 12.5 },
    { label: 'Alta (Muy sensible para pasos ligeros)', value: 10.8 },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Sensibilidad del Sensor</Text>
          <Text style={styles.desc}>Ajusta la tolerancia de detección de movimiento del acelerómetro:</Text>

          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.option, sensitivity === opt.value && styles.activeOption]}
              onPress={() => onSelect(opt.value)}
            >
              <Text style={[styles.optText, sensitivity === opt.value && styles.activeText]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.btnText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  content: { backgroundColor: COLORS.cardBg, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 22 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 6 },
  desc: { color: COLORS.textMuted, fontSize: 13, marginBottom: 15 },
  option: { padding: 14, backgroundColor: '#0F172A', borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  activeOption: { borderColor: COLORS.primary, backgroundColor: '#064E3B' },
  optText: { color: COLORS.textMuted, fontSize: 14 },
  activeText: { color: COLORS.primary, fontWeight: 'bold' },
  closeBtn: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#0F172A', fontWeight: 'bold' },
});