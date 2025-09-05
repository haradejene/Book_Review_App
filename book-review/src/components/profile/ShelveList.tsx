"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileHeader from "./ProfileHeader";
import { useShelf } from "@/context/ShelfContext";
import { calculateAverageRating } from "@/lib/ratingUtils";

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  publishedYear: number;
}

interface ShelfBook {
  book: Book;
}

interface Shelf {
  id: number;
  name: string;
  description?: string;
  shelfBooks: ShelfBook[];
}

interface Review {
  id: number;
  rating: number;
  reviewText: string;
  book: Book;
  user: { username: string };
}

export default function ShelveList() {
  const { shelfBooks, reviews, removeBookFromShelf, removeReview, loading } = useShelf();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      await removeBookFromShelf(bookId);
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await removeReview(reviewId);
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <ProfileHeader onSearch={handleSearch} />

      {/* Shelf Section */}
      <section className="px-4 sm:px-6 pt-10 flex justify-center">
        <div className="flex flex-col gap-4 max-w-full mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full max-w-[985px] h-auto sm:h-[62px] bg-[#461356] flex-wrap px-4 sm:px-6 py-4 rounded-lg gap-2 sm:gap-0">
            <h1 className="text-white">Shelf</h1>
            <h1 className="text-white">Genre</h1>
            <h1 className="text-white">Overall Review</h1>
          </div>

          <div className="flex flex-col gap-4 h-[330px] overflow-y-auto max-w-full">
            {shelfBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Image src="/icons/tabler_books.svg" alt="books" width={48} height={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No books in your shelf yet</p>
                <p className="text-sm">Add books from the Books page to see them here</p>
              </div>
            ) : shelfBooks
              .filter((book) => {
                return (
                  book.title.toLowerCase().includes(searchQuery) ||
                  book.author.toLowerCase().includes(searchQuery) ||
                  book.genre.toLowerCase().includes(searchQuery)
                );
              })
              .length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Image src="/icons/Vector.svg" alt="search" width={48} height={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No books match your search</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            ) : shelfBooks
              .filter((book) => {
                return (
                  book.title.toLowerCase().includes(searchQuery) ||
                  book.author.toLowerCase().includes(searchQuery) ||
                  book.genre.toLowerCase().includes(searchQuery)
                );
              })
              .map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col sm:flex-row sm:items-center w-full max-w-[985px] bg-white shadow-lg rounded-lg p-4 gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-80">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{book.title}</h2>
                      <p className="text-gray-700">{book.author}</p>
                      <p className="text-gray-600">{book.publishedYear}</p>
                    </div>
                  </div>

                  <div className="font-bold text-center sm:pl-[70px] min-w-[100px]">
                    {book.genre}
                  </div>

                  <div className="flex items-center sm:pl-[250px] gap-2">
                    <Image src="/Frame 6.svg" alt="rating" width={120} height={30} />
                    <h1 className="font-bold underline text-lg">
                      {calculateAverageRating(
                        reviews.filter((r) => r.book.id === book.id)
                      )}
                    </h1>
                    <Image
                      src="/icons/mdi_trash.svg"
                      alt="delete"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => handleDeleteBook(book.id)}
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
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Image src="/icons/uil_book-reader.svg" alt="reviews" width={48} height={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No reviews yet</p>
                <p className="text-sm">Rate and review books to see them here</p>
              </div>
            ) : reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-b border-black p-4 gap-4"
              >
                <div className="flex items-center flex-col sm:flex-row gap-4">
                  <img
                    src={review.book.coverUrl}
                    alt={review.book.title}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-sm">{review.book.title}</h2>
                    <p className="text-gray-600 italic">“{review.reviewText}”</p>
                    <div className="flex items-center gap-2">
                      <Image src="/Frame 6.svg" alt="rating" width={120} height={30} />
                      <h1 className="font-bold underline text-lg">{review.rating}</h1>
                    </div>
                  </div>
                </div>

                <div className="font-bold text-center min-w-[100px]">
                  {review.book.genre}
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/mdi_trash.svg"
                    alt="delete"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => handleDeleteReview(review.id)}
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
