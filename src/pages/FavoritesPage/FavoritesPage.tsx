import './FavoritesPage.scss';

import { fetchArtworkDetails } from 'api/api';
import PaintingCard from 'components/paintingCard/paintingCard';
import { useEffect, useState } from 'react';
import { Artwork, ArtworkDetails } from 'types/types';
import SessionStorageHelper from 'utils/sessionStorageHelper';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
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

      setFavorites(favoriteArtworks);
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((artwork) => artwork.id !== id)
    );
  };
  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <div className="painting-list">
          {favorites.map((artwork) => (
            <PaintingCard
              key={artwork.id}
              id={artwork.id}
              image={artwork.imageUrl}
              title={artwork.title}
              artist={artwork.artist_title}
              isPublic={artwork.is_public_domain}
              isFavorite={true}
              onFavoriteClick={() => handleRemoveFavorite(artwork.id)}
            />
          ))}
        </div>
      ) : (
        <p>No favorites yet. Add some artworks to your list!</p>
      )}
    </div>
  );
};

export default FavoritesPage;
