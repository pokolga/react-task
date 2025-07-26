import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/404';
import Character from './pages/character';

function App() {
  return (
    <BrowserRouter>
      <nav className="border-b-solid m-8 border-b-2 border-b-blue-500 p-2 text-blue-500">
        <Link to="/" className="m-4 p-1 hover:bg-white">
          Home
        </Link>{' '}
        ●{' '}
        <Link to="/about" className="m-4 p-1 hover:bg-white">
          About me
        </Link>
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
