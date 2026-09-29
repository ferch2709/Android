import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputText = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    width: 250,
    backgroundColor: '#fff',
  },
});

export default InputText;