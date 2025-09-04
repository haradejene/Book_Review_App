import React from "react";
import ShelveList from "../../../components/profile/ShelveList";
import { Irish_Grover } from "next/font/google";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  // Await the params promise
  const { username } = await params;
  
  // Mock user data (no DB yet)
  const mockUser = {
    username: username,
    email: `${username}@example.com`,
    bio: "This is a placeholder bio until we connect the DB.",
  };

  return (
    <>
      <div className="p-6 flex justify-center">
        <h1 className={`${irishgroverFont.className} text-2xl text-[#461356]`}>
          Welcome {mockUser.username}
        </h1>
      </div>
      <ShelveList />
    </>
  );
}