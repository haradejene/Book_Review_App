// Utility functions for rating calculations

export interface Review {
  rating: number;
  reviewText?: string;
  review?: string;
}

/**
 * Calculate average rating from an array of reviews
 * @param reviews Array of review objects with rating property
 * @returns Average rating rounded to 1 decimal place
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  const average = sum / reviews.length;
  return Math.round(average * 10) / 10; // Round to 1 decimal place
}

/**
 * Get mock reviews for a specific book (for demo purposes)
 * @param bookId Book ID to get reviews for
 * @returns Array of mock reviews
 */
export function getMockReviewsForBook(bookId: string): Review[] {
  // Mock reviews data - in a real app, this would come from an API
  const mockReviews = [
    { rating: 4, reviewText: "Great book!", review: "Great book!" },
    { rating: 5, reviewText: "Amazing read!", review: "Amazing read!" },
    { rating: 3, reviewText: "It was okay", review: "It was okay" },
    { rating: 4, reviewText: "Really enjoyed it", review: "Really enjoyed it" },
    { rating: 5, reviewText: "Perfect!", review: "Perfect!" },
  ];
  
  // Return reviews for the specific book (for demo, we'll return all)
  return mockReviews;
}
