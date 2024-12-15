import './PaintingDetailPage.scss';

import { fetchArtworkDetails } from 'api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtworkDetails } from 'types/types';
import SessionStorageHelper from 'utils/sessionStorageHelper';

const PaintingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<ArtworkDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const loadArtworkDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchArtworkDetails(Number(id));
      setArtwork(data);
      setIsFavorite(SessionStorageHelper.isFavorite(Number(id)));
    } catch (error) {
      console.error('Fetching error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleToggleFavorite = useCallback(() => {
    if (!id) return;
    if (isFavorite) {
      SessionStorageHelper.removeFavorite(Number(id));
    } else {
      SessionStorageHelper.addFavorite(Number(id));
    }
    setIsFavorite((prevState) => !prevState);
  }, [id, isFavorite]);

  useEffect(() => {
    loadArtworkDetails();
  }, [loadArtworkDetails]);
  return (
    <div className="artwork-details">
      {loading && <p className="loader-details"></p>}
      {!artwork && !loading && <p>Artwork does not found</p>}
      {artwork && !loading && (
        <>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="artwork-image"
          />
          <div className="artwork-info">
            <h1>{artwork.title}</h1>
            <p>
              <strong>Author:</strong> {artwork.artist_title}
            </p>
            <p>
              <strong>Public Domain:</strong>{' '}
              {artwork.is_public_domain ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              <div
                dangerouslySetInnerHTML={{
                  __html: artwork.description || 'No description available.',
                }}
              />
            </p>
            {artwork.date_display && (
              <p>
                <strong>Date:</strong> {artwork.date_display}
              </p>
            )}
            {artwork.dimensions && (
              <p>
                <strong>Dimensions:</strong> {artwork.dimensions}
              </p>
            )}
            {artwork.medium_display && (
              <p>
                <strong>Medium:</strong> {artwork.medium_display}
              </p>
            )}
            <button
              className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaintingDetailPage;
