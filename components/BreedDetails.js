import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { DogAPI } from '../api/dogApi';

export default function BreedDetails({ id }) {
  const { data, error, isLoading, isError } = useQuery({
  queryKey: ['breed', id],
  queryFn: () => DogAPI.getBreedById({ id }),
});


  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text style={styles.errorText}>Error fetching breed details.</Text>;

  const breed = data?.data?.attributes || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Breeds: {breed.name}</Text>
      {data && (
        <FlatList
          data={Object.entries(breed)}
          renderItem={({ item }) => {
            const [key, value] = item;
            return (
              <View style={styles.breedItem}>
                <Text style={styles.breedName}>{key}</Text>
                {key === 'description' ? (
                  <Text style={styles.description}>{value}</Text>
                ) : (
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

