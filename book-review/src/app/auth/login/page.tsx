import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";
import { Irish_Grover } from "next/font/google";
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import Header from "../../../components/navigation/Navbar";
import Footer from "../../../components/navigation/Footer";

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
      <Header />

      {/* Login Box */}
      <main className="flex flex-1  m-[37px] justify-center items-center">
        <div className="bg-white/10  p-10 rounded-2xl shadow-xl w-full max-w-md">
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

      <Footer />
    </div>
  );
}
