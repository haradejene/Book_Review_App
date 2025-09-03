import React from "react";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import ShelveList from "../../../components/profile/ShelveList";


interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // Mock user data (no DB yet)
  const mockUser = {
    username: params.username,
    email: `${params.username}@example.com`,
    bio: "This is a placeholder bio until we connect the DB.",
  };

  return (
    <>
    <ProfileHeader />
    <ShelveList />
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Profile of {mockUser.username}
      </h1>
    </div>
    </>
  );
}
