// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollView } from 'react-native';
import BreedList from './components/BreedList';
import BreedDetails from './components/BreedDetails';
import DogFacts from './components/DogFacts';
import DogGroups from './components/DogGroups';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ScrollView>
          <BreedList />
          <BreedDetails/>
          <DogFacts />
          <DogGroups />
        </ScrollView>
    </QueryClientProvider>
  );
}


