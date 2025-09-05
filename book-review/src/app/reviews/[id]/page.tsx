"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, User, Calendar, MessageSquare } from "lucide-react";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ReviewForm from "@/components/reviews/ReviewForm";

import { mockBooks } from "@/lib/mockData";
import { mockReviews } from "@/lib/mockReviews";
import { apiUrl } from "@/lib/auth";

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

interface Review {
  id: string;
  bookId: string;
  username: string;
  rating: number;
  review: string;
}

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookAndReviews() {
      try {
        // Fetch book
        const resBook = await fetch(apiUrl(`/api/books/${id}`));
        const resReviews = await fetch(apiUrl(`/api/reviews?bookId=${id}`));

        if (resBook.ok) {
          const bookData = await resBook.json();
          setBook(bookData);
        } else {
          setBook(mockBooks.find((b) => b.id === id) || null);
        }

        if (resReviews.ok) {
          const reviewData = await resReviews.json();
          setReviews(reviewData);
        } else {
          setReviews(mockReviews.filter((r) => r.bookId === id));
        }
      } catch (err) {
        console.warn("Failed to fetch, using mock data:", err);
        setBook(mockBooks.find((b) => b.id === id) || null);
        setReviews(mockReviews.filter((r) => r.bookId === id));
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBookAndReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar textColor="text-[#461356]" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-gray-600">Loading book details...</p>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar textColor="text-[#461356]" />

      <main className="flex flex-col lg:flex-row gap-8 p-8 flex-1">
        {/* Left: Book Cover + Review Form */}
        <ReviewForm
          bookCoverUrl={book.coverUrl}
          existingReviews={reviews.map((r) => ({
            rating: r.rating,
            reviewText: r.review,
          }))}
          bookId={book.id}
        />

        {/* Right: Book Info + Reviews */}
        <div className="lg:w-2/3 flex flex-col">
          <h2 className="text-2xl font-bold">{book.title}</h2>

          {/* Author Info */}
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <User className="w-4 h-4 text-gray-600" />
                About the Author – {book.author}
              </p>
              <p className="text-sm text-gray-700">{book.aboutAuthor}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Description:</span> {book.description}
          </p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              Reviews
            </h3>

            {/* Scrollable reviews */}
            <div className="mt-3 space-y-4 h-[300px] overflow-y-auto pr-2">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-3">
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
                ))
              ) : (
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
