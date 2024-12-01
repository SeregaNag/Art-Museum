import { useState, useEffect } from "react";
import { fetchArtworks } from "../../utils/api";
import SearchForm from "../../components/searchForm/searchFrom";
import { Artwork } from "../../types/types";
import PaintingCard from "../../components/paintingCard/paintingCard"
import "./HomePage.scss"


const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const data = await fetchArtworks(page);
        setArtworks(data);
        setFilteredArtworks(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [page]);

  useEffect(() => {
    // Фильтруем картины по поисковому запросу
    const filtered = artworks.filter((artwork) => {
      return (
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (artwork.artist_title && artwork.artist_title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredArtworks(filtered); // Обновляем отфильтрованный список
  }, [searchQuery, artworks]);
  

  const handleSearch = async (values: { query?: string }) => {
    setSearchQuery(values.query || "");
    setPage(1);
  };

  const handleAddToFavorites = (id: number) => {
    console.log(`Artwork with ID ${id} added to favorites.`);
    
  };

  console.log(artworks);
  
  return (
    <div className="home-page">
      <h1>Art Museum</h1>
      <SearchForm onSubmit={handleSearch} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="painting-list">
          {filteredArtworks.map((artwork) => (
            <PaintingCard
              key={artwork.id}
              image={artwork.imageUrl}
              title={artwork.title}
              artist={artwork.artist_title}
              isPublic={artwork.is_public_domain}
              onFavoriteClick={() => handleAddToFavorites(artwork.id)}
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
        <span>Страница: {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next page</button>
      </div>
    </div>
  );
};

export default HomePage;
