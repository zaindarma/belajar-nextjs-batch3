// Import library axios untuk bikin request HTTP
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

// Fungsi buat ambil semua data produk dari fake API
export const getProducts = async () => {
  // Jalanin di dalam blok tryCatch
  try {
    // Request GET ke url
    const response = await axios.get(`${API}/products`);

    // Kembaliin data produk yang di simpan dalam response
    return response.data;
  } catch (error) {
    // Error handling
    throw new Error("Failed to fetch data : ", error);
  }
};

export const getProductsById = async (id) => {
  try {
    const res = await axios.get(`${API}/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data : ", error);
  }
};
