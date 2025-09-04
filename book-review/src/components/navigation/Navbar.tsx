import React, { useState } from "react";
import { Irish_Grover } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

interface HeaderProps {
  textColor?: string;
}

const Header: React.FC<HeaderProps> = ({ textColor = "text-white" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const scrollToBookCards = () => {
    // Scroll to BookCards section on the main page
    if (window.location.pathname === '/') {
      const bookCardsSection = document.querySelector('[data-book-cards]');
      if (bookCardsSection) {
        bookCardsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If not on main page, navigate to main page and scroll
      router.push('/');
      setTimeout(() => {
        const bookCardsSection = document.querySelector('[data-book-cards]');
        if (bookCardsSection) {
          bookCardsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="flex justify-center pt-[10px]">
      <header className="bg-white/10 shadow-md flex justify-between items-center w-[1300px] max-w-full h-[62px] rounded-lg px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className={`text-lg sm:text-xl m-2 sm:m-6 ${irishgroverFont.className} font-bold ${textColor} hover:text-[#8D27AE] transition-colors`}>
          Enanbib
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex pr-[20px]">
          <ul className={`flex space-x-4 sm:space-x-6 font-medium ${textColor} text-sm sm:text-base`}>
            <li><button onClick={scrollToBookCards} className="hover:text-[#8D27AE] transition-colors cursor-pointer">Books</button></li>
            <li><Link href="/profile/user" className="hover:text-[#8D27AE] transition-colors">User</Link></li>
            <li><Link href="/auth/login" className="hover:text-[#8D27AE] transition-colors">Login</Link></li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none ${textColor}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-[72px] left-0 w-full bg-[#461356] shadow-md sm:hidden">
            <ul className={`flex flex-col space-y-2 p-4 font-medium ${textColor} text-base`}>
              <li><button onClick={scrollToBookCards} className="hover:text-[#8D27AE] transition-colors cursor-pointer text-left w-full">Books</button></li>
              <li><Link href="/profile/user" className="hover:text-[#8D27AE] transition-colors">User</Link></li>
              <li><Link href="/auth/login" className="hover:text-[#8D27AE] transition-colors">Login</Link></li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
