import { isMobileScreenAtom } from "@/atoms/atoms";
import {
  setIsLargeScreen,
  setIsMobileScreen,
} from "@/redux/screenSlice/screenSlice";
import store from "@/redux/store";
import "@/styles/globals.css";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  // useAtom buat perbarui nilai state
  const setIsMobileScreenAtom = useSetAtom(isMobileScreenAtom);

  useEffect(() => {
    function handleResize() {
      // dispatch: untuk mengirim aksi yang memicu pembaruan nilai state
      store.dispatch(setIsMobileScreen(window.innerWidth < 768));
      store.dispatch(setIsLargeScreen(window.innerWidth >= 1240));
      setIsMobileScreenAtom(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

/** file ini dibuat oleh nextjs
 * fungsinya untuk menerapkan prilaku/elemen global yang dibutuhkan semua halaman/aplikasi nextjs
 * 1. untuk mengatur layout global
 * 2. untuk mengelola state global
 * 3. menggunakan css global yang berlaku disemua halaman
 */
