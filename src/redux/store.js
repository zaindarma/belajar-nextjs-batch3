import { configureStore } from "@reduxjs/toolkit";
import screenSlice from "./screenSlice/screenSlice";

/**
 * store : objek yang menyimpan semua state aplikasi
 * dan menyediakan method untuk dispacth(mengirim) action dan mengakses state
 */

export const store = configureStore({
  reducer: {
    // panggil reducer-reducer yang sudah dibuat
    screen: screenSlice,
  },
});

export default store;
