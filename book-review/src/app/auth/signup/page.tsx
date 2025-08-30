
import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";
import { Irish_Grover } from "next/font/google";
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import Header from "../../../components/navigation/Navbar";
import Footer from "../../../components/navigation/Footer";
const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#461356] text-white">
       <Header /> 
      {/* Signup Box */}
      <main className="flex flex-1 m-[37px] justify-center items-center">
        <div className="bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
             <button
           type="submit"
           className={`w-full bg-white text-[#3A0066] py-3 rounded-2xl font-semibold hover:bg-gray-200 transition ${irishgroverFont.className}`}
            >
           Signup
              </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </main><br></br><br></br>
      <Footer />
    </div>
  );
}
