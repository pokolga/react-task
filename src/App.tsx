import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/404';
import Character from './pages/character';
import { useContext, useState, type FC } from 'react';
import ThemeContext from './themeContext';
import { btnBase } from './models/constants';

const App: FC = () => {
  const themeFromContext = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(themeFromContext);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  return (
    <ThemeContext value={isDarkMode}>
      <BrowserRouter>
        <div className={`${isDarkMode ? 'dark' : ''} min-h-full bg-(--color-bg)`}>
          <nav className="border-b-solid mx-8 my-2 flex items-end justify-start gap-2 border-b-2 border-b-(--color-bg-button) p-2 text-(--color-bg-button)">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-bold' : 'hover:text-blue-300')}
            >
              Home
            </NavLink>
            ●
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'font-bold' : 'hover:text-blue-300')}
            >
              About me
            </NavLink>
            <button className={`ml-auto ${btnBase}`} onClick={toggleTheme} data-testid="theme">
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>

          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="characters/:id" element={<Character />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext>
  );
};

export default App;
