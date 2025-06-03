import { useQuery } from '@tanstack/react-query';
import { DogAPI } from '../api/dogApi';

export const useBreeds = () =>
  // fetches list of all breeds from the API
  useQuery({ queryKey: ['breeds'], queryFn: DogAPI.getBreeds });

export const useBreedById = ({ id }) =>
  // fetches single breed by ID from the API
  useQuery({ queryKey: ['breed', id], queryFn: () => DogAPI.getBreedById({ id }), enabled: !!id });

export const useDogFacts = () =>
  // fetches list of dog facts from the API
  useQuery({ queryKey: ['dog-facts'], queryFn: DogAPI.getFacts });

export const useDogGroups = () =>
  // fetches list of dog groups from the API
  useQuery({ queryKey: ['dog-groups'], queryFn: DogAPI.getGroups });
