import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#454a46] to-[#3d473f] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
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

        {/* Desktop Nav Bar */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          {[
            { name: "Home", link: "#" },
            { name: "About", link: "#" },
            { name: "Contact", link: "#" }
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a href={item.link} className="hover:text-gray-200 transition duration-300">
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center space-y-6 py-6 bg-[#3d473f] w-full"
          >
            {[
              { name: "Home", link: "#" },
              { name: "About", link: "#" },
              { name: "Contact", link: "#" }
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <a href={item.link} className="text-white text-xl hover:text-gray-200 transition duration-300">
                  {item.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;
