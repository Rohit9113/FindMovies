import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStar } from "react-icons/fa";


function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`https://imdb-top-100-movies.p.rapidapi.com/top32`, {
                headers: {
                    "x-rapidapi-key": "6092a0c7f9msh6ec963de682695cp1b5712jsn0200a99be07f",
                    "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
                },
            });
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <motion.div
                className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.img
                    src={movie.big_image}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-lg"
                    whileHover={{ scale: 1.05 }}
                />
                <h2 className="text-3xl font-bold mt-4">{movie.title}</h2>
                <p className="text-sm text-gray-400">Year: {movie.year}</p>
                <p className="text-sm text-gray-400">Rating: <FaStar /> {movie.rating}</p>
                <p className="text-sm text-gray-400">Genre: {movie.genre.join(", ")}</p>
                <p className="text-sm text-gray-400">Director: {movie.director.join(", ")}</p>
                <p className="text-sm text-gray-400">Writers: {movie.writers.join(", ")}</p>
                <p className="mt-4">{movie.description}</p>

                <motion.div
                    className="mt-6 text-center"
                    whileHover={{ scale: 1.1 }}
                >
                    <a
                        href={movie.imdb_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        View on IMDB
                    </a>
                </motion.div>

                <div className="mt-6">
                    <iframe
                        width="100%"
                        height="400"
                        src={movie.trailer_embed_link}
                        title="Movie Trailer"
                        allowFullScreen
                        className="rounded-lg"
                    ></iframe>
                </div>
            </motion.div>
        </div>
    );
}

export default MovieDetails;
