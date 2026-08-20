import { StyleSheet, View, ImageBackground, Dimensions, Image, Text } from 'react-native';

const DemoImagen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.fondo}
                source={require("../assets/fondo.jpg")}
            >
            <View style={styles.container}>
                <Text style={styles.texto}>Gatos</Text>
                <Image
                style={styles.foto}
                source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sDLjQJRy-_0YoCv7TP3qZ2VDv76S23wywnfjJ7h5zPnzGM4-nBzIo6yE&s=10"}}
                />
                
            </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondo:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  foto:{
    width:200,
    height:200,
    borderRadius:16,
    borderWidth:10,
    borderColor:'#d75050',
    shadowColor:'#000000',
    shadowOffset:{width:0, height:10},
    shadowRadius:10,
    elevation:8,
    shadowOpacity:0.5,
  },
  texto:{
    width:Dimensions.get('window').width,
    textAlign:'center',
    color:'#ffffff',
    fontSize:100,
    backgroundColor:'rgb(0,0,0,0.5)',
  },
});

export default DemoImagen;