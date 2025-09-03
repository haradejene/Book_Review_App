export interface Review {
  id: string;
  bookId: string;
  username: string;
  rating: number;
  review: string;
}

export const mockReviews: Review[] = [
  // Reviews for The Great Gatsby
  {
    id: "r1",
    bookId: "1",
    username: "Alice",
    rating: 5,
    review: "A timeless classic! The Jazz Age comes alive beautifully."
  },
  {
    id: "r2",
    bookId: "1",
    username: "David",
    rating: 4,
    review: "Loved the atmosphere, but Gatsby’s obsession was a bit much."
  },

  // Reviews for To Kill a Mockingbird
  {
    id: "r3",
    bookId: "2",
    username: "Sophie",
    rating: 5,
    review: "Deeply moving story about justice and morality."
  },
  {
    id: "r4",
    bookId: "2",
    username: "Michael",
    rating: 4,
    review: "Powerful themes, though pacing is slow at times."
  },

  // Reviews for Dune
  {
    id: "r5",
    bookId: "3",
    username: "Ethan",
    rating: 5,
    review: "An epic masterpiece of science fiction. World-building is unmatched."
  },
  {
    id: "r6",
    bookId: "3",
    username: "Lara",
    rating: 4,
    review: "Fascinating story, but some parts are dense to get through."
  },

  // Reviews for Pride and Prejudice
  {
    id: "r7",
    bookId: "4",
    username: "Clara",
    rating: 5,
    review: "An all-time favorite. The romance and wit are unmatched."
  },
  {
    id: "r8",
    bookId: "4",
    username: "James",
    rating: 4,
    review: "Charming and clever, though the language is a bit old-fashioned."
  }
];
