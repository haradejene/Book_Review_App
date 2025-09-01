"use client";
import React, { useState, useEffect } from "react";
import { Irish_Grover } from "next/font/google";
import { mockBooks } from "../../lib/mockData";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter books by search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-row">
        <h1
          className={`${irishgroverFont.className} text-[#601A76] text-[48px] pb-4 m-2`}
        >
          Books
        </h1>
        <div className="pb-4 m-2 pl-[700px] pt-4 h-[30px]">
          <form
            className="w-[450px] rounded-[10px] bg-white text-black flex pl-4 shadow-lg"
            onSubmit={(e) => e.preventDefault()} // prevent reload
          >
            <input
              className="flex-1 h-full rounded-[10px] outline-none px-2"
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="pr-4" type="submit">
              <img src="/icons/Vector.svg" alt="search" />
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-20 gap-x-60 p-8 w-[1200px] h-[700px] ml-10">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg overflow-visible group hover:shadow-2xl transition duration-300"
            >
              {/* Main card content */}
              <div className="flex flex-col md:flex-row">
                {/* Book Cover */}
                <div
                  className="w-[90px] h-[130px] bg-cover bg-center mt-4 ml-4 rounded-md shadow-md"
                  style={{ backgroundImage: `url(${book.coverUrl})` }}
                ></div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl  text-[#601A76]">
                      <span className="font-bold">Title:</span> {book.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      <span className="font-bold">Author:</span>{" "}
                      {book.author}
                    </p>
                    <p className="mt-2 text-gray-700 text-sm line-clamp-4">
                      <span className="font-bold">Description:</span>{" "}
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini card sliding out UNDER the main card */}
              <div className="absolute left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-[#f9f9f9] rounded-xl shadow-md w-full p-4">
                  <div className="flex justify-between items-center">
                    <img
                      src="/Frame 6.svg"
                      alt={book.title}
                      className="w-30 h-15"
                    />
                    <h1 className="font-bold underline">4</h1>
                    <p className="text-sm">1289 ratings • 714 Reviews</p>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="bg-[#8D27AE] text-white px-4 py-1 rounded-full text-sm shadow hover:bg-[#6b1d8e] transition">
                      Add to Shelf
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-300 transition">
                      Rate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-2">No books found.</p>
        )}
      </div>
    </>
  );
}
