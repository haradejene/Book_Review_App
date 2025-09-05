'use client';

import React, { useEffect, useState } from "react";
import Books from "../../components/books/BookDetails";
import Book from "../../components/books/BookCard";
import { mockBooks } from "@/lib/mockData";
import { apiUrl } from "@/lib/auth";

interface BookType {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  aboutAuthor: string;
  genre: string;
  publishedYear: number;
}

export default function BookPage(){
  const [selectedCategory, setSelectedCategory] = useState("");
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(apiUrl("/api/books"));
        if (!res.ok) throw new Error('API failed');
        const data: BookType[] = await res.json();
        setBooks(data);
      } catch (e) {
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return(
    <>
      <div className="pt-16 px-4 sm:px-8">
        <Books selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Book books={books} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
    </>
  )
}