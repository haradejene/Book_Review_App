import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Irish_Grover } from "next/font/google";
import Link from "next/link";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#461356] py-10 px-8 mt-12 pt-16">
    <section>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + description */}
        <div>
          <Link href="/" className={`${irishgroverFont.className} text-xl font-bold text-[#461356] hover:text-[#8D27AE] transition-colors`}>
            Enanbib
          </Link>
          <p className="mt-2 text-sm">
            Your Library of Opinions — Find What&apos;s Worth Reading.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="">
          <h3 className="text-lg font-semibold text-[#461356] mb-2">
            Navigation Links
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:underline hover:text-[#8D27AE] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="hover:underline hover:text-[#8D27AE] transition-colors">
                Books
              </Link>
            </li>
            <li>
              <Link href="/profile/user" className="hover:underline hover:text-[#8D27AE] transition-colors">
                User
              </Link>
            </li>
          </ul>
        </div>

        {/* User Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#461356] mb-2">User Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/auth/signup" className="hover:underline hover:text-[#8D27AE] transition-colors">
              Sign up / Log in
              </Link>
            </li>
            <li>
              <Link href="/profile/user" className="hover:underline hover:text-[#8D27AE] transition-colors">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/reviews/1" className="hover:underline hover:text-[#8D27AE] transition-colors">
                Write a Review
              </Link>
            </li>
          </ul>
        </div>
        {/* Social icons */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-[#8D27AE] transition-colors">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-[#8D27AE] transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-[#8D27AE] transition-colors">
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
          <Link href="/privacy" className="hover:underline hover:text-[#8D27AE] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline hover:text-[#8D27AE] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
      </section>
       <p className="text-left text-xs mt-4">copyright © 2025 Enanbib</p>
    </footer>
  );
};

export default Footer;
