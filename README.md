Contact-Mountoya: Aplikasi Manajemen Kontak

Contact-Mountoya adalah aplikasi web CRUD (Create, Read, Update, Delete) yang dirancang untuk mengelola daftar kontak secara efisien. Proyek ini dibangun sebagai Single Page Application (SPA) menggunakan React, Vite, dan JavaScript.

🚀 Fitur Utama

👤 Manajemen Kontak Penuh (CRUD): Tambah, lihat, perbarui, dan hapus kontak dengan mudah.

🔐 Autentikasi Sisi Klien: Alur registrasi, login, dan logout yang aman dengan rute terlindungi.

🗺️ Integrasi Peta Interaktif: Tampilkan semua lokasi kontak di satu peta dan pilih lokasi saat menambah/mengedit kontak menggunakan Leaflet.js.

🖼️ Upload Foto & Live Preview: Unggah foto profil untuk setiap kontak dan lihat pratinjau langsung.

✨ UI/UX Modern & Responsif: Antarmuka yang bersih, notifikasi toast modern, dan dialog konfirmasi yang ramah pengguna.

🛠️ Teknologi yang Digunakan

Frontend: React + Vite + JavaScript (ES6)

Styling: Tailwind CSS

Peta: Leaflet.js & React-Leaflet

Notifikasi: React-Toastify & Notiflix

Persiapan Awal

Sebelum memulai, pastikan perangkat lunak berikut sudah terinstal di sistem Anda:

Node.js: Pastikan Anda memiliki versi LTS (Long Term Support) terbaru. Node.js akan secara otomatis menginstal npm (Node Package Manager). Unduh di nodejs.org.

Git: Diperlukan untuk mengkloning repositori. Unduh di git-scm.com.

📦 Instalasi

Clone repository ini:
git clone [https://github.com/luckydxd/contact-mountoya](https://github.com/luckydxd/contact-mountoya)
cd contact-mountoya

Instal semua dependensi:

npm install


Menjalankan Aplikasi

Setelah semua dependensi terinstal, aplikasi siap dijalankan di lingkungan development:

Di dalam direktori proyek, jalankan perintah ini:

npm run dev


Terminal akan menampilkan alamat lokal tempat aplikasi berjalan, biasanya seperti ini:

VITE vX.X.X ready in XXXms

➜ Local: http://localhost:5173/
➜ Network: use --host to expose
