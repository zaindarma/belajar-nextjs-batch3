import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { data } from "@/constant/products";
import DoubleArrowUp from "@/components/atoms/icons/DoubleArrowUp";
import { getProducts } from "@/services/products";
import { useRouter } from "next/router";
import { useLogin } from "@/hooks/useLogin";
import { formatCurrency } from "@/helpers/util/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "@/redux/screenSlice/screenSlice";
import { getCurrentUser } from "@/services/auth";

///anggap data dari api/be

const ProductPage = ({ data }) => {
  const [cart, setCart] = useState([]); // <- direplace sama redux
  const [total, setTotal] = useState(0); // kita tidak menggunakan state ini lagi karna kita sudah menggunakan useMemo
  // useRef : hooks yang digunakan untuk referensi ke elemen DOM/fungsi untuk mengakses elemen DOM
  const [showBackToTop, setShowBackToTop] = useState(false);
  // const [data, setData] = useState([]); //SSR tidak perlu state ini

  const footerRef = useRef();
  const router = useRouter();
  // const username = useLogin();

  const dispacth = useDispatch(); //mengirim perubahan ke state global
  const { isLargeScreen, username } = useSelector((state) => state.screen);
  console.log(isLargeScreen);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // validasi token, untuk mengecek apakah ada token, jika tidak ada kembali ke login
    if (token) {
      dispacth(setUsername(getCurrentUser(token)));
    } else {
      router.push("/login");
    }
  }, []);

  // useEffect digunakan untul menangani side efek dari perubahan suatu data yang dijalankan setiap halaman di load
  useEffect(() => {
    // ambil data dari localstorage lalu parsing, tambahkan logic agar maping tidak error
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);
  /** [] dependensi array : kalo kosong buat memastikan kalo useEffect dijalankan
   * hanya sekali saat pertama kali halaman di load,
   * jika ada state didalam dependensi array maka fungsinya untuk menangani perubahan state tersebut
   */

  // fungsi untuk menambahkan product ke cart
  const handlerAddToCart = (id) => {
    // logic untuk mengecek kalau di product terdapat id yang sama maka qty akan ditambahkan 1
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // kalau fungsi hanya sekali ditrigger maka hanya akan menambahkan 1 product saja ke cart
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  /** UseCallback: hooks untuk menyimpan fungsi yang kompleks ke dalam cache
   * tujuannya biar fungsi tersebut tidak perlu dijalankan ulang ketika tidak ada perubahan
   */

  // useMemo : hooks untuk menyimpan hasil komputasi(perhitaungan) yang kompleks ke dalam cache,
  // tujuannya biar fungsi tsb ga perlu dijalankan/dihitung ulang ketika tidak ada perubahan
  const calculateTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const product = data.find((product) => product.id === item.id);
      return total + product?.price * item.qty;
    }, 0);
  }, [cart, data]);

  // panggil fungsi useCallback untuk mendapatkan nilai total
  const cartTotal = calculateTotal();

  useEffect(() => {
    if (cart.length > 0) {
      // const sumTotal = cart.reduce((total, item) => {
      //   const product = data.find((product) => product.id === item.id);
      //   return total + product.price * item.qty;
      // }, 0);
      // setTotal(sumTotal);

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // event handler untuk menjalankan fungsi logout dan mengapus data di local storage
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    router.push("/login");
  }

  useEffect(() => {
    function handleScroll() {
      // mengambil nilai offsetTop(posisi vertikal) dari elemen footer yang direferennsikan oleh footerRef
      const footerTop = footerRef.current.offsetTop; //mengambil batas atas komponen

      // mengambil tinggi innerHeight dari objek window(tinggi viewport tanpa toolbar & scrollbar)
      const viewportHeight = window.innerHeight;

      const scrollPosition = window.scrollY; // mengambil posisi vertikal saat ini dari scroll

      // logic untuk mengecek apakah posisi scroll telah mencapai elemen footer
      if (scrollPosition + viewportHeight >= footerTop) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }

    // event listener buat menjalankan fungsi handleScroll setiap event scroll terjadi
    window.addEventListener("scroll", handleScroll);

    // unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [footerRef]);

  function handleBackToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <div className="flex justify-between items-center bg-black text-white font-bold px-5 py-4">
        <h1 className="text-xl">Hi, {username}</h1>
        {isLargeScreen ? (
          <p className="text-white">Desktop</p>
        ) : (
          <p className="text-white">Mobile</p>
        )}
        <Button
          buttonClassname={"bg-red-500 hover:bg-red-700"}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="flex px-5 py-8 gap-4">
        {/* products */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-blue-500 uppercase mb-4">
            Products
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
              <CardProduct key={item?.id}>
                <CardProduct.Header image={item?.image} />
                <CardProduct.Body
                  title={item?.title}
                  desc={item?.description}
                />
                <CardProduct.Footer
                  price={item?.price}
                  handleAddToCart={handlerAddToCart}
                  id={item?.id}
                />
              </CardProduct>
            ))}
          </div>
        </div>

        {/* cart */}
        {(cart?.length > 0 && (
          <div className="w-1/3">
            <h1 className="text-3xl font-bold text-blue-500 mb-4 uppercase">
              Cart
            </h1>
            <div className="flex flex-col gap-2">
              {cart.map((item) => {
                const datas = data.find((data) => data.id === item.id);
                return (
                  <div key={item} className="flex p-4 border rounded-lg">
                    <Image
                      className="rounded object-cover object-center"
                      width={100}
                      height={100}
                      src={datas?.image}
                      alt="cart image"
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl">
                          {datas?.title}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(datas?.price)}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <span className="mb-1">Qty</span>
                        <span className="flex justify-center items-center font-semibold p-2 border rounded-sm text-center w-10 h-10">
                          {item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between px-4 py-2 border mt-2 font-semibold rounded-lg">
              <span>Total</span>
              <span> {formatCurrency(cartTotal)}</span>
            </div>
          </div>
        )) || <div></div>}
      </div>

      {/* footer */}
      {showBackToTop && (
        <div
          onClick={handleBackToTop}
          className="fixed bottom-20 right-5 bg-gradient-hover p-2 rounded-full"
        >
          <DoubleArrowUp />
        </div>
      )}
      <footer
        ref={footerRef}
        className="text-center p-5 bg-black text-white w-full"
      >
        All right reserved &copy; || by Ridho
      </footer>
    </>
  );
};

/**
 * ISR (Incremental static  regeneration) : teknik menggabungkan SSR dan SSG,
 * dimana halaman akan ditampilkan secara statis namun datanya bisa diupdate secara dinamis
 * jika ada perubahan data
 */
export async function getStaticProps() {
  try {
    // Cara pertama untuk pemanggilan API
    // const products = await getProducts();

    // Cara kedua jika mau manggil beberapa service sekaligus menggunakan promise
    const [products] = await Promise.all([getProducts()]);
    const sliceProduct = products.slice(0, 8);

    return {
      props: {
        data: sliceProduct || [],
      },
      revalidate: 60, // <-- fungsi untuk merefresh/mengupdate data setelah 60 detik
    };
  } catch (error) {
    console.log("Failed fatching : ", error);
  }
}

export default ProductPage;
