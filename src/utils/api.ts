import axios from "axios";
import { Artwork } from "../pages/HomePage/HomePage";

const API_URL = "https://api.artic.edu/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const fetchArtworks = async (page: number = 1, query?: string): Promise<Artwork[]> => {
  const response = await apiClient.get(`/artworks/search`, { 
    params: {
      q: query || "",
      page,
      size: 5, 
    },
  });
  return response.data.data.map((item: any): Artwork => ({
    id: item.id,
    title: item.title,
    artist_title: item.artist_title || null,
    date_display: item.date_display || null,
    image_id: item.image_id || null,
    is_public_domain: item.is_public_domain || false,
  }));
};

export const fetchArtworkDetails = async (id: string) => {
  const response = await apiClient.get(`/artworks/${id}`);
  return response.data;
};
