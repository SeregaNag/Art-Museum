import axios from "axios";

const API_URL = "https://api.artic.edu/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const fetchArtworks = async (page: number = 1) => {
  const response = await apiClient.get(`/artworks`, {
    params: {
      page,
      limit: 5,
    },
  });
  return response.data;
};

export const fetchArtworkDetails = async (id: string) => {
  const response = await apiClient.get(`/artworks/${id}`);
  return response.data;
};
