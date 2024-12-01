export interface Artwork {
    id: number;
    title: string;
    artist_title: string | null;
    date_display: string | null;
    image_id: string | null;
    is_public_domain: boolean;
  }