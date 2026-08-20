import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DemoImagen from './componentes/DemoImagen';

export default function App() {
  return (
    <View style={styles.container}>
      <DemoImagen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36022a',
  },
  panel1:{
    flex:1,
    backgroundColor:'#FF0000',
  },
  panel2:{
    flex:1,
    backgroundColor:'#ffffff',
  },
  panel3:{
    flex:1,
    backgroundColor:'#0000FF',
  },
});