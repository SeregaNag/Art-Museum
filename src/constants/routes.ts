import FavoritesPage from 'pages/FavoritesPage/FavoritesPage';
import HomePage from 'pages/HomePage/HomePage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PaintingDetailPage from 'pages/PaintingDetailPage/PaintingDetailPage';

export const routes = [
  { path: '/', component: HomePage },
  { path: '/artwork/:id', component: PaintingDetailPage },
  { path: '/favorites', component: FavoritesPage },
  { path: '*', component: NotFoundPage },
];
