"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, User, Calendar, MessageSquare } from "lucide-react";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

import { mockBooks } from "@/lib/mockData";
import { mockReviews } from "@/lib/mockReviews";

export default function ReviewPage() {
  const { id } = useParams();
  const book = mockBooks.find((b) => b.id === id);
  const reviews = mockReviews.filter((r) => r.bookId === id);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar textColor="text-[#461356]" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-gray-600">Book not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Repeat reviews for demo purposes
  const repeatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar textColor="text-[#461356]" />

      <main className="flex flex-col lg:flex-row gap-8 p-8 flex-1">
        {/* Left: Book Cover + Ratings */}
        <div className="lg:w-1/3 flex flex-col items-center">
          <img
            src={book.coverUrl}
            alt={book.title}
            width={288}
            height={400}
            className="rounded-lg shadow-lg"
          />

          {/* Average Rating */}
          <div className="flex items-center space-x-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i <
                  Math.round(
                    reviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviews.length || 0
                  )
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <span>
              <span className="font-bold">
                {(
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length ||
                  0
                ).toFixed(1)}
              </span>{" "}
              from {reviews.length} reviews
            </span>
          </p>

          {/* Review Input */}
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Write a review"
              className="border rounded-lg px-3 py-2 w-48"
            />
            <button className="bg-[#461356] text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Submit
            </button>
          </div>

          <button className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-200">
            Add to Shelf
          </button>
        </div>

        {/* Right: Book Info + Reviews */}
        <div className="lg:w-2/3 flex flex-col">
          <h2 className="text-2xl font-bold">{book.title}</h2>

          {/* Author Info */}
          <div className="flex items-center gap-4 mt-4">
            <Image
              src="/placeholder-author.jpg"
              alt={book.author}
              width={120}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <User className="w-4 h-4 text-gray-600" />
                About the Author
              </p>
              <p className="text-sm text-gray-700">{book.aboutAuthor}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Description:</span>{" "}
            {book.description}
          </p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              Reviews
            </h3>

            {/* Scrollable container */}
            <div className="mt-3 space-y-4 h-[300px] overflow-y-auto pr-2">
              {repeatedReviews.map((review) => (
                <div key={review.id + Math.random()} className="border-b pb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-800 italic">
                    “{review.review}”
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {review.username}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {book.publishedYear}
                    </span>
                  </div>
                </div>
              ))}

              {reviews.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No reviews yet for this book.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
