import { useQuery } from '@tanstack/react-query';
import { placesApi } from '../api/places';
import type { PlacesFilters } from '../types';

export const usePlaces = (filters: PlacesFilters = {}) => {
  return useQuery({
    queryKey: ['places', filters],
    queryFn: () => placesApi.getPlaces(filters),
    enabled: true,
  });
};