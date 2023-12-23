// Menu.js
import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

const Menu = ({ onSelectComponent }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/carrito.jpeg')} style={styles.image} />
      <Button title="Lista de Notas" onPress={() => onSelectComponent('NotesList')} />
      <Button title="Agregar Nota" onPress={() => onSelectComponent('AddNote')} />
      <Button title="Servicio" onPress={() => onSelectComponent('ServicioDiario')} />
      <Button title="Resumen" onPress={() => onSelectComponent('Resumen')} />
      <Button title="Total del Mes" onPress={() => onSelectComponent('TotalMes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingLeft:50,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default Menu;
