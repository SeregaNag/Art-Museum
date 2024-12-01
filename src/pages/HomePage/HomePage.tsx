import { useState, useEffect } from "react";
import { fetchArtworks } from "../../utils/api";
import SearchForm from "../../components/searchForm/searchFrom";
import { Artwork } from "../../types/types";


const HomePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);

      try {
        const data = await fetchArtworks(page, searchQuery);
        setArtworks(data);
      } catch (error) {
        console.log("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [page, searchQuery]);
  

  const handleSearch = async (values: { query?: string }) => {
    setSearchQuery(values.query);
  };
  console.log(artworks);
  return (
    <div>
      <h1>Art Museum</h1>
      <SearchForm onSubmit={handleSearch} />
      {loading ? (
        <p> Loading</p>
      ) : (
        artworks.length > 0 ? (
          <ul>
            {artworks.map((artwork) => (
              <li key={artwork.id}>{artwork.title}</li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено</p>
        )
      )}

      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous page
        </button>
        <span>Страница: {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
