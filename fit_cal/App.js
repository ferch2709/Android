import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import InputText from './componentes/InputText';
import BotonColor from './componentes/BotonColor';
import CustomModal from './componentes/CustomModal';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (p > 0 && a > 0) {
      const imc = (p / (a * a)).toFixed(2);
      setResultado(imc);
      setModalVisible(true);
    } else {
      alert("Por favor ingresa valores válidos");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Calculadora de IMC</Text>
      
      <InputText 
        placeholder="Peso (kg)" 
        value={peso} 
        onChangeText={setPeso} 
      />
      <InputText 
        placeholder="Altura (m)" 
        value={altura} 
        onChangeText={setAltura} 
      />

      <BotonColor onPress={calcularIMC} />

      <CustomModal 
        visible={modalVisible} 
        result={resultado} 
        text="Felicidades, tu IMC es:"
        onClose={() => setModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});