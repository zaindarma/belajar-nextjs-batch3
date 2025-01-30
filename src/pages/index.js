import Button from "@/components/atoms/Button";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  // anggap state ini menyimpann data dari API
  const [data, setData] = useState(true);

  const { isMobileScreen } = useSelector((state) => state.screen);
  console.log("Mobile :", isMobileScreen);

  const username = useLogin();
  /** useState : hooks react untuk membuat state ke functional component
   * state : variabel yang menyimpan data
   * data : state ayng menyimpan nilai awal data
   * setData : fungsi untuk memperbaharui data
   * true (boolean) : tipe data dari nilai awal state data
   * ketika setData dipanggil dengan nilai baru, react akan merender ulang komponen dengan nilai state yang baru
   */

  // fungsi untuk memperbaharui nilai state
  const handleChange = () => {
    // mengubah state data dari nilai awal true menjadi false
    // setData(false);

    // fungsi anonymous yang akan ngerubah nilai boolean menjadi true ke false dan sebaliknya
    setData((darmaData) => !darmaData);
  };

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen gap-3 ${
          data ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {data ? (
          <h1 className="text-5xl font-bold text-white">Data</h1>
        ) : (
          <h1 className="text-5xl font-bold">Update Data</h1>
        )}

        {isMobileScreen ? <p>MOBILE</p> : <p>Desktop</p>}
        <button
          onClick={handleChange}
          type="button"
          className="mt-4 p-4 bg-blue-500 text-white font-bold rounded"
        >
          change
        </button>
        <p className="mt-2">Hi, {username}</p>
      </div>
    </>
  );
}

// contoh data dari API
// const data = {
//   text: "Klik lah!",
// };

// <div className="flex justify-center items-center h-screen gap-2">
//     {/* button biasa */}
//     <button className="h-10 font-semibold bg-blue-600 text-white p-2">
//       CLick me!
//     </button>
//     {/* Button dengan basis komponen single close Tag */}
//     <Button />
//     {/* BUtton dengan props */}
//   </div>
