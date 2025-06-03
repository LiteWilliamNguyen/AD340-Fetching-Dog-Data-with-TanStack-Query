import React from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { DogAPI } from '../api/dogApi';

export default function BreedList() {
  const { data, isPending, isError, isSuccess } = useQuery(
    ['breeds'],  // Key for the query
    () => DogAPI.getBreeds(),  // Function to fetch data
    { enabled: true }  // Options
  );

  if (isPending) return <ActivityIndicator />;
  if (isError) return <Text style={styles.errorText}>Error fetching breeds.</Text>;

  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Dog Breeds:</Text>  
      {isSuccess && (  // Check if data fetching was successful
        <FlatList
          data={data.data}  // Data source for the list
          renderItem={({ item }) => (  // Render each item in the list
            <View style={styles.breedItem}>  
              <Text style={styles.breedName}>{`${item.attributes.name}`}</Text>  
            </View>
          )}
          keyExtractor={(item) => item.id}  // Unique key for each item
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
  breedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  breedName: {
    fontSize: 18,
    color: '#333',
  },
});
