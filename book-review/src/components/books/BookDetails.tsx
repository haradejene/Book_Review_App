"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Irish_Grover } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mockBooks } from "@/lib/mockData";
import { addBookToDefaultShelf, apiUrl, requireAuth } from "@/lib/auth";

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

interface BookDetailsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Books({ selectedCategory, setSelectedCategory }: BookDetailsProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(apiUrl("/api/books"));
        if (!res.ok) throw new Error("API failed");
        const data: Book[] = await res.json();
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

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(""); // clear if same category clicked
    } else {
      setSelectedCategory(category);
    }
  };

  const handleRateClick = (bookId: string) => {
    const token = requireAuth(router.push);
    if (!token) return;
    router.push(`/reviews/${bookId}`);
  };

  const handleAddToShelf = async (bookId: number) => {
    const token = requireAuth(router.push);
    if (!token) return;
    try {
      await addBookToDefaultShelf(bookId);
      alert("Added to shelf");
    } catch (e) {
      console.error(e);
      alert("Failed to add to shelf");
    }
  };

  // extract unique genres for categories
  const genres = useMemo(() => Array.from(new Set(books.map((b) => b.genre))), [books]);

  // Infinite horizontal scroll setup
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const repeatedGenres = useMemo(() => {
    const base = genres.length ? genres : ["Fiction", "Non-fiction", "Mystery", "Fantasy"];
    return [...base, ...base, ...base];
  }, [genres]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const handle = () => {
      const maxScroll = el.scrollWidth / 3; // one segment length
      if (el.scrollLeft <= 0) {
        el.scrollLeft = maxScroll;
      } else if (el.scrollLeft >= maxScroll * 2) {
        el.scrollLeft = maxScroll;
      }
    };
    el.addEventListener("scroll", handle, { passive: true });
    // center on mount
    const maxScroll = el.scrollWidth / 3;
    el.scrollLeft = maxScroll;
    return () => el.removeEventListener("scroll", handle as EventListener);
  }, [repeatedGenres.length]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Trending Section */}
      <section className="bg-white">
        <div className="flex justify-center">
          <div className="flex flex-col w-full sm:w-[700px] items-center px-4 sm:px-0">
            <h1
              className={`${irishgroverFont.className} text-[#601A76] text-[32px] sm:text-[40px] md:text-[48px] pb-4 text-center`}
            >
              Trending This Week
            </h1>
            <p className="w-full sm:w-[550px] text-center pb-4 text-sm sm:text-base">
              Here&apos;s what everyone&apos;s buzzing about this week! From page-turners
              that keep you up all night to hidden gems you&apos;ll want to tell your
              friends about, these books are stealing the spotlight right now.
            </p>
          </div>
        </div>

        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-2 sm:px-4 gap-4 sm:gap-10 mx-auto sm:ml-2">
          {Array(5)
            .fill(books)
            .flat()
            .map((book, index) => (
              <div
                key={`${book.id}-${index}`}
                className="flex-none w-[200px] sm:w-[250px] md:w-[300px] snap-start flex flex-col items-center"
              >
                {/* Book Cover */}
                <div
                  className="w-[200px] h-[267px] sm:w-[250px] sm:h-[333px] md:w-[300px] md:h-[400px] rounded-[25px] transition-shadow duration-300 hover:shadow-[0_0_20px_#601A76] bg-center bg-cover m-2 sm:m-4"
                  style={{ backgroundImage: `url(${book.coverUrl})` }}
                ></div>

                {/* Title & Author */}
                <div className="flex flex-col items-center text-center mb-4 px-2">
                  <h3 className="text-base sm:text-lg font-semibold">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{book.author}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full px-2">
                  <button
                    onClick={() => handleRateClick(book.id)}
                    className={`${irishgroverFont.className} bg-white text-[#601A76] shadow-lg w-full sm:w-[93px] h-[35px] flex items-center justify-center rounded-[25px] text-sm cursor-pointer hover:bg-gray-50 transition-colors`}
                  >
                    Rate
                  </button>
                  <button
                    onClick={() => handleAddToShelf(Number(book.id))}
                    className={`${irishgroverFont.className} bg-[#601A76] text-white shadow-lg w-full sm:w-[138px] h-[35px] flex items-center justify-center rounded-[25px] text-sm`}
                  >
                    Add to shelf
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h1
          className={`${irishgroverFont.className} text-[#601A76] text-[32px] sm:text-[40px] md:text-[48px] pb-4 mt-6 sm:mt-10 mx-2 sm:ml-2 text-center sm:text-left`}
        >
          Categories
        </h1>

        <div ref={scrollerRef} className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-2 sm:px-4 gap-3 sm:gap-5 mx-auto sm:ml-2">
          {repeatedGenres.map((genre, index) => (
            <div
              key={`${genre}-${index}`}
              className={`relative flex-none w-[180px] sm:w-[200px] md:w-[244px] h-[80px] sm:h-[100px] md:h-[113px] snap-start flex flex-col items-center justify-center p-2 sm:p-4 rounded-[25px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCategory === genre ? "ring-4 ring-[#8D27AE] shadow-lg" : ""
              }`}
              onClick={() => handleCategoryClick(genre)}
              style={{
                backgroundImage: `url('/Rectangle 36.svg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#601A76] opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-xs sm:text-sm font-semibold text-white text-center">
                  {genre}
                </p>
                <div className="flex gap-1 flex-row">
                  <Image
                    className="w-[50px] h-[25px] sm:w-[60px] sm:h-[30px] md:w-[70px] md:h-[36px]"
                    src="/icons/200+.svg"
                    alt="200+"
                    width={70}
                    height={36}
                  />
                  <Image
                    className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[24px] md:h-[24px]"
                    src="/icons/tabler_books.svg"
                    alt="books"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
