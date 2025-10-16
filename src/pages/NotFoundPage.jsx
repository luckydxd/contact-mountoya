import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-48 h-48">
        <DotLottieReact
          src="https://lottie.host/93cd56a5-4a4e-420b-8a3d-f42358160c63/9AVuaFGusS.lottie"
          loop
          autoplay
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-600 mt-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mt-4 max-w-md">
        Maaf, halaman yang Anda cari mungkin telah dihapus, diganti, atau tidak
        pernah ada.
      </p>
      <Link
        to="/dashboard"
        className="mt-8 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}
