import axios from 'axios';
import { API_URL, IMAGE_PLACEHOLDER } from 'constants/apiConstants';

import { Artwork, ArtworkDetails, ArtworkSearch } from '../types/types';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const getImageUrl = (image_id: string, iiifUrl: string): string => {
  if (image_id) {
    return `${iiifUrl}/${image_id}/full/843,/0/default.jpg`;
  }
  return IMAGE_PLACEHOLDER;
};

export const fetchArtworks = async (page: number = 1): Promise<Artwork[]> => {
  const response = await apiClient.get(`/artworks`, {
    params: {
      page,
      limit: 5,
    },
  });

  const iiifUrl = response.data.config.iiif_url;

  return response.data.data.map(
    (item: ArtworkSearch): Artwork => ({
      id: item.id,
      title: item.title,
      artist_title: item.artist_title || null,
      date_display: item.date_display || null,
      image_id: item.image_id || '',
      imageUrl: getImageUrl(item.image_id, iiifUrl),
      is_public_domain: item.is_public_domain || false,
    })
  );
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
      : IMAGE_PLACEHOLDER,
    is_public_domain: artwork.is_public_domain || false,
  };
};

export const fetchArtworkDetails = async (
  id: string
): Promise<ArtworkDetails> => {
  try {
    const response = await apiClient.get(`/artworks/${id}`);
    const data = response.data.data;

    const iiifUrl = response.data.config.iiif_url;
    return {
      id: data.id,
      title: data.title,
      image_id: data.image_id || '',
      imageUrl: data.image_id
        ? `${iiifUrl}/${data.image_id}/full/843,/0/default.jpg`
        : IMAGE_PLACEHOLDER,
      artist_title: data.artist_title,
      is_public_domain: data.is_public_domain,
      description: data.description,
      dimensions: data.dimensions,
      date_display: data.date_display,
      medium_display: data.medium_display,
    };
  } catch (error) {
    console.error('Ошибка получения данных о картине:', error);
    throw error;
  }
};
