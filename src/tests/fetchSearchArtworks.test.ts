import MockAdapter from 'axios-mock-adapter';

import { apiClient } from '../utils/api';
import { fetchSearchArtworks } from '../utils/api';

describe('fetchSearchArtworks', () => {
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

  it('fetches search results successfully', async () => {
    mock.onGet('https://api.artic.edu/api/v1/artworks/search').reply(200, {
      data: [{ id: '1', title: 'Searched Artwork' }],
    });

    const results = await fetchSearchArtworks('query');
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Searched Artwork');
  });
});
