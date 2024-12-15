import './NotFoundPage.scss';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <header className="not-found-page">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page not found</p>
      <Link to="/" className="not-found-link">
        To main page
      </Link>
    </header>
  );
};

export default NotFoundPage;
