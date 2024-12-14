import './DesktopMenu.scss';

import { Link } from 'react-router-dom';

export const DesktopMenu = () => {
  return (
    <nav className="desktop-menu">
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};
