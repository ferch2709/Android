import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const BotonColor = ({ onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: isPressed ? '#007bff' : '#fff' }
      ]}
      onPress={handlePress}
    >
      <Text style={[
        styles.text,
        { color: isPressed ? '#fff' : '#007bff' }
      ]}>
        Calcular IMC
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    marginTop: 20,
  },
  text: { fontSize: 16, fontWeight: 'bold' },
});

export default BotonColor;