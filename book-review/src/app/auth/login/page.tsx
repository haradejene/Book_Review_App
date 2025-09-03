"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Playfair_Display, Poppins, Irish_Grover } from "next/font/google";
import Header from "../../../components/navigation/Navbar";
import Footer from "../../../components/navigation/Footer";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token (could be in localStorage, cookies, etc.)
      localStorage.setItem("token", data.token);

      // Redirect to homepage or dashboard
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-[#461356] shadow-md text-white ${poppins.className}`}
    >
      <Header />

      {/* Login Box */}
      <main className="flex flex-1 m-[37px] justify-center items-center">
        <div className="bg-white/10 p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className={`text-3xl font-bold mb-6 text-center ${playfair.className}`}>
            Welcome back!
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

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
      </main>

      <Footer />
    </div>
  );
}
