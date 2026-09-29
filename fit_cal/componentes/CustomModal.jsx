import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const CustomModal = ({ visible, result, onClose, text }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Resultado del IMC</Text>
          <Text style={styles.resultText}>{text} {result}</Text>
          <Button title="Aceptar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  title: { fontSize: 18, marginBottom: 15 },
  resultText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default CustomModal;