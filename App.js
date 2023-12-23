// App.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cover from './src/components/Cover'; 
import AddNote from './src/components/AddNote';
import Menu from './src/components/Menu';
import NotesList from './src/components/NotesList';
import ServicioDiario from './src/components/ServicioDiario';
import Resumen from './src/components/Resumen';
import TotalMes from './src/components/TotalMes';
const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actualizarResumen, setActualizarResumen] = useState(false);

  const handleGuardarServicioDiario = () => {
    setActualizarResumen(!actualizarResumen);
  };

  useEffect(() => {
    // Simular un tiempo de carga (puedes eliminar esto en tu aplicación real)
    setTimeout(async () => {
      // Cargar datos almacenados desde AsyncStorage
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
      setLoading(false); // Desactivar la carga después de cargar los datos
    }, 2000); // Simular 2 segundos de carga
  }, []);

  const saveNote = async (newNoteText) => {
    try {
      // Guardar nueva nota en AsyncStorage
      const newNote = { id: Date.now().toString(), text: newNoteText };
      const updatedNotes = [...notes, newNote];
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

      // Actualizar el estado de las notas
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AddNote':
        return <AddNote onSaveNote={saveNote} />;
      case 'NotesList':
        return <NotesList notes={notes} />;
      case 'ServicioDiario':
        return <ServicioDiario onGuardarServicioDiario={handleGuardarServicioDiario} />;
      case 'Resumen':
        return <Resumen actualizar={actualizarResumen} />;
        case 'TotalMes':
        return <TotalMes />;
      default:
        return null;
    }
  };

  // Mostrar la portada mientras se carga
  if (loading) {
    return <Cover />;
  }

  return (
    <View>
      <Menu onSelectComponent={setSelectedComponent} />
      {renderComponent()}
    </View>
  );
};

export default App;