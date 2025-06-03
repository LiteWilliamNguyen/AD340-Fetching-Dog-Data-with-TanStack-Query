import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { DogAPI } from '../api/dogApi';

/**
 * A component that displays the details of a specific dog breed
 * @param {string} id - The id of the breed to display
 */
export default function BreedDetails({ id }) {
  const { data, error, isLoading, isError } = useQuery({
    // The key used to identify the data in the cache
    queryKey: ['breed', id],
    // The function that fetches the data from the API
    queryFn: () => DogAPI.getBreedById({ id }),
  });

  // If the data is still loading, display an activity indicator
  if (isLoading) return <ActivityIndicator />;

  // If there was an error fetching the data, display an error message
  if (isError) return <Text style={styles.errorText}>Error fetching breed details.</Text>;

  // Extract the breed data from the response
  const breed = data?.data?.attributes || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Breeds: {breed.name}</Text>
      {data && (
        <FlatList
          // The data to render in the list
          data={Object.entries(breed)}
          // Function to render each item in the list
          renderItem={({ item }) => {
            const [key, value] = item;
            return (
              <View style={styles.breedItem}>
                <Text style={styles.breedName}>{key}</Text>
                {key === 'description' ? (
                  // Render the description as a multi-line text
                  <Text style={styles.description}>{value}</Text>
                ) : (
                  // Render the value as a single-line text
                  <Text style={styles.value}>
                    {typeof value === 'object'
                      ? `${value.min} - ${value.max}`
                      : value
                        ? 'Yes'
                        : 'No'}
                  </Text>
                )}
              </View>
            );
          }}
          // Function to generate the key for each item in the list
          keyExtractor={(item) => item[0]}
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
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  breedInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 150,
  },
  value: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

