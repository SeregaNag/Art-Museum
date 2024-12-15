export const handleError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message || "Couldn't fetch artworks";
  }
  return 'An unknown error occurred';
};
