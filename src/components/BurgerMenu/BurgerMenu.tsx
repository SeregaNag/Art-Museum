import './BurgerMenu.scss';

import { useBurgerMenu } from 'hooks/useBurgerMenu';
import { Link } from 'react-router-dom';

export const BurgerMenu = () => {
  const { isOpen, toggleMenu } = useBurgerMenu();

  return (
    <div className="burger-menu">
      <button
        className={`burger-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>
      <nav className={`menu ${isOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Main
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={toggleMenu}>
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
