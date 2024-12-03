import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { fetchArtworkByLink } from "utils/api";

describe("fetchArtworkByLink", () => {
    let mock: InstanceType<typeof MockAdapter>;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("fetches artwork by API link", async () => {
    const apiLink = "https://api.artic.edu/api/v1/artworks/1";
    mock.onGet(apiLink).reply(200, {
      data: {
        id: "1",
        title: "Artwork from Link",
        image_id: "456",
        is_public_domain: true,
      },
      config: { iiif_url: "https://images.artic.edu/iiif/2" },
    });

    const artwork = await fetchArtworkByLink(apiLink);
    expect(artwork.title).toBe("Artwork from Link");
  });
});
