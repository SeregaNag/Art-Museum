import './HomePage.scss';

import PaintingCard from 'components/paintingCard/paintingCard';
import SearchForm from 'components/searchForm/searchFrom';
import { useEffect, useState } from 'react';
import { Artwork, ArtworkSearch } from 'types/types';
import {
  fetchArtworkByLink,
  fetchArtworks,
  fetchSearchArtworks,
} from 'utils/api';

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  const loadArtworks = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim() === '') {
        const data = await fetchArtworks(page);
        setArtworks(data);
      } else {
        const searchResults = await fetchSearchArtworks(searchQuery, page);

        const detailedArtworks: Artwork[] = await Promise.all(
          searchResults.map((item: ArtworkSearch) =>
            fetchArtworkByLink(item.api_link)
          )
        );

        setArtworks(detailedArtworks);
      }
    } catch (error) {
      console.error('Fetching error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, [searchQuery, page]);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (values: { query?: string }) => {
    setSearchQuery(values.query || '');
    setPage(1);
  };

  const handleAddToFavorites = (artwork: Artwork) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === artwork.id)) {
        return prevFavorites.filter((fav) => fav.id !== artwork.id);
      } else {
        return [...prevFavorites, artwork];
      }
    });
  };

  return (
    <div className="home-page">
      <h1>Art Museum</h1>
      <SearchForm onSubmit={handleSearch} />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="painting-list">
          {artworks.map((artwork) => (
            <PaintingCard
              key={artwork.id}
              id={artwork.id}
              image={artwork.imageUrl}
              title={artwork.title}
              artist={artwork.artist_title}
              isPublic={artwork.is_public_domain}
              isFavorite={favorites.some((fav) => fav.id === artwork.id)}
              onFavoriteClick={() => handleAddToFavorites(artwork)}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous page
        </button>
        <span>Page: {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next page</button>
      </div>
    </div>
  );
};

export default HomePage;
