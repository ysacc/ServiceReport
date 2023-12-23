import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resumen = () => {
  const [serviciosDiarios, setServiciosDiarios] = useState([]);

  const cargarServiciosDiarios = async () => {
    try {
      const storedServiciosDiarios = await AsyncStorage.getItem('serviciosDiarios');
      if (storedServiciosDiarios) {
        setServiciosDiarios(JSON.parse(storedServiciosDiarios));
      }
    } catch (error) {
      console.error('Error al cargar los servicios diarios:', error);
    }
  };

  useEffect(() => {
    cargarServiciosDiarios();
  }, []); // Cargar servicios diarios al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen Diario</Text>
      {serviciosDiarios.length > 0 ? (
        <FlatList
          data={serviciosDiarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{`Fecha: ${item.fecha}`}</Text>
              <Text>{`Horas: ${item.horas}`}</Text>
              <Text>{`Estudios: ${item.estudios}`}</Text>
              <Text>{`Comentarios: ${item.comentarios}`}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No hay servicios diarios guardados</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default Resumen;
