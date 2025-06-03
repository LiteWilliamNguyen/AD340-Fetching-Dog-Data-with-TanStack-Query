import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useBreedById } from '../hooks/useDogApi';
import { FlatList } from 'react-native-web';

export default function BreedDetails({ id }) {
  const { data, isPending, isError, isSuccess } = useBreedById({ id });

  if (isPending) return <ActivityIndicator />;
  if (isError) return <Text style={styles.errorText}>Error fetching breed details.</Text>;

  const breed = isSuccess ? data.data.attributes : {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Breeds: {breed.name}</Text>
      {isSuccess && (
        <FlatList
          data={data.data.attributes}
          renderItem={({ item }) => (
            // Render breed details
            <View style={styles.breedItem}>
              <Text style={styles.breedName}>{`${item.attributes.name}`}</Text>
              <Text style={styles.description}>{breed.description}</Text>
              
              {/* Life Expectancy */}
              <View style={styles.breedInfoContainer}>
                <Text style={styles.label}>Life Expectancy:</Text>
                <Text style={styles.value}>{breed.life?.min} - {breed.life?.max} years</Text>
              </View>
              
              {/* Male Weight */}
              <View style={styles.breedInfoContainer}>
                <Text style={styles.label}>Male Weight:</Text>
                <Text style={styles.value}>{breed.male_weight?.min} - {breed.male_weight?.max} kg</Text>
              </View>
              
              {/* Female Weight */}
              <View style={styles.breedInfoContainer}>
                <Text style={styles.label}>Female Weight:</Text>
                <Text style={styles.value}>{breed.female_weight?.min} - {breed.female_weight?.max} kg</Text>
              </View>
              
              {/* Hypoallergenic */}
              <View style={styles.breedInfoContainer}>
                <Text style={styles.label}>Hypoallergenic:</Text>
                <Text style={styles.value}>{breed.hypoallergenic ? 'Yes' : 'No'}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
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
