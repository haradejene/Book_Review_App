"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { mockBooks } from "@/lib/mockData";
import ProfileHeader from "./ProfileHeader";
import { calculateAverageRating, getMockReviewsForBook } from "@/lib/ratingUtils";

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
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.warn("Failed to fetch from API, using mock data:", err);
        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery)
      )
    );
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <ProfileHeader onSearch={handleSearch} />

      {/* Shelf Section */}
      <section className="px-4 sm:px-6 pt-10 flex justify-center">
        <div className="flex flex-col gap-4 max-w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full max-w-[985px] h-auto sm:h-[62px] bg-[#461356] flex-wrap px-4 sm:px-6 py-4 rounded-lg gap-2 sm:gap-0">
            <h1 className="text-white w-full sm:w-auto text-center sm:text-left">Shelf</h1>
            <h1 className="text-white w-full sm:w-auto text-center sm:text-left">Genre</h1>
            <h1 className="text-white w-full sm:w-auto text-center sm:text-left">Overall Review</h1>
          </div>

          {/* Scrollable container for books */}
          <div className="flex flex-col gap-4 h-[330px] overflow-y-auto max-w-full">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="flex flex-col sm:flex-row sm:items-center w-full max-w-[985px] bg-white shadow-lg rounded-lg p-4 gap-4"
              >
                {/* Left: Cover + Info */}
                <div className="flex items-center gap-4 w-full sm:w-80">
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
                <div className="font-bold text-center sm:pl-[70px] min-w-[100px]">{book.genre}</div>

                {/* Right: Icon + number */}
                <div className="flex items-center sm:pl-[250px] gap-2">
                  <Image
                    src="/Frame 6.svg"
                    alt="rating"
                    width={120}
                    height={30}
                    className="w-30 h-15 object-contain"
                  />
                  <h1 className="font-bold underline text-lg">{calculateAverageRating(getMockReviewsForBook(book.id))}</h1>
                  <Image
                    src="/icons/mdi_trash.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    className="object-contain sm:pl-[20px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review History Section */}
      <section className="px-4 sm:px-6 pt-10 flex justify-center pb-10">
        <div className="w-full max-w-[985px] bg-[#461356]/25 mx-auto rounded-lg p-4">
          <h1 className="font-bold m-5">Review History</h1>
          <div className="flex flex-col gap-4 h-[350px] overflow-y-auto">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-b border-black p-4 gap-4"
              >
                {/* Left: Cover + Info */}
                <div className="flex items-center flex-col sm:flex-row gap-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-sm font-extralight">{book.title}</h2>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/Frame 6.svg"
                        alt="rating"
                        width={120}
                        height={30}
                        className="w-30 h-15 object-contain"
                      />
                      <h1 className="font-bold underline text-lg">{calculateAverageRating(getMockReviewsForBook(book.id))}</h1>
                    </div>
                  </div>
                </div>

                {/* Middle: Genre */}
                <div className="font-bold text-center min-w-[100px]">{book.genre}</div>

                {/* Right: Icon */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/mdi_trash.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
