
import React from "react";
import { Home, Grid, Heart, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/context/GameContext";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SettingsDialog from "./SettingsDialog";

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
  const { activeView, setActiveView } = useGameContext();
  const [activeItem, setActiveItem] = React.useState(activeView === "favorites" ? "favorites" : "home");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "favorites") {
      setActiveView("favorites");
    } else if (activeView === "favorites") {
      setActiveView("all");
    }
  };

  return (
    <div className="w-16 bg-sidebar h-full flex flex-col items-center py-4 gap-2 border-r border-white/10">
      <SidebarIcon
        icon={<Home size={24} />}
        active={activeItem === "home"}
        onClick={() => handleItemClick("home")}
      />
      <SidebarIcon
        icon={<Grid size={24} />}
        active={activeItem === "apps"}
        onClick={() => handleItemClick("apps")}
      />
      <SidebarIcon
        icon={<Heart size={24} />}
        active={activeItem === "favorites"}
        onClick={() => handleItemClick("favorites")}
      />
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <SidebarIcon
              icon={<Settings size={24} />}
              active={activeItem === "settings"}
              onClick={() => handleItemClick("settings")}
            />
          </div>
        </DialogTrigger>
        <SettingsDialog />
      </Dialog>
      <div className="mt-auto">
        <SidebarIcon
          icon={<User size={24} />}
          active={activeItem === "profile"}
          onClick={() => handleItemClick("profile")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
