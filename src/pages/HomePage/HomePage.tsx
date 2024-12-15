import './HomePage.scss';

import PaintingCard from 'components/paintingCard/paintingCard';
import SearchForm from 'components/searchForm/searchFrom';
import Sort from 'components/Sort/sort';
import { useCallback, useEffect, useState } from 'react';
import { Artwork } from 'types/types';
import { handleError } from 'utils/handleError';
import { loadArtworksUtil } from 'utils/loadArtworks';
import SessionStorageHelper from 'utils/sessionStorageHelper';

const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const loadArtworks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNoResults(false);

    try {
      const data = await loadArtworksUtil(page, searchQuery, sortCriteria);
      if (data.length === 0) {
        setNoResults(true);
        setArtworks([]);
      } else {
        setArtworks(data);
      }
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, sortCriteria]);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  useEffect(() => {
    const storedFavorites = SessionStorageHelper.getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (values: { query?: string }) => {
    setSearchQuery(values.query || '');
    setPage(1);
    setNoResults(false);
  };

  const handleFavoriteClick = () => {
    const updatedFavorites = SessionStorageHelper.getFavorites();
    setFavorites(updatedFavorites);
  };

  const handlePageChange = (offset: number) => {
    setPage((prev) => Math.max(prev + offset, 1));
  };

  return (
    <div className="home-page">
      <h1>Art Museum</h1>
      <SearchForm onSubmit={handleSearch} />

      <Sort onSortChange={setSortCriteria} />

      {error && <div className="error-message">{error}</div>}
      <div className="painting-container">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="painting-list">
            {noResults ? (
              <div className="error-message">
                No results were found for your request "{searchQuery}"
              </div>
            ) : (
              artworks.map(
                ({ id, imageUrl, title, artist_title, is_public_domain }) => (
                  <PaintingCard
                    key={id}
                    id={id}
                    image={imageUrl}
                    title={title}
                    artist={artist_title}
                    isPublic={is_public_domain}
                    isFavorite={favorites.includes(id)}
                    onFavoriteClick={handleFavoriteClick}
                  />
                )
              )
            )}
          </div>
        )}
      </div>

      {!noResults && artworks.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => handlePageChange(-1)}>
            Previous page
          </button>
          <span>Page: {page}</span>
          <button onClick={() => handlePageChange(1)}>Next page</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
