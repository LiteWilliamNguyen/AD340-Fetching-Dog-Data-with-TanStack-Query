import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FlatList, View } from 'react-native';
import BreedList from './components/BreedList';
import BreedDetails from './components/BreedDetails';
import DogFacts from './components/DogFacts';
import DogGroups from './components/DogGroups';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Define sections to be rendered in the app
const sections = [
  { key: 'breedList', component: <BreedList /> },
  { key: 'breedDetails', component: <BreedDetails id="036feed0-da8a-42c9-ab9a-57449b530b13" /> },
  { key: 'dogFacts', component: <DogFacts /> },
  { key: 'dogGroups', component: <DogGroups /> },
];

export default function App() {
  return (
    // Wrap the app with QueryClientProvider to enable caching and other features
    <QueryClientProvider client={queryClient}>
      <FlatList
        data={sections}
        renderItem={({ item }) => <View style={{ marginBottom: 20 }}>{item.component}</View>}
        keyExtractor={(item) => item.key}
      />
    </QueryClientProvider>
  );
}

