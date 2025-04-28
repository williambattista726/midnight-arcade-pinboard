
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Bell, User } from "lucide-react";
import { useGameContext } from "@/context/GameContext";

const Navbar: React.FC = () => {
  const { setSearchQuery } = useGameContext();
  const [localSearch, setLocalSearch] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearchQuery(value);
  };

  return (
    <div className="flex items-center justify-between px-6 h-16 bg-black/40 border-b border-white/10">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">GameLink</h1>
      </div>
      
      <div className="relative flex-1 mx-10 max-w-lg">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-white/60" />
        </div>
        <Input
          type="search"
          placeholder="Search games..."
          className="pl-10 bg-white/5 border border-white/10 focus:bg-white/10"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10">
          <Bell size={20} />
        </button>
        <button className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
