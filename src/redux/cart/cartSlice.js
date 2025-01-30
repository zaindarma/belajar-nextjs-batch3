import { createSlice } from "@reduxjs/toolkit";

/** createSlice : fungsi untuk bikin slice dari reduv store yang berisi reducer dan action
 * yang merupakan bagian dari state
 */
const cartSlice = createSlice({
  name: "cart", // nama slice
  // initialState : nilai awal state
  initialState: {
    data:
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("cart"))) ||
      [],
  },
  // reducer & action untuk memperbarui nilai state.data yang dikirim dari action.payload
  reducers: {
    addToCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addToCart } = cartSlice.actions; // Export action biar bisa dipake

export default cartSlice.reducer; // Export reducer biar bisa di simpen ke dalam store
