"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authFetch, apiUrl } from "@/lib/auth";
import Toast from "@/components/ui/Toast";

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  publishedYear: number;
}

interface Review {
  id: number;
  rating: number;
  reviewText: string;
  book: Book;
  user: { username: string };
}

interface ShelfContextType {
  shelfBooks: Book[];
  reviews: Review[];
  addBookToShelf: (book: Book) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'user'>) => Promise<void>;
  removeBookFromShelf: (bookId: number) => Promise<void>;
  removeReview: (reviewId: number) => Promise<void>;
  refreshData: () => Promise<void>;
  loading: boolean;
  showToast: (message: string, type: "success" | "error" | "info") => void;
}

const ShelfContext = createContext<ShelfContextType | undefined>(undefined);

export function ShelfProvider({ children }: { children: ReactNode }) {
  const [shelfBooks, setShelfBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setShelfBooks([]);
        setReviews([]);
        return;
      }

      // Fetch shelves and extract books
      const shelfRes = await authFetch(apiUrl("/api/shelves"), { method: "GET" });
      if (shelfRes.ok) {
        const shelfData = await shelfRes.json();
        const allBooks: Book[] = [];
        shelfData.forEach((shelf: any) => {
          shelf.shelfBooks.forEach((sb: any) => {
            allBooks.push(sb.book);
          });
        });
        setShelfBooks(allBooks);
      }

      // Fetch reviews
      const reviewRes = await authFetch(apiUrl("/api/reviews"), { method: "GET" });
      if (reviewRes.ok) {
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      }
    } catch (err) {
      console.error("Error fetching shelf data:", err);
    } finally {
      setLoading(false);
    }
  };

  const addBookToShelf = async (book: Book) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // Add to backend
      await authFetch(apiUrl("/api/shelves"), {
        method: "POST",
        body: JSON.stringify({ action: "addBook", shelfId: 1, bookId: book.id }),
      });

      // Update local state
      setShelfBooks(prev => [...prev, book]);
      showToast("Book added to shelf successfully!", "success");
    } catch (err) {
      console.error("Failed to add book to shelf:", err);
      showToast("Failed to add book to shelf", "error");
      throw err;
    }
  };

  const addReview = async (review: Omit<Review, 'id' | 'user'>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // Add to backend
      const res = await authFetch(apiUrl("/api/reviews"), {
        method: "POST",
        body: JSON.stringify({
          bookId: review.book.id,
          rating: review.rating,
          reviewText: review.reviewText,
        }),
      });

      if (res.ok) {
        const savedReview = await res.json();
        setReviews(prev => [...prev, savedReview]);
        showToast("Review submitted successfully!", "success");
      }
    } catch (err) {
      console.error("Failed to add review:", err);
      showToast("Failed to submit review", "error");
      throw err;
    }
  };

  const removeBookFromShelf = async (bookId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // Remove from backend
      await authFetch(apiUrl("/api/shelves"), {
        method: "DELETE",
        body: JSON.stringify({ action: "removeBook", shelfId: 1, bookId }),
      });

      // Update local state
      setShelfBooks(prev => prev.filter(book => book.id !== bookId));
      showToast("Book removed from shelf", "success");
    } catch (err) {
      console.error("Failed to remove book from shelf:", err);
      showToast("Failed to remove book from shelf", "error");
      throw err;
    }
  };

  const removeReview = async (reviewId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // Remove from backend
      await authFetch(apiUrl("/api/reviews"), {
        method: "DELETE",
        body: JSON.stringify({ id: reviewId }),
      });

      // Update local state
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      showToast("Review deleted successfully", "success");
    } catch (err) {
      console.error("Failed to remove review:", err);
      showToast("Failed to delete review", "error");
      throw err;
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <ShelfContext.Provider
      value={{
        shelfBooks,
        reviews,
        addBookToShelf,
        addReview,
        removeBookFromShelf,
        removeReview,
        refreshData,
        loading,
        showToast,
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ShelfContext.Provider>
  );
}

export function useShelf() {
  const context = useContext(ShelfContext);
  if (context === undefined) {
    throw new Error("useShelf must be used within a ShelfProvider");
  }
  return context;
}
