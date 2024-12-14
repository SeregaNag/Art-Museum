const SessionStorageHelper = {
  FAVORITES_KEY: 'favorites',

  getFavorites(): number[] {
    const storedFavorites = sessionStorage.getItem(this.FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  },

  addFavorite(id: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      const updatedFavorites = [...favorites, id];
      sessionStorage.setItem(
        this.FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
    }
  },

  removeFavorite(id: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id
    );
    sessionStorage.setItem(
      this.FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );
  },

  isFavorite(id: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(id);
  },
};

export default SessionStorageHelper;
