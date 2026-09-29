import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function VolcanScreen() {
  const [erupcionando, setErupcionando] = useState(false);
  const [fuerzaAgite, setFuerzaAgite] = useState(0);

  // Animaciones
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fuenteAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const aceleracion = Math.sqrt(x * x + y * y + z * z);
      setFuerzaAgite(aceleracion.toFixed(1));

      if (aceleracion > 3.0 && !erupcionando) {
        dispararFuente();
      }
    });

    return () => subscription.remove();
  }, [erupcionando]);

  const dispararFuente = () => {
    setErupcionando(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    // Temblor de pantalla intenso tipo sismo volcánico
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();

    // Animación cíclica de la fuente de lava
    fuenteAnim.setValue(0);
    Animated.timing(fuenteAnim, {
      toValue: 1,
      duration: 2200, // Duración de la fuente activa
      useNativeDriver: true,
    }).start(() => {
      setErupcionando(false);
    });
  };

  // Trayectorias en forma de "Arco de Fuente" para las partículas de lava
  // Lado Izquierdo (Sube, se abre a la izquierda y cae)
  const fuenteY1 = fuenteAnim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, -210, 20] });
  const fuenteX1 = fuenteAnim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, -60, -110] });

  // Lado Derecho (Sube, se abre a la derecha y cae)
  const fuenteY2 = fuenteAnim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, -210, 20] });
  const fuenteX2 = fuenteAnim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 60, 110] });

  // Centro Alto (Sube recto un poco más y se desvanece)
  const fuenteY3 = fuenteAnim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, -250, -40] });
  const fuenteX3 = fuenteAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });

  const fuenteOpacity = fuenteAnim.interpolate({
    inputRange: [0, 0.1, 0.85, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      
      <View style={styles.header}>
        <Text style={[styles.title, erupcionando && styles.textAlerta]}>Simulador de Volcán 🌋</Text>
        <Text style={styles.subtitle}>
          {erupcionando ? '⛲ ¡FUENTE DE LAVA ACTIVA! ⛲' : '¡Agita el teléfono para hacer brotar la fuente!'}
        </Text>
      </View>

      {/* Área del Volcán */}
      <View style={styles.volcanContainer}>
        
        {/* --- CHORROS DE LA FUENTE (Solo visibles al erupcionar) --- */}
        {erupcionando && (
          <>
            {/* Arco Izquierdo */}
            <Animated.View style={[styles.chorroLava, { opacity: fuenteOpacity, transform: [{ translateY: fuenteY1 }, { translateX: fuenteX1 }] }]} />
            <Animated.View style={[styles.chorroLavaPequeno, { opacity: fuenteOpacity, transform: [{ translateY: fuenteY1 }, { translateX: fuenteX1 }] }]} />

            {/* Arco Derecho */}
            <Animated.View style={[styles.chorroLava, { opacity: fuenteOpacity, transform: [{ translateY: fuenteY2 }, { translateX: fuenteX2 }] }]} />
            <Animated.View style={[styles.chorroLavaPequeno, { opacity: fuenteOpacity, transform: [{ translateY: fuenteY2 }, { translateX: fuenteX2 }] }]} />

            {/* Chorro Central Alto */}
            <Animated.View style={[styles.chorroLavaCentro, { opacity: fuenteOpacity, transform: [{ translateY: fuenteY3 }, { translateX: fuenteX3 }] }]} />
            
            {/* Ríos de lava permanentes en la falda mientras dura la fuente */}
            <View style={styles.rioIzquierda} />
            <View style={styles.rioDerecha} />
          </>
        )}

        {/* Estructura de la Montaña con Grietas Permanentes */}
        <View style={styles.mountain}>
          <View style={styles.crater} />

          {/* Grietas / Venas de lava estáticas */}
          <View style={[styles.grieta, styles.g1]} />
          <View style={[styles.grieta, styles.g2]} />
          <View style={[styles.grieta, styles.g3]} />
          <View style={[styles.grieta, styles.g4]} />
        </View>

      </View>

      <TouchableOpacity style={styles.btnForzar} onPress={dispararFuente} activeOpacity={0.8}>
        <Text style={styles.btnText}>⛲ Activar Fuente de Lava</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0a', padding: 20, paddingTop: 40 },
  header: { alignItems: 'center', marginTop: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 5 },
  textAlerta: { color: '#FF3B30' },
  subtitle: { fontSize: 13, color: '#8E8E93', textAlign: 'center', paddingHorizontal: 20 },

  volcanContainer: { width: width, height: 350, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' },
  
  // La Montaña
    mountain: {
    width: 260,                   // Ancho total de la base del volcán
    height: 300,                  // Altura total del volcán
    backgroundColor: '#e67b9b',   // Color de la piedra del volcán
    borderTopLeftRadius: 130,     // La mitad del ancho para formar la cúpula perfecta arriba
    borderTopRightRadius: 130,    // La mitad del ancho arriba
    alignItems: 'center', 
    position: 'relative', 
    zIndex: 3,
    shadowColor: '#f0a4e1', shadowOpacity: 0.3, shadowRadius: 10
  },
   crater: {
    width: 70, height: 16, backgroundColor: '#ff4dbb', borderRadius: 8,
    position: 'absolute', top: 10, zIndex: 4, // Ahora va dentro con 'top: 10'
    shadowColor: '#f46ce1', shadowOpacity: 1, shadowRadius: 8
  },

  // Grietas / Venas de lava estáticas
 grieta: { position: 'absolute', backgroundColor: '#994670', zIndex: 4 },
  g1: { width: 5, height: 100, top: 40, left: 50, transform: [{ rotate: '25deg' }], borderRadius: 3 },
  g2: { width: 5, height: 110, top: 40, right: 50, transform: [{ rotate: '-25deg' }], borderRadius: 3 },
  g3: { width: 4, height: 80, top: 70, left: 30, transform: [{ rotate: '45deg' }], borderRadius: 2 },
  g4: { width: 5, height: 80, top: 70, right: 30, transform: [{ rotate: '-45deg' }], borderRadius: 3 },

  // --- PARTÍCULAS DE LA FUENTE DE LAVA ---
  chorroLava: {
    position: 'absolute', bottom: 215, width: 30, height: 30,
    backgroundColor: '#f9f9f9', borderRadius: 15, zIndex: 2,
    shadowColor: '#edebe8', shadowOpacity: 1, shadowRadius: 10, elevation: 6
  },
  chorroLavaPequeno: {
    position: 'absolute', bottom: 215, width: 18, height: 18,
    backgroundColor: '#fafaf8', borderRadius: 9, zIndex: 2,
    shadowColor: '#f7f4f4', shadowOpacity: 1, shadowRadius: 8
  },
  chorroLavaCentro: {
    position: 'absolute', bottom: 215, width: 25, height: 45,
    backgroundColor: '#e0ded6', borderTopLeftRadius: 12, borderTopRightRadius: 12, zIndex: 2,
    shadowColor: '#f3eded', shadowOpacity: 1, shadowRadius: 12, elevation: 6
  },

  // Ríos de lava que escurren por la falda de la montaña mientras actúa la fuente
  rioIzquierda: {
    position: 'absolute', bottom: 20, left: '39%', width: 16, height: 130,
    backgroundColor: '#f8f3f2', borderTopLeftRadius: 8, borderBottomRightRadius: 8,
    transform: [{ rotate: '25deg' }], zIndex: 4, opacity: 0.9
  },
  rioDerecha: {
    position: 'absolute', bottom: 20, right: '39%', width: 16, height: 130,
    backgroundColor: '#f9f4f4', borderTopRightRadius: 8, borderBottomLeftRadius: 8,
    transform: [{ rotate: '-25deg' }], zIndex: 4, opacity: 0.9
  },

  btnForzar: {
    backgroundColor: '#FF3B30', paddingVertical: 16, paddingHorizontal: 35, borderRadius: 20,
    marginBottom: 30, shadowColor: '#FF3B30', shadowOpacity: 0.5, shadowRadius: 10, elevation: 6
  },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});