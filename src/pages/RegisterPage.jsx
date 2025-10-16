import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = register(email, password);

      if (success) {
        toast.success("Registrasi berhasil! Silakan masuk.");
        navigate("/login");
      } else {
        setError("Email ini sudah terdaftar. Silakan gunakan email lain.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-stretch justify-between gap-8">
        <div className="relative w-full lg:w-1/2 flex justify-center items-center lg:items-start lg:pt-16">
          <img
            src="/images/curves-99.png"
            alt="curves"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg opacity-20 lg:opacity-100 pointer-events-none z-0"
          />
          <div className="relative text-center lg:text-left z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Daftar untuk
              <br />
              mulai mengelola
            </h1>
            <p className="mt-4 text-gray-600">
              Sudah memiliki akun? <br />
              silahkan&nbsp;
              <Link
                to="/login"
                className="text-blue-500 font-bold hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
            {isLoading && <Loader>Mohon tunggu...</Loader>}

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Buat Akun Baru
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan email"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  placeholder="••••••••"
                  required
                />
                <img
                  src={
                    showPassword
                      ? "/images/eye-up-icon.png"
                      : "/images/eye-icon.png"
                  }
                  alt="Toggle Password Visibility"
                  onClick={toggleShowPassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-5 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
