"use client";
import React, { useState } from "react";
import { Irish_Grover } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { calculateAverageRating, getMockReviewsForBook } from "../../lib/ratingUtils";
import { requireAuth } from "@/lib/auth";
import { useShelf } from "@/context/ShelfContext";

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

interface BookCardProps {
  books: Book[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Books({ books, selectedCategory, setSelectedCategory }: BookCardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [addingToShelf, setAddingToShelf] = useState<Set<number>>(new Set());
  const router = useRouter();
  const { addBookToShelf } = useShelf();

  // Filter books by search term and selected category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || book.genre === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const clearFilter = () => {
    setSelectedCategory("");
    setSearchTerm("");
  };

  const handleRateClick = (bookId: string) => {
    const token = requireAuth(router.push);
    if (!token) return;
    router.push(`/reviews/${bookId}`);
  };

  const handleAddToShelf = async (book: Book) => {
    const token = requireAuth(router.push);
    if (!token) return;
    
    const bookId = Number(book.id);
    setAddingToShelf(prev => new Set(prev).add(bookId));
    
    try {
      const bookToAdd = {
        id: bookId,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        genre: book.genre,
        publishedYear: book.publishedYear,
      };
      await addBookToShelf(bookToAdd);
    } catch (e) {
      console.error(e);
    } finally {
      setAddingToShelf(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookId);
        return newSet;
      });
    }
  };

  return (
    <>
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <h1
          className={`${irishgroverFont.className} text-[#601A76] text-[32px] sm:text-[40px] md:text-[48px] pb-4 m-2 text-center sm:text-left`}
        >
          Books
          {selectedCategory && (
            <span className="text-lg sm:text-xl md:text-2xl ml-2 text-[#8D27AE]">
              - {selectedCategory}
            </span>
          )}
        </h1>
        <div className="pb-4 m-2 sm:ml-auto pt-2 w-full sm:w-auto">
          <form
            className="w-full sm:w-[450px] rounded-[10px] bg-white text-black flex pl-4 shadow-lg"
            onSubmit={(e) => e.preventDefault()} // prevent reload
          >
            <input
              className="flex-1 h-full rounded-[10px] outline-none px-2"
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="pr-4" type="submit" aria-label="search">
              <Image src="/icons/Vector.svg" alt="search" width={16} height={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Clear Filter Button */}
      {selectedCategory && (
        <div className="flex justify-center mb-6">
          <button
            onClick={clearFilter}
            className="bg-[#8D27AE] text-white px-6 py-2 rounded-full text-sm shadow hover:bg-[#6b1d8e] transition flex items-center gap-2"
          >
            <span>←</span>
            Show All Books
          </button>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-20 gap-x-4 sm:gap-x-12 p-4 sm:p-8 w-full sm:w-[1200px] mx-auto">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-visible group hover:shadow-2xl transition duration-300 pb-20"
            >
              {/* Main card content */}
              <div className="flex flex-col md:flex-row">
                {/* Book Cover */}
                <div
                  className="w-[90px] h-[130px] bg-cover bg-center mt-4 ml-4 rounded-md shadow-md mx-auto md:mx-0"
                  style={{ backgroundImage: `url(${book.coverUrl})` }}
                ></div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl text-[#601A76] text-center md:text-left">
                      <span className="font-bold">Title:</span> {book.title}
                    </h2>
                    <p className="text-gray-600 text-sm text-center md:text-left">
                      <span className="font-bold">Author:</span> {book.author}
                    </p>
                    <p className="mt-2 text-gray-700 text-sm line-clamp-4 text-center md:text-left">
                      <span className="font-bold">Description:</span>{" "}
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini card sliding out UNDER the main card */}
              <div className="absolute left-0 right-0 -bottom-16 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <div className="bg-[#f9f9f9] rounded-xl shadow-md w-full p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <Image src="/Frame 6.svg" alt="rating" width={120} height={30} />
                    <h1 className="font-bold underline">
                      {calculateAverageRating(getMockReviewsForBook(book.id))}
                    </h1>
                    <p className="text-sm text-center sm:text-left">
                      1289 ratings • 714 Reviews
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <button 
                      onClick={() => handleAddToShelf(book)} 
                      disabled={addingToShelf.has(Number(book.id))}
                      className="bg-[#8D27AE] text-white px-4 py-1 rounded-full text-sm shadow hover:bg-[#6b1d8e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToShelf.has(Number(book.id)) ? "Adding..." : "Add to Shelf"}
                    </button>
                    <button
                      onClick={() => handleRateClick(book.id)}
                      className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-300 transition cursor-pointer"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 text-center">
            {selectedCategory ? (
              <div className="space-y-4">
                <p className="text-gray-500 text-lg">
                  No books found in the &quot;{selectedCategory}&quot; category.
                </p>
                <button
                  onClick={clearFilter}
                  className="bg-[#8D27AE] text-white px-6 py-2 rounded-full text-sm shadow hover:bg-[#6b1d8e] transition"
                >
                  Show All Books
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-lg">No books found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
