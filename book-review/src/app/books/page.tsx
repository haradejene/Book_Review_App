'use client';

import React, { useState } from "react";
import Books from "../../components/books/BookDetails";
import Book from "../../components/books/BookCard";

export default function BookPage(){
    const [selectedCategory, setSelectedCategory] = useState("");

    return(
        <>
         <div className="pt-16 px-4 sm:px-8">
                <Books selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Book selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
        </>
    )
}