import Button from '@/components/atoms/Button'
import InputForm from '@/components/molecules/InputForm'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <form>
        <InputForm label="Username" name="username" type="text" placeholder="Masukkan Username" />
        <InputForm label="Email" name="email" type="text" placeholder="Masukkan Email" />
        <InputForm label="Password" name="password" type="password" placeholder="Masukkan Password " />
        <Button buttonClassname="bg-gradient-hover text-white w-full mt-4">Register</Button>
        <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:text-blue-700" href="/login">
            Login Here
            </Link>
        </p>
    </form>
  )
}

export default Register