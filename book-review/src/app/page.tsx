import Image from "next/image";
import {Irish_Grover} from "next/font/google";
 
const irishgroverFont = Irish_Grover({subsets: ['latin'], weight:'400',})
export default function Home() {
  return (
    <>
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
    

    </>
  )
}
