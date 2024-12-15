import { fetchArtworkDetails } from 'api/api';
import { Artwork, ArtworkDetails } from 'types/types';
import SessionStorageHelper from 'utils/sessionStorageHelper';

export const loadFavoriteArtworks = async (): Promise<Artwork[]> => {
  const favoriteIds = SessionStorageHelper.getFavorites();
  const favoriteArtworks: Artwork[] = [];

  for (const id of favoriteIds) {
    try {
      const artworkDetails: ArtworkDetails = await fetchArtworkDetails(id);
      const artwork: Artwork = {
        id: artworkDetails.id,
        image_id: artworkDetails.image_id,
        imageUrl: artworkDetails.imageUrl,
        title: artworkDetails.title,
        artist_title: artworkDetails.artist_title || 'Unknown Artist',
        is_public_domain: artworkDetails.is_public_domain,
        date_display: artworkDetails.date_display || null,
      };
      favoriteArtworks.push(artwork);
    } catch (error) {
      console.error(`Error fetching artwork with id ${id}:`, error);
    }
  }

  return favoriteArtworks;
};
