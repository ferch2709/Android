import { StyleSheet, Text, View, Modal, Button } from 'react-native'; // 1. Agregado Button aquí
import { useState } from 'react';
// 2. Se eliminó la línea de react-native-web que causaba el error de 'div'

export default function App2() {
  const [modal, setModal] = useState(true);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
      >
        <View style={styles.center}>
          <View style={styles.contenido}>
            <Text>esto es un modal</Text>
            <Button
              title="Close Modal"
              onPress={() => setModal(!modal)} // 3. Verificado que tenga el =>
            />
          </View>
        </View>
      </Modal>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Text>Texto fuera del modal</Text>
      <Button
        title="Mostrar Modal"
        onPress={() => setModal(!modal)}
      />
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
  center: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contenido: {
    flex: 1,
    backgroundColor: 'rgba(73, 156, 200, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 300,
    marginHorizontal: 20,
  },
});
