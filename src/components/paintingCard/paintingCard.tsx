import React from "react";
import "./paintingCard.scss";

interface PaintingCardProps {
  image: string | null;
  title: string;
  artist: string | null;
  isPublic: boolean;
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

const PaintingCard: React.FC<PaintingCardProps> = ({
  image,
  title,
  artist,
  isPublic,
  onFavoriteClick,
  isFavorite
}) => {
  return (
    <div className="painting-card">
      <div className="painting-card__image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="painting-card__placeholder">No Image</div>
        )}
      </div>
      <div className="painting-card__content">
        <h3 className="painting-card__title">{title}</h3>
        <p className="painting-card__artist">{artist || "Unknown Artist"}</p>
        <p className="painting-card__public">
          {isPublic ? "Public" : "Private"}
        </p>
        <button
          className="painting-card__favorite-btn"
          onClick={onFavoriteClick}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default PaintingCard;
