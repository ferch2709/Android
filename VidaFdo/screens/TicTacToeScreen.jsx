import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function TicTacToeScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [modoCpu, setModoCpu] = useState(false); // false = Local (2 jugadores), true = vs CPU
  const [winner, setWinner] = useState(null);

  // Verificar ganador cada vez que cambia el tablero
  useEffect(() => {
    const ganadorActual = calcularGanador(board);
    if (ganadorActual) {
      setWinner(ganadorActual);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (board.every((cell) => cell !== null)) {
      setWinner('Empate');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else if (modoCpu && !isXNext && !ganadorActual) {
      // Turno de la CPU (O) después de un pequeño retraso natural
      const timer = setTimeout(() => {
        hacerMovimientoCpu();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext]);

  const hacerMovimientoCpu = () => {
    const casillasVacias = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (casillasVacias.length > 0) {
      // Movimiento aleatorio simple
      const randomIndex = casillasVacias[Math.floor(Math.random() * casillasVacias.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
      Haptics.selectionAsync();
    }
  };

  const handlePress = (index) => {
    if (board[index] || winner) return;
    // Si es modo CPU y es turno de la "O", el usuario no debe tocar
    if (modoCpu && !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const reiniciarJuego = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    Haptics.selectionAsync();
  };

  const cambiarModo = (esCpu) => {
    setModoCpu(esCpu);
    reiniciarJuego();
  };

  return (
    <View style={styles.container}>
      {/* Selector de Modo de Juego */}
      <View style={styles.modeContainer}>
        <TouchableOpacity 
          style={[styles.modeBtn, !modoCpu && styles.modeBtnActive]} 
          onPress={() => cambiarModo(false)}
        >
          <Text style={[styles.modeText, !modoCpu && styles.modeTextActive]}>2 Jugadores</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.modeBtn, modoCpu && styles.modeBtnActive]} 
          onPress={() => cambiarModo(true)}
        >
          <Text style={[styles.modeText, modoCpu && styles.modeTextActive]}>Vs CPU 🤖</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de Turno o Ganador */}
      <View style={styles.statusContainer}>
        {winner ? (
          <Text style={styles.winnerText}>
            {winner === 'Empate' ? '¡Empate 🤝!' : `¡Ganó ${winner} 🎉!`}
          </Text>
        ) : (
          <Text style={styles.turnText}>
            Turno de: <Text style={{ color: isXNext ? '#FF2D55' : '#0A84FF' }}>{isXNext ? 'X' : 'O'}</Text>
          </Text>
        )}
      </View>

      {/* Tablero Estilizado */}
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.cell} 
            onPress={() => handlePress(index)}
          >
            <Text style={[styles.cellText, cell === 'X' ? styles.textX : styles.textO]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de Reinicio */}
      <TouchableOpacity style={styles.resetBtn} onPress={reiniciarJuego}>
        <Text style={styles.resetText}>Reiniciar Partida</Text>
      </TouchableOpacity>
    </View>
  );
}

// Función auxiliar para calcular si hay un ganador
function calcularGanador(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7', padding: 20 },
  modeContainer: { flexDirection: 'row', backgroundColor: '#E5E5EA', borderRadius: 12, padding: 4, marginBottom: 20 },
  modeBtn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10 },
  modeBtnActive: { backgroundColor: '#1C1C1E', shadowColor: '#000', shadowOpacity: '0.1', shadowRadius: 4, elevation: 2 },
  modeText: { fontWeight: '600', color: '#8E8E93' },
  modeTextActive: { color: '#FFF' },
  
  statusContainer: { marginBottom: 20, height: 30, justifyContent: 'center' },
  turnText: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
  winnerText: { fontSize: 22, fontWeight: 'bold', color: '#34C759' },

  board: { 
    width: 320, height: 320, backgroundColor: '#1C1C1E', 
    flexDirection: 'row', flexWrap: 'wrap', borderRadius: 20, padding: 10,
    justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15, elevation: 10
  },
  cell: { 
    width: '31%', height: '31%', backgroundColor: '#2C2C2E', 
    borderRadius: 12, justifyContent: 'center', alignItems: 'center' 
  },
  cellText: { fontSize: 45, fontWeight: 'bold' },
  textX: { color: '#FF2D55' },
  textO: { color: '#0A84FF' },

  resetBtn: { marginTop: 30, backgroundColor: '#1C1C1E', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 14 },
  resetText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});