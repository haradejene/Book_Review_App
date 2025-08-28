import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";
import { Irish_Grover } from "next/font/google";
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

// Load fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function LoginPage() {
  return (
    <div className={`flex flex-col min-h-screen bg-[#461356] shadow-md text-white ${poppins.className}`}>
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 bg-[#6a4277] rounded-lg mx-6 mt-4">
        <div>
          <h1 className={`${irishgroverFont.className} text-xl font-bold text-[white]`}>Enanbib</h1>
          
        </div>

        <nav className="space-x-6 bg-[#6a4277]">
          <Link href="/books" className="hover:underline">Books</Link>
          <Link href="/user" className="hover:underline">User</Link>
          <Link href="/login" className="hover:underline">Login</Link>
        </nav>
      </header><br></br>

      {/* Login Box */}
      <main className="flex flex-1 justify-center items-center">
        <div className="bg-[#7b5586] p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className={`text-3xl font-bold mb-6 text-center ${playfair.className}`}>
            Welcome back!
          </h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
           <button
           type="submit"
           className={`w-full bg-white text-[#3A0066] py-3 rounded-lg font-semibold hover:bg-gray-200 transition ${irishgroverFont.className}`}
            >
           Login
              </button>

          </form>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main><br></br>

      {/* Footer */}
      <footer className="bg-white text-[#3A0066] p-6">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
         <div>
          <h1 className={`${irishgroverFont.className} text-xl font-bold text-[#461356]`}>Enanbib</h1>
          <p className="mt-2 text-sm">
            Your Library of Opinions — Find What’s Worth Reading.
          </p>
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

          <div className="flex space-x-12 mt-4 md:mt-0">
            <div>
              <h4 className="font-semibold">Navigation Links</h4>
              <ul className="text-sm space-y-1">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/books" className="hover:underline">Books</Link></li>
                <li><Link href="/user" className="hover:underline">User</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">User Links</h4>
              <ul className="text-sm space-y-1">
                <li><Link href="/signup" className="hover:underline">Sign Up / Log in</Link></li>
                <li><Link href="/profile" className="hover:underline">Profile</Link></li>
                <li><Link href="/review" className="hover:underline">Write a Review</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-left text-xs mt-4">copyright © 2025 Enanbib</p>
      </footer>
    </div>
  );
}
