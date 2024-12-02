import { useState, useEffect } from "react";
import { fetchArtworks, fetchSearchArtworks, fetchArtworkByLink } from "../../utils/api";
import SearchForm from "../../components/searchForm/searchFrom";
import { Artwork } from "../../types/types";
import PaintingCard from "../../components/paintingCard/paintingCard"
import "./HomePage.scss"


const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadArtworks = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim() === "") {
        const data = await fetchArtworks(page);
        setArtworks(data);
      } else {
        const searchResults = await fetchSearchArtworks(searchQuery, page);
  
        const detailedArtworks = await Promise.all(
          searchResults.map((item: any) => fetchArtworkByLink(item.api_link))
        );
  
        setArtworks(detailedArtworks);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadArtworks();
  }, [searchQuery, page]);

  const handleSearch = (values: { query?: string }) => {
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
          {artworks.map((artwork) => (
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
