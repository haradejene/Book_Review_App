"use client";
import React, { useState, useEffect } from "react";
import { mockBooks } from "@/lib/mockData";

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

export default function ShelveList() {
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
      <section className="pl-[200px] pt-[100px]">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="w-[985px] h-[62px] bg-[#461356] flex justify-between items-center px-6 py-4 rounded-lg">
            <h1 className="text-white">Shelf</h1>
            <h1 className="text-white">Genre</h1>
            <h1 className="text-white">Overall Review</h1>
          </div>

          {/* Scrollable container for books */}
          <div className="flex flex-col gap-4 h-[330px] overflow-y-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="w-[985px] h-[153px] bg-white shadow-lg rounded-lg flex items-center p-4"
              >
                {/* Left: Cover + Info */}
                <div className="flex items-center gap-4 w-80">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-lg font-bold">{book.title}</h2>
                    <p className="text-gray-700">{book.author}</p>
                    <p className="text-gray-600">{book.publishedYear}</p>
                  </div>
                </div>

                {/* Middle: Genre */}
                <div className="font-bold text-center pl-[70px]  min-w-[100px]">{book.genre}</div>

                {/* Right: Icon + number */}
                <div className="flex items-center pl-[250px] gap-2">
                  <img
                    src="/Frame 6.svg"
                    alt="icon"
                    className="w-30 h-15 object-contain"
                  />
                  <h1 className="font-bold underline text-lg">4</h1>
                  <img
                    src="/icons/mdi_trash.svg"
                    alt="icon"
                    className=" object-contain pl-[20px] "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pl-[200px] pt-[100px]">
          <div className="w-[985px] h-[500px] bg-[#461356]/25">
            <div className="relative z-10">
             <h1 className="font-bold m-5">Review History</h1>
             {/* Scrollable container for books */}
          <div className="flex flex-col gap-4 h-[350px] overflow-y-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex justify-between items-center m-5 h-[200px] w-[930px] border-b border-black"
              >
                {/* Left: Cover + Info */}
                <div className="flex items-center flex-col gap-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-sm font-extralight">{book.title}</h2>
                    <div className="flex items-center gap-2">
                  <img
                    src="/Frame 6.svg"
                    alt="icon"
                    className="w-30 h-15 object-contain"
                  />
                  <h1 className="font-bold underline text-lg">4</h1>
                </div>
                  </div>
                </div>

                {/* Middle: Genre */}
                <div className="font-bold text-center min-w-[100px]">{book.genre}</div>

                {/* Right: Icon */}
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/mdi_trash.svg"
                    alt="icon"
                    className=" object-contain "
                  />
    
                </div>
              </div>
            ))}
          </div>

             </div> 
          </div>
      </section>
    </>
  );
}
