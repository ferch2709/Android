import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  Cat  from "./componentes/Cat";
import Mensaje from "./componentes/Mensaje";

export default function App() {
  //codigo 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.texto_rojo}>Me gusta el flan napolitano</Text>
      <Cat></Cat>
      <Mensaje msg="Mi mensaje como propiedad"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto_rojo: {
    color: "red",
  },
});
