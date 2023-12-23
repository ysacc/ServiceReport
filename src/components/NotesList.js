// NotesList.js
import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

const NotesList = ({ notes }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <ListItem title={item.text} />
          </Card>
        )}
      />
    </View>
  );
};

export default NotesList;
