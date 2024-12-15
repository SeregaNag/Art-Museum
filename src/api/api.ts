import axios from 'axios';

import { API_URL, IMAGE_PLACEHOLDER } from '../constants/apiConstants';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { Artwork, ArtworkDetails, ArtworkSearch } from '../types/types';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const getImageUrl = async (
  image_id: string | null,
  iiifUrl: string
): Promise<string> => {
  if (!image_id) {
    return IMAGE_PLACEHOLDER;
  }

  const imageUrl = `${iiifUrl}/${image_id}/full/843,/0/default.jpg`;

  try {
    const response = await axios.get(imageUrl);
    if (response.status === 200) {
      return imageUrl;
    } else {
      return IMAGE_PLACEHOLDER;
    }
  } catch (error) {
    console.error('Error loading image:', error);
    return IMAGE_PLACEHOLDER;
  }
};

export const fetchArtworks = async (page: number = 1): Promise<Artwork[]> => {
  const response = await apiClient.get(API_ENDPOINTS.ARTWORKS, {
    params: {
      page,
      limit: 5,
    },
  });

  const iiifUrl = response.data.config.iiif_url;

  const artworks = await Promise.all(
    response.data.data.map(async (item: ArtworkSearch): Promise<Artwork> => {
      const imageUrl = await getImageUrl(item.image_id, iiifUrl);
      return {
        id: item.id,
        title: item.title,
        artist_title: item.artist_title || null,
        date_display: item.date_display || null,
        image_id: item.image_id || '',
        imageUrl,
        is_public_domain: item.is_public_domain || false,
      };
    })
  );

  return artworks;
};

export const fetchSearchArtworks = async (
  query: string,
  page: number = 1,
  sort: string = ''
) => {
  const response = await apiClient.get(API_ENDPOINTS.SEARCH, {
    params: {
      q: query,
      page,
      limit: 5,
      sort,
    },
  });
  return response.data.data;
};

export const fetchArtworkByLink = async (apiLink: string): Promise<Artwork> => {
  const response = await axios.get(apiLink);
  const artwork = response.data.data;

  const iiifUrl = response.data.config.iiif_url;
  const imageUrl = await getImageUrl(artwork.image_id, iiifUrl);

  return {
    id: artwork.id,
    title: artwork.title,
    artist_title: artwork.artist_title || null,
    date_display: artwork.date_display || null,
    image_id: artwork.image_id || '',
    imageUrl,
    is_public_domain: artwork.is_public_domain || false,
  };
};

export const fetchArtworkDetails = async (
  id: number
): Promise<ArtworkDetails> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.ARTWORK_DETAILS(id));
    const data = response.data.data;

    const iiifUrl = response.data.config.iiif_url;
    const imageUrl = await getImageUrl(data.image_id, iiifUrl);

    return {
      id: data.id,
      title: data.title,
      image_id: data.image_id || '',
      imageUrl,
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
