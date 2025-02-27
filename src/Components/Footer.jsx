import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#454a46] to-[#3d473f] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <motion.h1
            className="text-white text-3xl font-bold tracking-wide cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-white text-indigo-600 px-2 py-1 rounded-lg shadow-md">
              FindMovies
            </span>
          </motion.h1>
          <p className="text-sm mt-2 max-w-xs">
            Discover the best movies, reviews, and ratings. Stay updated with the latest releases and trends in the movie world.
          </p>
        </div>

        {/* Nav bar Links */}
        <ul className="flex space-x-6 text-sm font-medium">
          {[
            { name: "Home", link: "#" },
            { name: "About", link: "#" },
            { name: "Contact", link: "#" }
          ].map((item, index) => (
            <li key={index}>
              <a href={item.link} className="hover:text-gray-300 transition duration-300">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {[
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaInstagram />, link: "#" },
            { icon: <FaLinkedinIn />, link: "#" }
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-white text-lg hover:text-gray-300 transition duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
