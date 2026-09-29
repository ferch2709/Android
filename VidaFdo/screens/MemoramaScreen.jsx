import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

const EMOJIS = ['🤡', '💩', '👻', '👽', '🤖', '💀'];

// Frases chistosas que cambian según los errores
const FRASES_BURONAS = [
  "¿Memoria de pez o qué? 🐠",
  "Casi... bueno, la verdad no.",
  "¿Seguro que pasaste kínder?",
  "Tómate un Famosa, amigo.",
  "Ey, por ahí no era 🤡",
  "Tranquilo, Einstein tampoco atinaba al principio.",
  "Mis ahorros... digo, tus neuronas.",
  "PuraANTIAgilidad mental."
];

export default function MemoramaScreen() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [mensajeChistoso, setMensajeChistoso] = useState("¡Encuentra las parejas!");
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Inicializar o reiniciar juego
  const reiniciarJuego = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
    setCards(deck);
    setSelected([]);
    setIntentos(0);
    setMensajeChistoso("¡A darle, sin llorar!");
    setJuegoTerminado(false);
    Haptics.selectionAsync();
  };

  useEffect(() => {
    reiniciarJuego();
  }, []);

  const handleFlip = (index) => {
    if (cards[index].flipped || cards[index].matched || selected.length === 2 || juegoTerminado) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setIntentos(intentos + 1);
      setTimeout(() => checkMatch(newSelected, newCards), 800);
    }
  };

  const checkMatch = (sel, currentCards) => {
    const [idx1, idx2] = sel;
    if (currentCards[idx1].emoji === currentCards[idx2].emoji) {
      currentCards[idx1].matched = true;
      currentCards[idx2].matched = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setMensajeChistoso("¡Le atinaste! Milagro 🙏");

      // Ver si ya ganó
      if (currentCards.every(c => c.matched)) {
        setJuegoTerminado(true);
        setMensajeChistoso("¡Ganaste! Ya puedes presumir en tu cuadra 🏆");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } else {
      currentCards[idx1].flipped = false;
      currentCards[idx2].flipped = false;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      
      // Sacar una frase chistosa al azar
      const fraseAleatoria = FRASES_BURONAS[Math.floor(Math.random() * FRASES_BURONAS.length)];
      setMensajeChistoso(fraseAleatoria);
    }
    setCards([...currentCards]);
    setSelected([]);
  };

  return (
    <View style={styles.container}>
      {/* Banner de Comedia / Insultos amigables */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>{mensajeChistoso}</Text>
        <Text style={styles.intentosText}>Errores / Intentos fallidos: {intentos}</Text>
      </View>

      {/* Cuadrícula del Memorama */}
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={card.id} 
            style={[styles.card, (card.flipped || card.matched) ? styles.cardFlipped : styles.cardClosed]} 
            onPress={() => handleFlip(index)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardText}>
              {card.flipped || card.matched ? card.emoji : '❓'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de Reinicio */}
      <TouchableOpacity style={styles.resetBtn} onPress={reiniciarJuego}>
        <Text style={styles.resetText}>Reiniciar / Me rindo 🏳️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7', padding: 20 },
  banner: {
    backgroundColor: '#1C1C1E', width: '100%', padding: 15, borderRadius: 16,
    alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, elevation: 5
  },
  bannerText: { color: '#FFD60A', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  intentosText: { color: '#8E8E93', fontSize: 13 },

  grid: { 
    flexDirection: 'row', flexWrap: 'wrap', width: 320, 
    justifyContent: 'space-between', backgroundColor: '#FFF', 
    padding: 15, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 
  },
  card: { 
    width: 70, height: 70, justifyContent: 'center', alignItems: 'center', 
    marginVertical: 6, borderRadius: 12 
  },
  cardClosed: { backgroundColor: '#2C2C2E' },
  cardFlipped: { backgroundColor: '#E5E5EA' },
  cardText: { fontSize: 32 },

  resetBtn: { marginTop: 25, backgroundColor: '#FF2D55', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 14 },
  resetText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});