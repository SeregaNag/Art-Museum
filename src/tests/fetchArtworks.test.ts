import MockAdapter from 'axios-mock-adapter';
import { fetchArtworks } from 'utils/api';
import { apiClient } from 'utils/api';

describe('fetchArtworks', () => {
  let mock: InstanceType<typeof MockAdapter>;

  beforeAll(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('fetches artworks successfully', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          title: 'Artwork 1',
          artist_title: 'Artist 1',
          date_display: '2024',
          image_id: '123',
          is_public_domain: true,
        },
      ],
      config: { iiif_url: 'https://images.artic.edu/iiif/2' },
    };

    mock.onGet('/artworks').reply(200, mockResponse);

    const artworks = await fetchArtworks();
    expect(artworks).toHaveLength(1);
    expect(artworks[0].title).toBe('Artwork 1');
  }, 10000);

  it('handles errors gracefully', async () => {
    mock.onGet('/artworks').reply(500);

    await expect(fetchArtworks()).rejects.toThrow();
  });
});
