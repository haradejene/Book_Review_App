import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-8 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + description */}
        <div>
          <h2 className="text-xl font-bold text-white">Enanbib</h2>
          <p className="mt-2 text-sm">
            Your Library of Opinions — Find What’s Worth Reading.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
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
          <h3 className="text-lg font-semibold text-white mb-2">User Links</h3>
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
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} Enanbib</p>

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
    </footer>
  );
};

export default Footer;
