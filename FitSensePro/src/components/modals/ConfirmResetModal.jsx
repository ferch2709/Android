import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function ConfirmResetModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Ionicons name="warning-outline" size={46} color={COLORS.danger} style={{ alignSelf: 'center', marginBottom: 10 }} />
          <Text style={styles.title}>¿Restablecer valores?</Text>
          <Text style={styles.desc}>Todos los datos calculados e ingresados se limpiarán de la pantalla.</Text>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.confirmBtn]} onPress={onConfirm}>
              <Text style={styles.confirmText}>Sí, limpiar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 25 },
  content: { backgroundColor: COLORS.cardBg, borderRadius: 16, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 6 },
  desc: { color: COLORS.textMuted, fontSize: 13, textAlign: 'center', marginBottom: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  btn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#334155' },
  confirmBtn: { backgroundColor: COLORS.danger },
  cancelText: { color: COLORS.text, fontWeight: 'bold' },
  confirmText: { color: '#fff', fontWeight: 'bold' },
});