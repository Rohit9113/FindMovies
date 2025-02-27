import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home/Home';
import MovieDetails from './Components/Home/MoviewDetails';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
