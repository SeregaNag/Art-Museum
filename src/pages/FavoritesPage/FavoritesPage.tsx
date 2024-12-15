import './FavoritesPage.scss';

import PaintingCard from 'components/paintingCard/paintingCard';
import { useEffect, useState } from 'react';
import { Artwork } from 'types/types';
import { loadFavoriteArtworks } from 'utils/loadFavorites';
import SessionStorageHelper from 'utils/sessionStorageHelper';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const favoriteArtworks = await loadFavoriteArtworks();
        setFavorites(favoriteArtworks);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (id: number) => {
    SessionStorageHelper.removeFavorite(id);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((artwork) => artwork.id !== id)
    );
  };

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {loading ? (
        <p>Looking for your favorites...</p>
      ) : favorites.length > 0 ? (
        <section className="painting-list">
          {favorites.map(
            ({ id, imageUrl, title, artist_title, is_public_domain }) => (
              <PaintingCard
                key={id}
                id={id}
                image={imageUrl}
                title={title}
                artist={artist_title}
                isPublic={is_public_domain}
                isFavorite={true}
                onFavoriteClick={() => handleRemoveFavorite(id)}
              />
            )
          )}
        </section>
      ) : (
        <p>No favorites yet. Add some artworks to your list!</p>
      )}
    </div>
  );
};

export default FavoritesPage;
