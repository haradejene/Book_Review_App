import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">Enanbib</div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="/books" className="hover:text-blue-600">
              Books
            </a>
          </li>
          <li>
            <a href="/user" className="hover:text-blue-600">
              User
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-blue-600">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
