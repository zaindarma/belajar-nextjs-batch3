import Button from "@/components/atoms/Button";
import InputForm from "@/components/molecules/InputForm";
import { login } from "@/services/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/compat/router";
import React, { useState } from "react";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const router = useRouter();
  // Event handler untuk simulasi login
  async function handleLogin(event) {
    // event.preventDefault() : buat mencegah halaman refresh
    event.preventDefault();

    // Simpan data dari input ke local storage
    // localStorage.setItem("username", event.target.username.value);
    // localStorage.setItem("password", event.target.password.value);

    // Redirect ke halaman produk
    // window.location.href = "/products";
    const payload = {
      username: event.target.username.value, //johnd
      password: event.target.password.value, //m38rmF$
    };

    try {
      const res = await login(payload);
      if (res.status) {
        localStorage.setItem("token", res.token);
        router.push("/products");
      } else {
        console.log("Login error", res.error.response.data);
        setErrorLogin(res.error.response.data);
      }
    } catch (error) {
      console.log("Login Failed : ", error);
      setErrorLogin(error);
    }
  }

  return (
    // onSubmit : event handler yang menangani aksi form ketika di submit(buttton = submit)
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="Masukkan Username"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Masukkan Password "
      />
      <Button
        // onClick={handleLogin} // onClick : event handler buat menangani aksi ketika button di klik
        buttonClassname="bg-gradient-hover text-white w-full mt-4"
        type="submit"
      >
        Login
      </Button>
      {errorLogin && (
        <p className="mt-4 text-center text-sm text-red-500">{errorLogin}</p>
      )}
    </form>
  );
};

export default Login;
