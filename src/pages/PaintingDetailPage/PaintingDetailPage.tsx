import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArtworkDetails } from "utils/api";
import { ArtworkDetails } from "types/types";
import "./PaintingDetailPage.scss";

const PaintingDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [artwork, setArtwork] = useState<ArtworkDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<ArtworkDetails[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadArtworkDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchArtworkDetails(id!);
        setArtwork(data);
        
        const storedFavorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
        setIsFavorite(storedFavorites.some((favorite: ArtworkDetails) => favorite.id === data.id));
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadArtworkDetails();
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.some((favorite) => favorite.id === artwork?.id)
        ? prevFavorites.filter((favorite) => favorite.id !== artwork?.id)
        : [...prevFavorites, artwork!];

      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p>Loading...</p>;
  if (!artwork) return <p>Картина не найдена</p>;

  return (
    <div className="artwork-details">
      <img src={artwork.imageUrl} alt={artwork.title} className="artwork-image" />
      <div className="artwork-info">
        <h1>{artwork.title}</h1>
        <p><strong>Author:</strong> {artwork.artist_title}</p>
        <p><strong>Public Domain:</strong> {artwork.is_public_domain ? "Yes" : "No"}</p>
        <p><strong>Description:</strong> {artwork.description || "No description available."}</p>
        {artwork.date_display && <p><strong>Date:</strong> {artwork.date_display}</p>}
        {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
        {artwork.medium_display && <p><strong>Medium:</strong> {artwork.medium_display}</p>}
        <button
          className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default PaintingDetailPage;
