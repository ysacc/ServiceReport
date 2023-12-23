// Cover.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const Cover = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/carrito.jpeg')} style={styles.image} />
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Cover;
