import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useDogGroups } from '../hooks/useDogApi';

// Displays a list of dog groups, fetched from the Dog API
export default function DogGroups() {
  // Fetch the list of dog groups using the useDogGroups hook
  const { data, isPending, isError, isSuccess } = useDogGroups();

  // If the data is still being fetched, display an activity indicator
  if (isPending) return <ActivityIndicator />;

  // If there was an error fetching the data, display an error message
  if (isError) return <Text style={styles.errorText}>Error fetching groups.</Text>;

  // If the data was successfully fetched, display it in a FlatList
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Groups:</Text>
      {isSuccess && (
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <View style={styles.factItem}>
              {/* display each group name in a separate item, with a bullet point */}
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
