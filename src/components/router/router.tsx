import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';
import { DesktopMenu } from 'components/DesktopMenu/DesktopMenu';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { routes } from 'constants/routes';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {isMobile ? <BurgerMenu /> : <DesktopMenu />}
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Router;
