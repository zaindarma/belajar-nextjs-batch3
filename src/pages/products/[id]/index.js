import { formatCurrency } from "@/helpers/util/formatCurrency";
import { getProductsById } from "@/services/products";
import axios from "axios";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

/** useSWR(Stale While Revalidate) : hooks third party dari tim vercel untuk fetching data, caching dan revalidate di sisi klien
 * rumus : const { data, error, isLoading, isValidating } = useSWR(key(endpoint), dataFetcher)
 * SWR punya beberapa properti
 * Data : data yang di ambil dari API
 * Error : error handling saat ambil data
 * isLoading : status loading
 * isValidating : status validasi ulang data(perbarui data)
 */
const ProductDetailPage = ({ detailProduct }) => {
  const API = process.env.NEXT_PUBLIC_API;

  const { data } = useSWR(
    `${API}/products/${detailProduct}`,
    async () => {
      const res = await axios.get(`${API}/products/${detailProduct?.id}`);
      return res.data;
    },
    {
      initialData: detailProduct,
    }
  );

  return (
    <>
      <div className="flex flex-col px-5 py-5 bg-gradient-to-b from-black to-blue-900 min-h-screen items-center">
        <h1 className="text-4xl font-bold text-white">Detail Produk</h1>
        <div className="pt-4 mt-5 rounded-2xl bg-white bg-opacity-20 max-w-xl p-5 flex flex-col items-center">
          <Image
            src={data?.image}
            alt=""
            width={150}
            height={150}
            className="rounded-lg shadow-black"
          />
          <h2 className="text-2xl font-bold text-white">{data?.title}</h2>
          <p className="text-white font-semibold mt-5">{data?.description}</p>
          <p className="text-white font-semibold mt-5">
            {formatCurrency(data?.price, "en-US", "USD")}
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
