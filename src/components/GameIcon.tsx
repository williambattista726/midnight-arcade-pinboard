
import React, { useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { Game } from "@/data/games";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Pin, Unpin } from "lucide-react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type IconProps = React.HTMLAttributes<SVGElement>;

interface GameIconProps {
  game: Game;
  size?: "sm" | "md" | "lg";
}

const GameIcon: React.FC<GameIconProps> = ({ game, size = "md" }) => {
  const { togglePinGame, isPinned } = useGameContext();
  const [isHovering, setIsHovering] = useState(false);
  
  const LucideIcon = (LucideIcons as Record<string, React.FC<IconProps>>)[game.icon];

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    togglePinGame(game);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col items-center gap-2 p-2 transition-transform duration-200 cursor-pointer group"
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
          <div
            className={cn(
              "flex items-center justify-center rounded-xl transition-transform",
              sizeClasses[size],
              game.color,
              isPinned(game.id) ? "ring-2 ring-white/50" : "",
              isHovering ? "scale-110" : ""
            )}
          >
            {LucideIcon && <LucideIcon size={size === "sm" ? 24 : size === "md" ? 32 : 40} className="text-white" />}
          </div>
          <span className="text-sm font-medium text-white/90 max-w-[120px] text-center truncate">
            {game.title}
          </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="glass-morphism text-white/90">
        {isPinned(game.id) ? (
          <ContextMenuItem onClick={handlePin} className="flex items-center gap-2 cursor-pointer">
            <Unpin size={16} />
            <span>Unpin from Taskbar</span>
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={handlePin} className="flex items-center gap-2 cursor-pointer">
            <Pin size={16} />
            <span>Pin to Taskbar</span>
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default GameIcon;
