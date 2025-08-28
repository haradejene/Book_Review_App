import React from "react";
import Header from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { Irish_Grover } from "next/font/google";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <>
    <Header />
    <section className= "flex flex-row">
    <section>
   <div className={`m-6 ${irishgroverFont.className} pt-[149px] pl-[34px] w-[670px] h-[116px]`}>
   <h1 className="text-5xl text-white font-light ">Your Library of Opinions—<br></br>Find What’s Worth Reading.</h1>
    </div>
    <div className="pt-[100px] pl-[50px] w-[547px] h-[87px]">
      <h1 className="text-white">Think of this as your personal book club without the awkward small talk. Scroll through opinions, uncover hidden gems, and maybe even spark a debate or two over which book deserves the hype. </h1>
   </div>
    <div className="flex flex-row gap-16 pt-[120px] pl-[60px]" >
    <div>
      <div className="flex flex-row">
      <img src="/icons/2k+.svg" className="w-[34px] h-[34px]"/>
      <img src="/icons/tabler_books.svg" className="w-[34px] h-[34px]"/></div>
      <h1 className="text-white">Book Collections</h1>
    </div>
    <div>
     <div className="flex flex-row">
      <img src="/icons/4k+.svg" className="w-[34px] h-[34px]"/>
      <img src="/icons/uil_book-reader.svg" className="w-[34px] h-[34px]" /></div>
      <h1 className="text-white">Reader Reviews</h1>
    </div>
    </div>
     <div className="pl-[40px]">
      <button className={`m-6 ${irishgroverFont.className} w-[309px] h-[66px] bg-white/10 text-white rounded-lg flex items-center justify-center text-lg`}>
         Discover Books </button>
      </div>
     </section>
    <section className="pt-[149px] pr-[34px] w-[670px]">
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
        {/* Placeholder book cards */}
        {[...Array(10)].map((_, idx) => (
          <div
            key={idx}
            className="flex-none w-[300px] h-[400px] bg-white/10 rounded-lg p-4 text-white snap-start"
          >
            <div className="w-full h-[300px] bg-white/25 rounded mb-2"></div>
            <h3 className="text-lg font-semibold">Book Title {idx + 1}</h3>
            <p className="text-sm text-gray-300">Author Name</p>
          </div>
        ))}
      </div>
    </section>
    </section>
     <div className="pt-[150px] pl-[900px] h-[30px]">


    <form className=" pt-[150px]h-[30px] w-[450px]  rounded-[10px] bg-white text-black flex pl-4 shadow-lg " method="post">

    <input className="flex-1 h-full rounded-[10px] outline-none px-2" type="text" placeholder="Search books..." />
    <button className="pr-4">
      <img src="/icons/Vector.svg"/>
    </button>
    </form>
    </div>
    <Footer />
    </>
  );
}
