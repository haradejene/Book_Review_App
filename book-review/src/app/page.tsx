"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { Irish_Grover } from "next/font/google";
import { mockBooks } from "@/lib/mockData";
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
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const bookCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) throw new Error("API failed");
        // Data is fetched but not stored since it's not used in this component
      } catch (err) {
        console.warn("Failed to fetch from API, using mock data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  const scrollToBookCards = () => {
    bookCardsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#8D27AE] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_0%,transparent_70%)]"></div>
        <div className="relative z-10">
          <Header />

          <section className="flex flex-col lg:flex-row py-8">
            {/* Left Section */}
            <section className="flex-1">
              <div
                className={`m-6 ${irishgroverFont.className} pt-[149px] pl-[34px] w-full lg:w-[670px] h-auto lg:h-[116px]`}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light">
                  Your Library of Opinions—
                  <br />
                  Find What&apos;s Worth Reading.
                </h1>
              </div>

              <div className="pt-6 sm:pt-10 lg:pt-[100px] px-4 lg:pl-[50px] w-full lg:w-[547px] h-auto">
                <h1 className="text-white text-base sm:text-lg">
                  Think of this as your personal book club without the awkward
                  small talk. Scroll through opinions, uncover hidden gems, and
                  maybe even spark a debate or two over which book deserves the
                  hype.
                </h1>
              </div>

              <div className="flex flex-row gap-8 sm:gap-12 lg:gap-16 pt-8 sm:pt-12 lg:pt-[120px] px-4 lg:pl-[60px]">
                <div>
                  <div className="flex flex-row">
                    <img
                      src="/icons/2k+.svg"
                      className="w-[34px] h-[34px]"
                      alt="2k+ icon"
                    />
                    <img
                      src="/icons/tabler_books.svg"
                      className="w-[34px] h-[34px]"
                      alt="books icon"
                    />
                  </div>
                  <h1 className="text-white text-sm sm:text-base">Book Collections</h1>
                </div>

                <div>
                  <div className="flex flex-row">
                    <img
                      src="/icons/4k+.svg"
                      className="w-[34px] h-[34px]"
                      alt="4k+ icon"
                    />
                    <img
                      src="/icons/uil_book-reader.svg"
                      className="w-[34px] h-[34px]"
                      alt="reader icon"
                    />
                  </div>
                  <h1 className="text-white text-sm sm:text-base">Reader Reviews</h1>
                </div>
              </div>

              <div className="px-4 lg:pl-[40px] pt-6">
                  <button
                  onClick={scrollToBookCards}
                  className={`${irishgroverFont.className} w-full sm:w-[250px] lg:w-[309px] h-[50px] sm:h-[60px] lg:h-[66px] bg-white/10 text-white rounded-lg flex items-center justify-center text-base sm:text-lg hover:bg-white/20 transition-colors cursor-pointer`}
                  >
                    Discover Books
                  </button>
              </div>
            </section>

            {/* Right Section - Books */}
            <section className="flex-1 pt-10 lg:pt-[149px] px-4 lg:pr-[34px]">
              <div className="flex space-x-4 overflow-x-auto pb-4 px-2 sm:px-4 gap-6 sm:gap-10 ml-0 sm:ml-2 max-w-full lg:max-w-[800px]">
                {Array(5)
                  .fill(mockBooks)
                  .flat()
                  .map((book, index) => (
                    <div
                      key={`${book.id}-${index}`}
                      className="flex-none w-[200px] sm:w-[250px] lg:w-[300px] snap-start flex flex-col items-center"
                    >
                      <div
                        className="w-[200px] sm:w-[250px] lg:w-[300px] h-[280px] sm:h-[350px] lg:h-[400px] rounded-[25px] transition-shadow duration-300 hover:shadow-[0_0_20px_#601A76] bg-center bg-cover m-2 sm:m-4"
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
      <div className="pt-16 px-4 sm:px-8">
        <Books selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div ref={bookCardsRef} data-book-cards>
          <Book selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
