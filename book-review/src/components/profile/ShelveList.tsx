"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileHeader from "./ProfileHeader";
import { authFetch, getBackendUrl } from "@/lib/auth";
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
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        // Fetch shelves
        const shelfRes = await authFetch(`${getBackendUrl()}/shelves`, { method: "GET" });
        if (!shelfRes.ok) throw new Error("Shelf API failed");
        const shelfData = await shelfRes.json();

        // Fetch reviews
        const reviewRes = await authFetch(`${getBackendUrl()}/reviews`, { method: "GET" });
        if (!reviewRes.ok) throw new Error("Review API failed");
        const reviewData = await reviewRes.json();

        setShelves(shelfData);
        setReviews(reviewData);
      } catch (err) {
        console.error("Error fetching shelves/reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleDeleteShelf = async (shelfId: number) => {
    try {
      const token = localStorage.getItem("token");
      await authFetch(`${getBackendUrl()}/shelves`, {
        method: "DELETE",
        body: JSON.stringify({ shelfId }),
      });
      setShelves((prev) => prev.filter((s) => s.id !== shelfId));
    } catch (err) {
      console.error("Failed to delete shelf:", err);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const token = localStorage.getItem("token");
      await authFetch(`${getBackendUrl()}/reviews`, {
        method: "DELETE",
        body: JSON.stringify({ id: reviewId }),
      });
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
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
            {shelves.map((shelf) =>
              shelf.shelfBooks
                .filter((sb) => {
                  const book = sb.book;
                  return (
                    book.title.toLowerCase().includes(searchQuery) ||
                    book.author.toLowerCase().includes(searchQuery) ||
                    book.genre.toLowerCase().includes(searchQuery)
                  );
                })
                .map((sb) => (
                  <div
                    key={sb.book.id}
                    className="flex flex-col sm:flex-row sm:items-center w-full max-w-[985px] bg-white shadow-lg rounded-lg p-4 gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-80">
                      <img
                        src={sb.book.coverUrl}
                        alt={sb.book.title}
                        className="w-24 h-32 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-lg font-bold">{sb.book.title}</h2>
                        <p className="text-gray-700">{sb.book.author}</p>
                        <p className="text-gray-600">{sb.book.publishedYear}</p>
                      </div>
                    </div>

                    <div className="font-bold text-center sm:pl-[70px] min-w-[100px]">
                      {sb.book.genre}
                    </div>

                    <div className="flex items-center sm:pl-[250px] gap-2">
                      <Image src="/Frame 6.svg" alt="rating" width={120} height={30} />
                      <h1 className="font-bold underline text-lg">
                        {calculateAverageRating(
                          reviews.filter((r) => r.book.id === sb.book.id)
                        )}
                      </h1>
                      <Image
                        src="/icons/mdi_trash.svg"
                        alt="delete"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => handleDeleteShelf(shelf.id)}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Review History Section */}
      <section className="px-4 sm:px-6 pt-10 flex justify-center pb-10">
        <div className="w-full max-w-[985px] bg-[#461356]/25 mx-auto rounded-lg p-4">
          <h1 className="font-bold m-5">Review History</h1>
          <div className="flex flex-col gap-4 h-[350px] overflow-y-auto">
            {reviews.map((review) => (
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
