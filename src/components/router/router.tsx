import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import PaintingDetailPage from "../../pages/PaintingDetailPage/PaintingDetailPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paint/:id" element={<PaintingDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;