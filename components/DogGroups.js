import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useDogGroups } from '../hooks/useDogApi';

export default function DogGroups() {
  const { data, isPending, isError, isSuccess } = useDogGroups();

  if (isPending) return <ActivityIndicator />;
  if (isError) return <Text style={styles.errorText}>Error fetching groups.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Groups:</Text>
      {isSuccess && (
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <View style={styles.factItem}>
              <Text style={styles.factText} key={item.id}>• {item.attributes.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  factItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  factText: {
    fontSize: 18,
    color: '#333',
  },
});
