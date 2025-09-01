"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { Irish_Grover } from "next/font/google";
import { mockBooks } from "@/lib/mockData";
import Link from "next/link";
import Books from "../components/books/BookDetails";
import Book from "../components/books/BookCard";

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

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

export default function Home() {
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

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#8D27AE] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_0%,transparent_70%)]"></div>

        <div className="relative z-10">
          <Header />

          <section className="flex flex-row py-8">
            <section className="flex-1">
              <div className={`m-6 ${irishgroverFont.className} pt-[149px] pl-[34px] w-[670px] h-[116px]`}>
                <h1 className="text-5xl text-white font-light">
                  Your Library of Opinions—<br />Find What's Worth Reading.
                </h1>
              </div>
              <div className="pt-[100px] pl-[50px] w-[547px] h-[87px]">
                <h1 className="text-white">
                  Think of this as your personal book club without the awkward small talk. Scroll through opinions, uncover hidden gems, and maybe even spark a debate or two over which book deserves the hype.
                </h1>
              </div>
              <div className="flex flex-row gap-16 pt-[120px] pl-[60px]">
                <div>
                  <div className="flex flex-row">
                    <img src="/icons/2k+.svg" className="w-[34px] h-[34px]" alt="2k+ icon" />
                    <img src="/icons/tabler_books.svg" className="w-[34px] h-[34px]" alt="books icon" />
                  </div>
                  <h1 className="text-white">Book Collections</h1>
                </div>
                <div>
                  <div className="flex flex-row">
                    <img src="/icons/4k+.svg" className="w-[34px] h-[34px]" alt="4k+ icon" />
                    <img src="/icons/uil_book-reader.svg" className="w-[34px] h-[34px]" alt="reader icon" />
                  </div>
                  <h1 className="text-white">Reader Reviews</h1>
                </div>
              </div>
              <div className="pl-[40px] pt-6">
                <Link href="/books">
                  <button className={`${irishgroverFont.className} w-[309px] h-[66px] bg-white/10 text-white rounded-lg flex items-center justify-center text-lg`}>
                    Discover Books
                  </button>
                </Link>
              </div>
            </section>

            {/* Books Section inside Hero */}
            <section className="flex-1 pt-[149px] pr-[34px]">
              <div className="flex space-x-4 overflow-x-auto pb-4 px-4 gap-10 ml-2 max-w-[800px]">
                {Array(5)
                  .fill(mockBooks)
                  .flat()
                  .map((book, index) => (
                    <div
                      key={`${book.id}-${index}`}
                      className="flex-none w-[300px] snap-start flex flex-col items-center"
                    >
                      <div
                        className="w-[300px] h-[400px] rounded-[25px] transition-shadow duration-300 hover:shadow-[0_0_20px_#601A76] bg-center bg-cover m-4"
                        style={{ backgroundImage: `url(${book.coverUrl})` }}
                      ></div>
                    </div>
                  ))}
              </div>
            </section>
          </section>
        </div>
      </section>

      {/* Books / BookDetails Components outside Hero */}
      <div className="pt-16 px-8">
        <Books />
        <Book />
      </div>

      <Footer />
    </div>
  );
}
