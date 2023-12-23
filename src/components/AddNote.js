// AddNote.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddNote = ({ onSaveNote }) => {
  const [inputText, setInputText] = useState('');

  const handleSaveNote = () => {
    onSaveNote(inputText);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nota"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Guardar" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default AddNote;
