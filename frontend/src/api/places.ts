import axios from 'axios';
import type { PlacesResponse, PlacesFilters } from '../types';

const API_BASE_URL = 'https://kvax6bff90.execute-api.us-east-1.amazonaws.com/prod';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const placesApi = {
  getPlaces: async (filters: PlacesFilters = {}): Promise<PlacesResponse> => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.neighborhood) params.append('neighborhood', filters.neighborhood);
    if (filters.userLat) params.append('userLat', filters.userLat.toString());
    if (filters.userLon) params.append('userLon', filters.userLon.toString());
    if (filters.maxDistance) params.append('maxDistance', filters.maxDistance.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/places/nearby?${params.toString()}`);
    return response.data;
  },
};