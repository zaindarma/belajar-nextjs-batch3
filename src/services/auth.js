import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = process.env.NEXT_PUBLIC_API;

export const login = async (payload) => {
  try {
    const response = await axios.post(`${API}/auth/login`, payload);

    return { status: true, token: response.data.token };
  } catch (error) {
    console.log("Login failed : ", error);
    return { status: false, error };
  }
};

export function getCurrentUser(token) {
  const decoded = jwtDecode(token);
  return decoded.user;
}
