import CardProduct from '@/components/molecules/CardProduct'
import React from 'react'

const ProductPage = () => {
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

  return (
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
  )
}

export default ProductPage