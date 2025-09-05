"use client";

import { Irish_Grover } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

interface ProfileHeaderProps {
  onSearch?: (query: string) => void;
}

interface User {
  username: string;
  email: string;
}

export default function ProfileHeader({ onSearch }: ProfileHeaderProps) {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");

  useEffect(() => {
    // Get user data from localStorage or API
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you'd decode the token or fetch user data
      // For now, using mock data
      setUser({
        username: "Robert Karlos",
        email: "robert@example.com"
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditUsername(user?.username || "");
    setIsDropdownOpen(false);
  };

  const handleSaveEdit = () => {
    if (editUsername.trim()) {
      setUser(prev => prev ? { ...prev, username: editUsername.trim() } : null);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditUsername(user?.username || "");
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    // In a real app, this would call an API to delete the profile
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 gap-4 sm:gap-0">
      <Link href="/" className={`${irishgroverFont.className} text-xl font-bold text-[#461356]`}>
        Enanbib
      </Link>

      <form
        className="flex items-center w-full sm:w-[450px] rounded-[10px] bg-white text-black pl-4 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 h-10 rounded-[10px] outline-none px-2"
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={handleChange}
        />
        <button className="pr-4" type="submit" aria-label="search">
          <Image src="/icons/Vector.svg" alt="search" width={16} height={16} />
        </button>
      </form>

      <div className="relative">
        {isEditing ? (
      <div className="flex items-center gap-2 border border-[#461356] rounded-lg px-3 py-1">
            <Image src="/icons/pajamas_profile.svg" alt="profile" className="w-6 h-6" width={24} height={24} />
            <input
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="text-[#461356] font-medium bg-transparent outline-none border-b border-[#461356]"
              autoFocus
            />
            <button
              onClick={handleSaveEdit}
              className="text-green-600 hover:text-green-800 text-sm"
              title="Save"
            >
              ✓
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-red-600 hover:text-red-800 text-sm"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 border border-[#461356] rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Image src="/icons/pajamas_profile.svg" alt="profile" className="w-6 h-6" width={24} height={24} />
            <h1 className="text-[#461356] font-medium">{user?.username || "User"}</h1>
            <Image 
              src="/icons/Polygon 1.svg" 
              alt="dropdown" 
              className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              width={12} 
              height={12} 
            />
          </div>
        )}
        
        {isDropdownOpen && !isEditing && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={handleEditProfile}
              className="w-full px-4 py-2 text-left text-[#461356] hover:bg-gray-100 transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDeleteProfile}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
