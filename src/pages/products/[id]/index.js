import { formatCurrency } from "@/helpers/util/formatCurrency";
import { getProductsById } from "@/services/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const ProductDetailPage = ({ detailProduct }) => {
  console.log(detailProduct);

  return (
    <>
      <div className="flex flex-col px-5 py-5 bg-gradient-to-b from-black to-blue-900 min-h-screen items-center">
        <h1 className="text-4xl font-bold text-white">Detail Produk</h1>
        <div className="pt-4 mt-5 rounded-2xl bg-white bg-opacity-20 max-w-xl p-5 flex flex-col items-center">
          <Image
            src={detailProduct.image}
            alt=""
            width={150}
            height={150}
            className="rounded-lg shadow-black"
          />
          <h2 className="text-2xl font-bold text-white">
            {detailProduct?.title}
          </h2>
          <p className="text-white font-semibold mt-5">
            {detailProduct.description}
          </p>
          <p className="text-white font-semibold mt-5">
            {formatCurrency(detailProduct.price, "en-US", "USD")}
          </p>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const detailProduct = await getProductsById(id);

    if (!detailProduct) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        detailProduct,
      },
    };
  } catch (error) {
    console.log(error);

    // Cara kedua 404 handling di level catch

    // 500 Page
    return {
      props: {
        error,
      },
    };
  }
}

export default ProductDetailPage;
