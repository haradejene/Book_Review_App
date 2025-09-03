import { Irish_Grover } from "next/font/google";

const irishgroverFont = Irish_Grover({ subsets: ["latin"], weight: "400" });

export default function ProfileHeader() {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      <div className={`${irishgroverFont.className} text-xl font-bold text-[#461356]`}>
        Enanbib
      </div>
      <form className="flex items-center w-[450px] rounded-[10px] bg-white text-black pl-4 shadow-lg">
        <input
          className="flex-1 h-10 rounded-[10px] outline-none px-2"
          type="text"
          placeholder="Search books..."
        />
        <button className="pr-4" type="submit">
          <img src="/icons/Vector.svg" alt="search" />
        </button>
      </form>
      <div className="flex items-center gap-2 border border-[#461356] rounded-lg px-3 py-1">
        <img src="/icons/pajamas_profile.svg" alt="profile" className="w-6 h-6" />
        <h1 className="text-[#461356] font-medium">Robert Karlos</h1>
          <img src="/icons/Polygon 1.svg" alt="dropdown" className="w-3 h-3" />
      </div>
    </nav>
  );
}
