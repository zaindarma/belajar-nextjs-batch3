import { getCurrentUser } from "@/services/auth";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Validasi token, cek kalo ga ada token balikin ke login
    if (token) {
      setUsername(getCurrentUser(token));
    } else {
      router.push("/login");
    }
  }, []);

  return username;
};
