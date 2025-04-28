
import React, { useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { Game } from "@/data/games";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Pin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type IconProps = React.HTMLAttributes<SVGElement>;

interface GameIconProps {
  game: Game;
  size?: "sm" | "md" | "lg";
  index?: number;
}

const GameIcon: React.FC<GameIconProps> = ({ game, size = "md", index }) => {
  const { togglePinGame, toggleFavoriteGame, isPinned, isFavorite, reorderGames } = useGameContext();
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use type assertion to safely access the icon component
  const IconComponent = (LucideIcons as any)[game.icon];

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    togglePinGame(game);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavoriteGame(game);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (index !== undefined) {
      e.dataTransfer.setData('text/plain', index.toString());
      setIsDragging(true);
      
      // Create a drag image
      const dragElement = document.createElement('div');
      dragElement.className = cn(
        "flex items-center justify-center rounded-xl",
        game.color,
        sizeClasses[size]
      );
      dragElement.style.opacity = '0.5';
      document.body.appendChild(dragElement);
      e.dataTransfer.setDragImage(dragElement, 40, 40);
      
      // Remove the element after a short delay
      setTimeout(() => {
        document.body.removeChild(dragElement);
      }, 0);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    if (index !== undefined && startIndex !== index) {
      reorderGames(startIndex, index);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div 
          className={cn(
            "flex flex-col items-center gap-2 p-2 transition-transform duration-200 cursor-pointer group",
            isDragging ? "opacity-50" : ""
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          draggable={index !== undefined}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-xl transition-transform",
              sizeClasses[size],
              game.color,
              isPinned(game.id) ? "ring-2 ring-white/50" : "",
              isFavorite(game.id) ? "ring-2 ring-pink-500/50" : "",
              isHovering ? "scale-110" : ""
            )}
          >
            {IconComponent && <IconComponent size={size === "sm" ? 24 : size === "md" ? 32 : 40} className="text-white" />}
          </div>
          <span className="text-sm font-medium text-white/90 max-w-[120px] text-center truncate">
            {game.title}
          </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="glass-morphism text-white/90">
        <ContextMenuItem onClick={handlePin} className="flex items-center gap-2 cursor-pointer">
          <Pin size={16} />
          <span>{isPinned(game.id) ? "Unpin from Taskbar" : "Pin to Taskbar"}</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleFavorite} className="flex items-center gap-2 cursor-pointer">
          <Heart size={16} className={isFavorite(game.id) ? "fill-pink-500 text-pink-500" : ""} />
          <span>{isFavorite(game.id) ? "Remove from Favorites" : "Add to Favorites"}</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default GameIcon;
