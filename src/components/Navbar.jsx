import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-transparent px-6 md:px-12 lg:px-20 py-6 font-semibold">
      <div className="flex items-center justify-between">
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors shadow"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"
              >
                Masuk
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {isOpen ? (
              <span className="text-gray-700 text-3xl">&times;</span>
            ) : (
              <span className="text-gray-700 text-3xl">&#9776;</span>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-500 py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 text-center bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-500 py-2"
                >
                  Beranda
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-500 py-2"
                >
                  Cara Pakai
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Masuk
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
