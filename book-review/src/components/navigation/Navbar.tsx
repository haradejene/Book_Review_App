import React from "react";
import { Irish_Grover } from "next/font/google";
const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

const Header: React.FC = () => {
  return (
    <div className="flex justify-center pt-[10px] ">
    <header className="bg-white/10 shadow-md flex justify-between items-center  w-[1300px] h-[62px] rounded-lg ">
      {/* Logo */}
      <div className={`m-6 ${irishgroverFont.className} text-xl font-bold text-white`} >Enanbib</div>

      {/* Navigation */}
      <nav className="pr-[20px]">
        <ul className="flex space-x-6 text-white font-medium ">
          <li>
            <a href="/books" className="hover:text-[#8D27AE]">
              Books
            </a>
          </li>
          <li>
            <a href="/user" className="hover:text-[#8D27AE]">
              User
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-[#8D27AE]">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
};

export default Header;
