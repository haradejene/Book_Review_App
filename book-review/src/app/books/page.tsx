import REACT from "react";
import Books from "../../components/books/BookDetails";
import Book from "../../components/books/BookCard";

export default function BookPage(){
    return(
        <>
         <div className="pt-16 px-4 sm:px-8">
                <Books />
                <Book />
              </div>
        
        </>
    )
}