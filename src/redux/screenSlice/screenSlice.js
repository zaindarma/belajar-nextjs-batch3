import { createSlice } from "@reduxjs/toolkit";

/**
 * createSlice : fungsi untuk membuat slice dari reduc store yang berisi reducer dan action
 * yang merupakan bagian dari state
 */

const screenSlice = createSlice({
  name: "screen", // nama slice ini
  initialState: {
    isMobileScreen: false,
    isLargeScreen: false,
    username: "",
  },
  // reducer: objek yang berisi kumpulan reducer yang akan dipakai untuk mengubah state slice
  reducers: {
    // setIsMobileScreen : nama reducer
    setIsMobileScreen: (state, action) => {
      // untuk mengubah atau memperbaharui nilai state isMobileScreen menjadi nilai yang dikirim dari action.payload
      state.isMobileScreen = action.payload;
    },
    setIsLargeScreen: (state, action) => {
      state.isLargeScreen = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// ekspor action creator yang bernama setIsMobileScreen dari slice screenSlice untuk mengirim action ke
// store redux dan memicu perubahan state
export const { setIsMobileScreen, setIsLargeScreen, setUsername } =
  screenSlice.actions;

export default screenSlice.reducer; // ekspor reducer supaya bisa disimpan di dalam store
