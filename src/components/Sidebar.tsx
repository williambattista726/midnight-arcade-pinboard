
import React from "react";
import { Home, Grid, Heart, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarIcon: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-lg transition-colors",
        active
          ? "bg-sidebar-primary text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      )}
    >
      {icon}
    </button>
  );
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  return (
    <div className="w-16 bg-sidebar h-full flex flex-col items-center py-4 gap-2 border-r border-white/10">
      <SidebarIcon
        icon={<Home size={24} />}
        active={activeItem === "home"}
        onClick={() => setActiveItem("home")}
      />
      <SidebarIcon
        icon={<Grid size={24} />}
        active={activeItem === "apps"}
        onClick={() => setActiveItem("apps")}
      />
      <SidebarIcon
        icon={<Heart size={24} />}
        active={activeItem === "favorites"}
        onClick={() => setActiveItem("favorites")}
      />
      <SidebarIcon
        icon={<Search size={24} />}
        active={activeItem === "search"}
        onClick={() => setActiveItem("search")}
      />
      <div className="mt-auto">
        <SidebarIcon
          icon={<User size={24} />}
          active={activeItem === "profile"}
          onClick={() => setActiveItem("profile")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
