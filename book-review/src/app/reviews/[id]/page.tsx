import { Star, User, Calendar, MessageSquare } from "lucide-react";
import Image from "next/image";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";


// Example placeholder data
const book = {
  title: "Book Title Placeholder",
  cover: "/placeholder-book.jpg",
  ratings: 4,
  totalRatings: 1200,
  totalReviews: 500,
  author: {
    name: "Author Placeholder",
    image: "/placeholder-author.jpg",
    bio: "This is a placeholder author bio. Replace it with actual author details from the API.",
  },
  description:
    "This is a placeholder book description. Replace it with real data later.",
};

const reviews = [
  {
    id: 1,
    rating: 4,
    text: "This is a placeholder review. Replace it with actual review text from the API.",
    source: "Reader’s Choice",
    date: "Aug 15, 2023",
  },
  {
    id: 2,
    rating: 4,
    text: "Another placeholder review to demonstrate layout. Replace this with dynamic content.",
    source: "BookLovers Weekly",
    date: "Sep 1, 2023",
  },
  {
    id: 3,
    rating: 4,
    text: "Yet another placeholder review to fill in space. Data will come from backend later.",
    source: "The Literary Journal",
    date: "Sep 10, 2023",
  },
];

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
   
      <Navbar />
      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-8 p-8 flex-1">
        {/* Left: Book Cover + Ratings */}
        <div className="lg:w-1/3 flex flex-col items-center">
          <Image
            src={book.cover}
            alt="Book Cover"
            width={288}
            height={400}
            className="rounded-lg shadow-lg"
          />

          {/* Ratings */}
          <div className="flex items-center space-x-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < book.ratings ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <span>
              <span className="font-bold">{book.ratings}</span> {book.totalRatings} ratings,{" "}
              {book.totalReviews} Reviews
            </span>
          </p>

          {/* Review Input */}
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Write a review"
              className="border rounded-lg px-3 py-2 w-48"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Submit
            </button>
          </div>

          <button className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-200">
            Add to Shelf
          </button>
        </div>

        {/* Right: Book Info + Reviews */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold">{book.title}</h2>

          {/* Author Info */}
          <div className="flex items-center gap-4 mt-4">
            <Image
              src={book.author.image}
              alt="Author"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <User className="w-4 h-4 text-gray-600" />
                About the Author
              </p>
              <p className="text-sm text-gray-700">{book.author.bio}</p>
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
            <div className="mt-3 space-y-4">
              {reviews.map((review) => (
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
                  <p className="mt-1 text-sm text-gray-800 italic">“{review.text}”</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {review.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {review.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

     
      <Footer />
    </div>
  );
}
