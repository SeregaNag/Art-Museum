import FavoritesPage from 'pages/FavoritesPage/FavoritesPage';
import HomePage from 'pages/HomePage/HomePage';
import PaintingDetailPage from 'pages/PaintingDetailPage/PaintingDetailPage';

export const routes = [
  { path: '/', component: HomePage },
  { path: '/artwork/:id', component: PaintingDetailPage },
  { path: '/favorites', component: FavoritesPage },
];
