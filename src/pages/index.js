import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // anggap state ini nyimpen data yang di kirim dari API
  const [miaw, setMiaw] = useState(true);
  const [isMobile, setIsMobile] = useState({
    width: 0,
    height: 0,
    mobile: false,
  });
  /** useState : hooks react untuk membuat state ke functional component
   * state : variabel yang dipake buat nyimpen data
   * data : state yang nyimpen nilai awal data
   * setData : fungsi untuk memperbarui nilai data
   * true (boolean) : tipe data dari nilai awal state data
   * ketika setData dipanggil dengan nilai baru, react akan merender ulang komponen dengan nilai state yang baru
   */

  // fungsi untuk memperbarui nilai state
  const handleChange = () => {
    // mengubah state data dari nilai awal true menjadi false
    // setData(false);

    // fungsi yang akan merubah nilai boolean dari true ke false dan sebeliknya seterusnya
    setMiaw((prevState) => !prevState);
  };

  useEffect(() => {
    // Mounting
    setIsMobile({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: false,
    });

    // Updating
    window.addEventListener("resize", (event) => {
      setIsMobile({
        width: event.target.innerWidth,
        height: event.target.innerHeight,
        mobile: window.innerWidth < 450 ? true : false,
      });
    });

    // Unmounting
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [isMobile.mobile]);
  /** UseEffect : hooks di react buat nambahin side effect ke state
   * UseEffect biasanya dipakai untuk memperbarui data/komponen ketika ada perubahan pada state
   * [] (array kosong/dependensi array : jika array kosong maka argumen tsb untuk menjalankan UseEffect
   * sekali,  jika ada state didalam array tsb maka untuk memantau setiap ada perubahan pada state tsb)
   */
  console.log(isMobile.width);
  console.log(isMobile.mobile);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen gap-4 ${
          miaw
            ? "transition-all ease-in bg-black"
            : "transition-all ease-in bg-white"
        }`}
      >
        {miaw ? (
          <h1 className="text-6xl font-bold text-white">Miaw</h1>
        ) : (
          <h1 className="text-6xl font-bold text-black">Miaw Miaw</h1>
        )}
        {isMobile.mobile && <p>MOBILE</p>}
        <button
          onClick={handleChange}
          className="mt-4 p-4 bg-blue-500 text-white font-bold rounded"
        >
          Change
        </button>
      </div>
    </>
  );
}

// export default function Home() {
//   // Anggap ini data dari API
//   const data = {
//     text: "Klik Aku!",
//   };

//   return (
//     <>
//     <div className="flex justify-center items-center h-screen gap-4">
//       {/* Button Biasa */}
//       <button className="h-10 px-6 font-semibold bg-blue-500 hover:bg-blue-700 text-white">Click Me!</button>
//       {/* Button dengan basis komponen */}
//       {/* <Button /> */}
//       {/* Button dengan props */}
//       {/* <ButtonWithProps text={data.text} className="bg-red-500 hover:bg-red-700"/>
//       <Card cardClassname={"p-4 border"}>
//         <Image src={"/next.svg"} alt="NextJS Logo" width={300} height={300} />
//         <h2 className="text-xl font-bold my-3">Card Title</h2>
//         <p className="mb-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, hic.</p>
//         <ButtonWithProps text={"Test"} className="bg-yellow-500 hover:bg-yellow-700 w-full"/>
//       </Card> */}
//     </div>
//     </>
//   );
// }
