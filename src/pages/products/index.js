import Button from '@/components/atoms/Button';
import CardProduct from '@/components/molecules/CardProduct'
import React, { useEffect, useState } from 'react'

// Anggap data dari API/BE
const data =[
    {
    id: 1,
    image: "/odeng.jpg",
    title: "Odeng Pedes",
    description: "Enak, mantep banget pedes no minus kuah kentel gabisa ditelen",
    price: 12500
    },
    {
    id: 2,
    image: "/odeng.jpg",
    title: "Odeng Ga Pedes",
    description: "Enak, mantep banget ga pedes no minus kuah kentel gabisa ditelen",
    price: 12500
    },
    {
    id: 3,
    image: "/odeng.jpg",
    title: "Odeng Manis",
    description: "Enak, mantep banget manis no minus kuah kentel gabisa ditelen",
    price: 12500
    },
]

const ProductPage = () => {
    const [username, setUsername] = useState("");
    // Sebutan variable di react

    // useEffect buat nanganin side effect.efek dari perubahan suatu data yang dijalankan tiap kali halaman load
    useEffect(() => {
        const getUsername = localStorage.getItem("username")
        if(getUsername){
            setUsername(getUsername);
        }
    }, []); /** [] Dependensi array : kalo kosong buat mastiin kalo useEffect dijalanin cuma sekali setiap kali halaman load
    * kalo ada state didalam dependensi array maka fungsinya untuk mantau perubahan di state tsb
    */

    // Event handler untuk menjalankan fungsi logout dna ngapus data username & password dari localStorage
    function handleLogout(){
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        window.location.href = "/login"
    }

    return (
    <>
    <div className="flex justify-between items-center bg-black text-white font-bold px-5 py-4">
        <h1 className="text-xl">
            Hi, {username}
        </h1>
        <Button buttonClassname={"bg-red-500 hover:bg-red-700"} onClick={handleLogout}>Logout</Button>
    </div>

    <div className="flex justify-center items-center min-h-screen gap-2 px-10">
        {/* Nested Component */}
        <CardProduct>
            <CardProduct.Header image={"/images/odeng.jpg"}/>
            <CardProduct.Body
            title={"Odeng"}
            desc={"ENAAAAAAAAAAAAAAK, MANTEP, m, PEDES BANGET"}
            />
            <CardProduct.Footer price={"1000000"}/>
        </CardProduct>

        {/* Rendering List : teknis untuk nampilin beberapa elemen UI tertentu berdasarkan data dinamis yang 
        di simpan dalam sebuah JSON */}
        {data.map((item) => (
            <CardProduct key={item.id}>
                <CardProduct.Header image={item.image}/>
                <CardProduct.Body title={item.title} desc={item.description}/>
                <CardProduct.Footer price={item.price} />
            </CardProduct>
        ))}
    </div>
    </>
  )
}

export default ProductPage