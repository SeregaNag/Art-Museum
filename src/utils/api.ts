import axios from "axios";
import { Artwork } from "../types/types";

const API_URL = "https://api.artic.edu/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const getImageUrl = (image_id: string, iiifUrl: string): string => {
  if (image_id) {
    return `${iiifUrl}/${image_id}/full/843,/0/default.jpg`;
  }
  return "https://via.placeholder.com/150?text=No+Image";
};



export const fetchArtworks = async (page: number = 1):Promise<Artwork[]> => {
  const response = await apiClient.get(`/artworks`, { 
    params: {
      page,
      limit: 5, 
    },
  });

  
  console.log(response);
  

  const iiifUrl = response.data.config.iiif_url;


  return response.data.data.map((item: any): Artwork => ({
    id: item.id,
     title: item.title,
     artist_title: item.artist_title || null,
     date_display: item.date_display || null,
     image_id: item.image_id || '', 
     imageUrl: getImageUrl(item.image_id, iiifUrl),
     is_public_domain: item.is_public_domain || false,
   }));
};

export const fetchSearchArtworks = async (query: string, page: number = 1) => {
  const response = await apiClient.get(`/artworks/search`, {
    params: {
      q: query,
      page,
      limit: 5, 
    },
  });
  return response.data.data; 
};

export const fetchArtworkByLink = async (apiLink: string) => {
  const response = await axios.get(apiLink); 
  const artwork = response.data.data; 

  
  const iiifUrl = response.data.config.iiif_url;
  return {
    id: artwork.id,
    title: artwork.title,
    artist_title: artwork.artist_title || null,
    date_display: artwork.date_display || null,
    image_id: artwork.image_id || '',
    imageUrl: artwork.image_id
      ? `${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`
      : "https://via.placeholder.com/150?text=No+Image",
    is_public_domain: artwork.is_public_domain || false,
  };
};

export const fetchArtworkDetails = async (id: string) => {
  const response = await apiClient.get(`/artworks/${id}`);
  return response.data;
};
