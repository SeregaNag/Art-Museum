export const API_ENDPOINTS = {
  ARTWORKS: '/artworks',
  SEARCH: '/artworks/search',
  ARTWORK_DETAILS: (id: string) => `/artworks/${id}`,
};
