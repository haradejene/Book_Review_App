"use client";

import { useState, useEffect } from "react";
import { requireAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useShelf } from "@/context/ShelfContext";

interface Review {
  id?: string;
  rating: number;
  reviewText: string;
  username?: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  publishedYear: number;
}

interface ReviewFormProps {
  bookId: string; // pass bookId for API
  bookCoverUrl: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookPublishedYear: number;
  existingReviews: Review[];
}

export default function ReviewForm({ bookId, bookCoverUrl, bookTitle, bookAuthor, bookGenre, bookPublishedYear, existingReviews }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [averageRating, setAverageRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addReview, addBookToShelf } = useShelf();

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setAverageRating(avg);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === "") return;
    const token = requireAuth(router.push);
    if (!token) return;

    try {
      setLoading(true);
      const book: Book = {
        id: Number(bookId),
        title: bookTitle,
        author: bookAuthor,
        coverUrl: bookCoverUrl,
        genre: bookGenre,
        publishedYear: bookPublishedYear,
      };

      await addReview({
        rating,
        reviewText,
        book,
      });

      // Update local reviews for display
      const newReview: Review = { rating, reviewText };
      setReviews((prev) => [...prev, newReview]);
      setRating(0);
      setHoverRating(0);
      setReviewText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Review submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToShelf = async () => {
    const token = requireAuth(router.push);
    if (!token) return;
    try {
      const book: Book = {
        id: Number(bookId),
        title: bookTitle,
        author: bookAuthor,
        coverUrl: bookCoverUrl,
        genre: bookGenre,
        publishedYear: bookPublishedYear,
      };
      await addBookToShelf(book);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-auto px-4 lg:px-0">
      {/* Book Cover */}
      <img
        src={bookCoverUrl}
        alt="Book Cover"
        width={288}
        height={400}
        className="rounded-lg shadow-lg mb-4 w-full max-w-xs lg:max-w-none"
      />

      {/* Average Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            }`}
          />
        ))}
        <span className="text-gray-700 ml-2 text-sm">
          {averageRating.toFixed(1)} / 5
        </span>
      </div>

      {/* Interactive Rating */}
      <div className="flex flex-col items-center mt-5 w-full">
        <div className="flex space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        {/* Review Input & Submit */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full justify-center">
          <input
            type="text"
            placeholder="Write a review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full sm:w-72"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#461356] text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Add to Shelf */}
        <button onClick={handleAddToShelf} className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-200 w-full sm:w-auto">
          Add to Shelf
        </button>

        {/* Submission Confirmation */}
        {submitted && (
          <p className="mt-2 text-green-600 font-medium">Review submitted!</p>
        )}
      </div>
    </div>
  );
}
