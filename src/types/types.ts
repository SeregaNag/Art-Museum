export interface Artwork {
  id: number;
  title: string;
  artist_title: string | null;
  date_display: string | null;
  image_id: string;
  imageUrl: string;
  is_public_domain: boolean;
}

export interface ArtworkDetails {
  id: number;
  title: string;
  image_id: string;
  imageUrl: string;
  artist_title: string;
  is_public_domain: boolean;
  description?: string;
  dimensions?: string;
  date_display?: string;
  medium_display?: string;
}

export interface ArtworkSearch {
  api_link: string;
  id: number;
  title: string;
  artist_title: string | null;
  date_display: string | null;
  image_id: string;
  imageUrl: string;
  is_public_domain: boolean;
}
