import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/404';
import Character from './pages/character';

function App() {
  return (
    <BrowserRouter>
      <nav className="text-red m-4">
        <Link to="/">Home</Link> ● <Link to="/about">About me</Link>
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
