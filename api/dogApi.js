import axios from 'axios';

const dogApi = axios.create({
  baseURL: 'https://dogapi.dog/api/v2',
});

// This object contains methods to interact with the Dog API to fetch different types of data
export const DogAPI = {
  // Fetches a list of all breeds
  getBreeds: async () => (await dogApi.get('/breeds')).data,

  // Fetches details of a specific breed by its ID
  getBreedById: async ({ id }) => {
    const { data } = await dogApi.get(`/breeds/${id}`);
    return data;
  },

  // Fetches a list of dog facts
  getFacts: async () => (await dogApi.get('/facts')).data,

  // Fetches a list of dog groups
  getGroups: async () => (await dogApi.get('/groups')).data,
};
