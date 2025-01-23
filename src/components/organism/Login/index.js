import Button from '@/components/atoms/Button'
import InputForm from '@/components/molecules/InputForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <form>
        <InputForm label="Username" name="username" type="text" placeholder="Masukkan Username" />
        <InputForm label="Password" name="password" type="password" placeholder="Masukkan Password " />
        <Button buttonClassname="bg-gradient-hover text-white w-full mt-4">Login</Button>
    </form>
  )
}

export default Login