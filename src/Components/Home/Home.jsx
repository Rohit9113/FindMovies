import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [query, genre, year, movies]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://imdb-top-100-movies.p.rapidapi.com/", {
        headers: {
          "x-rapidapi-key": "6092a0c7f9msh6ec963de682695cp1b5712jsn0200a99be07f",
          "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
        },
      });

      // console.log("Data:", response.data);

      if (Array.isArray(response.data)) {
        setMovies(response.data);
        setFilteredMovies(response.data);
      } else {
        console.error("Error: API response is not an array");
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setFilteredMovies([]);
    }
  };

  const filterMovies = () => {
    if (!Array.isArray(movies)) return;

    let filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    if (genre) {
      filtered = filtered.filter((movie) => movie.genre.includes(genre));
    }

    if (year) {
      filtered = filtered.filter((movie) => movie.year.toString() === year);
    }

    setFilteredMovies(filtered);
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.h1
        className="text-center text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        IMDB Top 100 Movies
      </motion.h1>

      {/* Search and Filter logic */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 rounded bg-gray-800 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
        </select>
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        >
          <option value="">All Years</option>
          {movies.map((movie) => (
            <option key={movie.year} value={movie.year}>
              {movie.year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentMovies.map((movie) => (
          <motion.div
            key={movie.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/MovieDetails/${movie.id}`)}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-sm text-gray-400">Year: {movie.year}</p>
          </motion.div>
        ))}
      </div>

      {/* Pagination for all moviews*/}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? "bg-indigo-500" : "bg-gray-700"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
