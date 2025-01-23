import Button from '@/components/atoms/Button'
import InputForm from '@/components/molecules/InputForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Login = (event) => {
  // Event handler untuk simulasi login
  function handleLogin(event) {
  // event.preventDefault() : buat mencegah halaman refresh
  event.preventDefault();

  // Simpan data dari input ke local storage
  localStorage.setItem("username", event.target.username.value);
  localStorage.setItem("password", event.target.password.value);
  
  // Redirect ke halaman produk
  window.location.href = "/products";
  };

  return (
    // onSubmit : event handler yang menangani aksi form ketika di submit(buttton = submit)
    <form onSubmit={handleLogin}>
        <InputForm label="Username" name="username" type="text" placeholder="Masukkan Username" />
        <InputForm label="Password" name="password" type="password" placeholder="Masukkan Password " />
        <Button
        // onClick={handleLogin} // onClick : event handler buat menangani aksi ketika button di klik
        buttonClassname="bg-gradient-hover text-white w-full mt-4"
        type="submit">
        Login
        </Button>
    </form>
  );
};

export default Login