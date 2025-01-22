import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

/** File _app.js dibuat otomatis oleh NextJS
 * fungsinya buat menerapkan perilaku/elemen global yang di butuhin semua halaman/aplikasi NextJS
 * 1. Untuk ngatur layout global
 * 2. Untuk mengelola state global
 * 3. Menggunakan CSS Global yang berlaku disemua halaman
 */