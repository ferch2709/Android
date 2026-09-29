import React from 'react';
import {useState} from 'react';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import CustomModal from './componentes/CustomModal';
import FlatListBasics from './componentes/FlatListBasics';
import SectionListBasics from './componentes/SectionListBasics';


export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const objetoContenido = {
        valor: "Juan Perez"
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Button
                    title="Ver mensaje"
                    onPress={() => setModalVisible(true)}
                />
                <CustomModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    contenido={objetoContenido}
                />
            </View>
        
        <FlatListBasics />
        <SectionListBasics />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30b300',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});