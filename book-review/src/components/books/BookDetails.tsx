"use client"
import React from "react";
import { Irish_Grover } from "next/font/google";
import {useState, useEffect} from "react";
import { mockBooks } from "@/lib/mockData";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  aboutAuthor: string;
  genre: string;
  publishedYear: number;
}
export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books");
         if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.warn("Failed to fetch from API, using mock data:", err);
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;

  

  return (
    <>
      <section className="bg-white">
        <div className="flex justify-center">
          <div className="flex justify-center flex-col w-[700px] items-center" >
            <h1 className={`${irishgroverFont.className} text-[#601A76] text-[48px] pb-4`}>Treanding This Week</h1>
            <p className="w-[550px] h-[87px] text-center pb-4">Here’s what everyone’s buzzing about this week! From page-turners that keep you up all night to hidden gems you’ll want to tell your friends about, these books are stealing the spotlight right now.</p>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-4 gap-10 ml-2">
  {Array(5)
    .fill(mockBooks)
    .flat()
    .map((book, index) => (
      <div
        key={`${book.id}-${index}`}
        className="flex-none w-[300px] snap-start flex flex-col items-center"
      >
        {/* Book Cover */}
        <div
          className="w-[300px] h-[400px] rounded-[25px] transition-shadow duration-300 hover:shadow-[0_0_20px_#601A76] bg-center bg-cover m-4"
          style={{ backgroundImage: `url(${book.coverUrl})` }}
        ></div>

        {/* Title & Author */}
        <div className="flex flex-col items-center text-center mb-4">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm">{book.author}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className={`${irishgroverFont.className} bg-white text-[#601A76] shadow-lg w-[93px] h-[35px] flex items-center justify-center rounded-[25px]`}>
            Rate
          </button>
          <button className={`${irishgroverFont.className} bg-[#601A76] text-white shadow-lg w-[138px] h-[35px] flex items-center justify-center rounded-[25px]`}>
            Add to shelf
          </button>
        </div>
      </div>
      ))}
       </div>
           </section>
      <section>
  <h1 className={`${irishgroverFont.className} text-[#601A76] text-[48px] pb-4 mt-10 ml-2`}>
    Categories
  </h1>

  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-4 gap-5 ml-2">
    {Array(5)
      .fill(mockBooks)
      .flat()
      .map((book, index) => (
        <div
          key={`${book.id}-${index}`}
  className="relative flex-none w-[244px] h-[113px] snap-start flex flex-col items-center justify-center p-4 rounded-[25px] overflow-hidden "
  
  style={{
    backgroundImage: `url('/Rectangle 36.svg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
 

>
  <div className="absolute inset-0 bg-[#601A76] opacity-50"></div>
          <div className="relative z-10 flex flex-col">
          <p className="text-sm font-semibold text-white">{book.genre}</p>
          <div className="flex gap-1 flex-row">
          <img className="w-[70px] h-[36px]" src="/icons/200+.svg"/>
          <img src="/icons/tabler_books.svg"/>
          </div>

          </div>
        </div>
      ))}
  </div>
</section>

    </>
  );
}