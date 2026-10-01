import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import SensorConfigModal from '../components/modals/SensorConfigModal';

export default function SensorScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [reps, setReps] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [threshold, setThreshold] = useState(12.5); 
  const [configVisible, setConfigVisible] = useState(false);

  const lastPeak = useRef(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let subscription = null;

    if (isActive) {
      Accelerometer.setUpdateInterval(100); 
      subscription = Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);

      
        const magnitude = Math.sqrt(
          accelerometerData.x ** 2 + accelerometerData.y ** 2 + accelerometerData.z ** 2
        ) * 9.8;

        
        if (magnitude > threshold && !lastPeak.current) {
          lastPeak.current = true;
          setReps((prev) => prev + 1);

         
          Vibration.vibrate([0, 60, 40, 60]);

         
          Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.2, duration: 90, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 110, useNativeDriver: true }),
          ]).start();
        } else if (magnitude < threshold - 2.5) {
      
          lastPeak.current = false;
        }
      });
    } else {
      if (subscription) subscription.remove();
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isActive, threshold]);


  const caloriesBurned = (reps * 0.35).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrenador por Acelerómetro</Text>
        <TouchableOpacity onPress={() => setConfigVisible(true)}>
          <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Sostén tu móvil al hacer sentadillas o saltos</Text>

     
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.counterCircle, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.repCount}>{reps}</Text>
          <Text style={styles.repLabel}>REPETICIONES</Text>
        </Animated.View>
      </View>

     
      <View style={styles.statsCard}>
        <View style={styles.statCol}>
          <Ionicons name="flame" size={22} color={COLORS.accent} />
          <Text style={styles.statVal}>{caloriesBurned} kcal</Text>
          <Text style={styles.statLbl}>Quemadas</Text>
        </View>
        <View style={styles.statCol}>
          <Ionicons name="speedometer" size={22} color="#38BDF8" />
          <Text style={styles.statVal}>{threshold.toFixed(1)}</Text>
          <Text style={styles.statLbl}>Umbral</Text>
        </View>
      </View>

     
      <View style={styles.sensorRaw}>
        <Text style={styles.rawText}>
          X: {data.x.toFixed(2)} | Y: {data.y.toFixed(2)} | Z: {data.z.toFixed(2)}
        </Text>
      </View>

    
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.mainBtn, isActive ? styles.btnStop : styles.btnStart]}
          onPress={() => setIsActive(!isActive)}
        >
          <Ionicons name={isActive ? 'pause' : 'play'} size={22} color="#0F172A" />
          <Text style={styles.mainBtnText}>{isActive ? 'Pausar Sensor' : 'Iniciar Detección'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.resetBtn} 
          onPress={() => {
            setReps(0);
            Vibration.vibrate(80); 
          }}
        >
          <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      
      <SensorConfigModal
        visible={configVisible}
        sensitivity={threshold}
        onSelect={(val) => {
          setThreshold(val);
          setConfigVisible(false);
        }}
        onClose={() => setConfigVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
  subtitle: { 
    color: COLORS.textMuted, 
    fontSize: 13, 
    marginTop: 4, 
    marginBottom: 20 
  },
  circleContainer: { 
    alignItems: 'center', 
    marginVertical: 15 
  },
  counterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.cardBg,
    borderWidth: 4,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repCount: { 
    fontSize: 64, 
    fontWeight: 'bold', 
    color: COLORS.primary 
  },
  repLabel: { 
    fontSize: 12, 
    color: COLORS.textMuted, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  statsCard: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.cardBg, 
    borderRadius: 12, 
    padding: 15, 
    marginVertical: 15 
  },
  statCol: { 
    flex: 1, 
    alignItems: 'center' 
  },
  statVal: { 
    color: COLORS.text, 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginTop: 4 
  },
  statLbl: { 
    color: COLORS.textMuted, 
    fontSize: 12 
  },
  sensorRaw: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  rawText: { 
    color: '#64748B', 
    fontSize: 12, 
    fontFamily: 'monospace' 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 10 
  },
  mainBtn: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 12 
  },
  btnStart: { 
    backgroundColor: COLORS.primary 
  },
  btnStop: { 
    backgroundColor: COLORS.accent 
  },
  mainBtnText: { 
    color: '#0F172A', 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginLeft: 8 
  },
  resetBtn: { 
    backgroundColor: COLORS.cardBg, 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#334155', 
    justifyContent: 'center' 
  },
});