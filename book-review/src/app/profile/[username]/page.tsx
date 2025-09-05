"use client";

import React, { useEffect, useState } from "react";
import ShelveList from "../../../components/profile/ShelveList";
import { Irish_Grover } from "next/font/google";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/auth";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login"); // redirect if not logged in
          return;
        }

        const res = await fetch(apiUrl("/api/users"), {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push("/auth/login");
            return;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        Could not load profile. Please log in again.
      </p>
    );
  }

  return (
    <>
      <div className="p-6 flex justify-center">
        <h1 className={`${irishgroverFont.className} text-2xl text-[#461356]`}>
          Welcome {user.username}
        </h1>
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <p className="text-lg text-gray-700">{user.email}</p>
        <p className="text-sm text-gray-500">{user.bio || "No bio yet."}</p>
      </div>
      <ShelveList />
    </>
  );
}
