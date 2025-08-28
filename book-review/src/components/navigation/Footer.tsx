import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Irish_Grover } from "next/font/google";
const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#461356] py-10 px-8 mt-12">
    <section>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + description */}
        <div>
          <h1 className={`${irishgroverFont.className} text-xl font-bold text-[#461356]`}>Enanbib</h1>
          <p className="mt-2 text-sm">
            Your Library of Opinions — Find What’s Worth Reading.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="">
          <h3 className="text-lg font-semibold text-[#461356] mb-2">
            Navigation Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/books" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="/user" className="hover:underline">
                User
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* User Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#461356] mb-2">User Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/signup" className="hover:underline">
                Sign up / Log in
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:underline">
                Profile
              </a>
            </li>
            <li>
              <a href="/review" className="hover:underline">
                Write a Review
              </a>
            </li>
          </ul>
        </div>
        {/* Social icons */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
        </div>
      </div>
      </section>
      <section>
      {/* Bottom bar */}
      <div className="mt-8 w-full h-[32px] border-t bg-[#461356] border-[#461356] pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} Enanbib</p>

        {/* Policy links */}
        <div className="flex space-x-4 text-sm mt-2 md:mt-0">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
      </section>
    </footer>
  );
};

export default Footer;
