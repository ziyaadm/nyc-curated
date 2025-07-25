export interface Place {
  placeId: string;
  name: string;
  note: string;
  url: string;
  category: 'coffee' | 'food' | 'parks' | 'culture' | 'drinks' | 'shopping' | 'other';
  neighborhood: string;
  rating: number;
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  createdAt: string;
  distance?: number;
}

export interface PlacesResponse {
  places: Place[];
  total: number;
  categories: string[];
  groupedByCategory: Record<string, Place[]>;
  hasUserLocation: boolean;
}

export interface PlacesFilters {
  category?: string;
  neighborhood?: string;
  search?: string;
  userLat?: number;
  userLon?: number;
  maxDistance?: number;
  limit?: number;
}