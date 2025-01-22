import Image from "next/image"

export default function Home() {
  // Anggap ini data dari API
  const data = {
    text: "Klik Aku!",
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen gap-4">
      {/* Button Biasa */}
      <button className="h-10 px-6 font-semibold bg-blue-500 hover:bg-blue-700 text-white">Click Me!</button>
      {/* Button dengan basis komponen */}
      {/* <Button /> */}
      {/* Button dengan props */}
      {/* <ButtonWithProps text={data.text} className="bg-red-500 hover:bg-red-700"/>
      <Card cardClassname={"p-4 border"}>
        <Image src={"/next.svg"} alt="NextJS Logo" width={300} height={300} />
        <h2 className="text-xl font-bold my-3">Card Title</h2>
        <p className="mb-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, hic.</p>
        <ButtonWithProps text={"Test"} className="bg-yellow-500 hover:bg-yellow-700 w-full"/>
      </Card> */}
    </div>
    </>
  );
}
