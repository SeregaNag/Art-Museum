import {
  fetchArtworkByLink,
  fetchArtworks,
  fetchSearchArtworks,
} from 'api/api';
import { Artwork, ArtworkSearch } from 'types/types';

export const loadArtworksUtil = async (
  page: number,
  searchQuery: string,
  sortCriteria: string
) => {
  if (searchQuery.trim() === '' && sortCriteria === '') {
    return await fetchArtworks(page);
  } else {
    const searchResults = await fetchSearchArtworks(
      searchQuery,
      page,
      sortCriteria
    );
    if (searchResults.length === 0) return [];
    const detailedArtworks: Artwork[] = await Promise.all(
      searchResults.map((item: ArtworkSearch) =>
        fetchArtworkByLink(item.api_link)
      )
    );
    return detailedArtworks;
  }
};
