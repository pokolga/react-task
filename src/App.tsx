import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/404';
import Character from './pages/character';

function App() {
  return (
    <BrowserRouter>
      <nav className="border-b-solid mx-8 my-2 border-b-2 border-b-blue-500 p-2 text-blue-500">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'font-bold' : 'hover:text-blue-300')}
        >
          Home
        </NavLink>{' '}
        ●{' '}
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'font-bold' : 'hover:text-blue-300')}
        >
          About me
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="characters/:id" element={<Character />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
