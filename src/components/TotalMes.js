import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TotalMes = () => {
  const [totalMes, setTotalMes] = useState({
    horas: 0,
    minutos: 0,
    estudios: 0,
  });

  const calcularTotalMes = async () => {
    try {
      const storedServiciosDiarios = await AsyncStorage.getItem('serviciosDiarios');
      if (storedServiciosDiarios) {
        const serviciosDiarios = JSON.parse(storedServiciosDiarios);

        // Filtrar los servicios diarios para el mes actual
        const serviciosMesActual = serviciosDiarios.filter((item) => {
          const fechaActual = new Date();
          const fechaServicio = new Date(item.fecha);

          return (
            fechaServicio.getMonth() === fechaActual.getMonth() &&
            fechaServicio.getFullYear() === fechaActual.getFullYear()
          );
        });

        // Calcular el total para el mes actual
        const totalMesCalculado = serviciosMesActual.reduce(
          (total, item) => {
            total.horas += item.horas;
            total.minutos += item.minutos;
            total.estudios += item.estudios;
            return total;
          },
          { horas: 0, minutos: 0, estudios: 0 }
        );

        // Ajustar los minutos a horas si es necesario
        totalMesCalculado.horas += Math.floor(totalMesCalculado.minutos / 60);
        totalMesCalculado.minutos %= 60;

        setTotalMes(totalMesCalculado);
      }
    } catch (error) {
      console.error('Error al calcular el total del mes:', error);
    }
  };

  useEffect(() => {
    calcularTotalMes();
  }, []); // Calcular total del mes al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Total del Mes</Text>
      <Text>{`Total de horas para el mes: ${totalMes.horas} horas y ${totalMes.minutos} minutos`}</Text>
      <Text>{`Total de estudios para el mes: ${totalMes.estudios}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TotalMes;
