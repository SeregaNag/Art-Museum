import './paintingCard.scss';

import { Link } from 'react-router-dom';
import SessionStorageHelper from 'utils/sessionStorageHelper';

interface PaintingCardProps {
  id: number;
  image: string | null;
  title: string;
  artist: string | null;
  isPublic: boolean;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

const PaintingCard: React.FC<PaintingCardProps> = ({
  id,
  image,
  title,
  artist,
  isPublic,
  onFavoriteClick,
  isFavorite,
}) => {
  const toggleFavorite = () => {
    if (isFavorite) {
      SessionStorageHelper.removeFavorite(id);
    } else {
      SessionStorageHelper.addFavorite(id);
    }
    onFavoriteClick();
  };

  return (
    <article className="painting-card">
      <Link to={`/artwork/${id}`} className="painting-card__link">
        <div className="painting-card__image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="painting-card__placeholder">No Image</div>
          )}
        </div>
        <div className="painting-card__content">
          <h3 className="painting-card__title">{title}</h3>
          <p className="painting-card__artist">{artist || 'Unknown Artist'}</p>
          <p className="painting-card__public">
            {isPublic ? 'Public' : 'Private'}
          </p>
        </div>
      </Link>
      <button
        className="painting-card__favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </article>
  );
};

export default PaintingCard;
