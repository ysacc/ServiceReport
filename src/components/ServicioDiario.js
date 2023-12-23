import React, { useState } from 'react';
import { View, Text, TextInput, Button, DatePickerIOS, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicioDiario = ({ onGuardarServicioDiario }) => {
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [estudios, setEstudios] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [comentarios, setComentarios] = useState('');

  const handleDateChange = (newDate) => {
    setFecha(newDate);
  };

  const guardarServicioDiario = async () => {
    try {
      const nuevoServicioDiario = {
        id: Date.now().toString(),
        horas: parseFloat(horas) || 0,
        minutos: parseFloat(minutos) || 0,
        estudios: parseFloat(estudios) || 0,
        fecha: fecha.toISOString().split('T')[0],
        comentarios,
      };

      // Obtener los servicios diarios actuales de AsyncStorage
      const serviciosDiarios = JSON.parse(await AsyncStorage.getItem('serviciosDiarios')) || [];

      // Buscar si ya hay un reporte para la fecha actual
      const indexReporteExistente = serviciosDiarios.findIndex((item) => item.fecha === nuevoServicioDiario.fecha);

      if (indexReporteExistente !== -1) {
        // Si ya hay un reporte para esa fecha, actualizarlo
        serviciosDiarios[indexReporteExistente].horas += nuevoServicioDiario.horas;
        serviciosDiarios[indexReporteExistente].minutos += nuevoServicioDiario.minutos;
        serviciosDiarios[indexReporteExistente].estudios += nuevoServicioDiario.estudios;
        // Puedes agregar lógica para actualizar otros campos según sea necesario
      } else {
        // Si no hay un reporte para esa fecha, agregar uno nuevo
        serviciosDiarios.push(nuevoServicioDiario);
      }

      // Guardar los servicios diarios actualizados en AsyncStorage
      await AsyncStorage.setItem('serviciosDiarios', JSON.stringify(serviciosDiarios));

      // Llamar a la función proporcionada para actualizar el resumen
      onGuardarServicioDiario();
    } catch (error) {
      console.error('Error al guardar el servicio diario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Horas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={horas}
        onChangeText={(text) => setHoras(text)}
      />

      <Text style={styles.label}>Minutos:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={minutos}
        onChangeText={(text) => setMinutos(text)}
      />

      <Text style={styles.label}>Estudios:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={estudios}
        onChangeText={(text) => setEstudios(text)}
      />

      {/* ... Otros inputs ... */}
      <Button title="Guardar Servicio Diario" onPress={guardarServicioDiario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ServicioDiario;
