"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Irish_Grover } from "next/font/google";
import Header from "../../../components/navigation/Navbar";
import Footer from "../../../components/navigation/Footer";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Save token locally
      localStorage.setItem("token", data.token);

      // Redirect to homepage or dashboard
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#461356] text-white">
      <Header />

      {/* Signup Box */}
      <main className="flex flex-1 m-[37px] justify-center items-center">
        <div className="bg-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#6a4277] placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full bg-white text-[#3A0066] py-3 rounded-2xl font-semibold hover:bg-gray-200 transition ${irishgroverFont.className}`}
            >
              Signup
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
