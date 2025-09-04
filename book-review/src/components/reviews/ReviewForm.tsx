"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  rating: number;
  reviewText: string;
}

interface ReviewFormProps {
  bookCoverUrl: string;
  existingReviews: Review[];
  onSubmit?: (rating: number, reviewText: string) => void;
}

export default function ReviewForm({ bookCoverUrl, existingReviews, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [averageRating, setAverageRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setAverageRating(avg);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") return;
    const newReview: Review = { rating, reviewText };
    setReviews((prev) => [...prev, newReview]);
    if (onSubmit) onSubmit(rating, reviewText);
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // hide after 3 seconds
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
            className="bg-[#461356] text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>

        {/* Add to Shelf */}
        <button className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-200 w-full sm:w-auto">
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
