import MockAdapter from 'axios-mock-adapter';

import { apiClient } from '../api/api';
import { fetchArtworkDetails } from '../api/api';

describe('fetchArtworkDetails', () => {
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

  it('fetches artwork details successfully', async () => {
    mock.onGet('https://api.artic.edu/api/v1/artworks/1').reply(200, {
      data: {
        id: '1',
        title: 'Detailed Artwork',
        image_id: '789',
        is_public_domain: true,
      },
      config: { iiif_url: 'https://images.artic.edu/iiif/2' },
    });

    const artworkDetails = await fetchArtworkDetails('1');
    expect(artworkDetails.title).toBe('Detailed Artwork');
  });
});
