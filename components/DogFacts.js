import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { DogAPI } from '../api/dogApi';

// This component displays a list of dog facts
export default function DogFacts() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['dog-facts'],
    queryFn: DogAPI.getFacts
  });

  if (isLoading) return <ActivityIndicator />; // Show a spinner while data is loading
  if (isError) return <Text>Error fetching facts.</Text>; // Show an error message if the data fetch fails

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Facts:</Text>
      {isSuccess && (
        <FlatList
          data={data.data}
          renderItem={({ item }) => (
            <View style={styles.factItem}>
              <Text style={styles.factText}>• {item.attributes.body}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()} // The data items don't have an id, so use an index to key them
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
