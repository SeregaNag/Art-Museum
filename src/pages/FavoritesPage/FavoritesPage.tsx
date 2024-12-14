import './FavoritesPage.scss';

import PaintingCard from 'components/paintingCard/paintingCard';
import { useEffect, useState } from 'react';
import { Artwork } from 'types/types';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((artwork) => artwork.id !== id);
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
