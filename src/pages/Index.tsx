
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GameGrid from "@/components/GameGrid";
import TaskBar from "@/components/TaskBar";
import { GameProvider } from "@/context/GameContext";
import { useGameContext } from "@/context/GameContext";

const IndexContent: React.FC = () => {
  const { activeView } = useGameContext();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">
              {activeView === "favorites" ? "Favorite Games" : "All Games"}
            </h2>
            <GameGrid />
          </div>
        </div>
        <TaskBar />
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <GameProvider>
      <IndexContent />
    </GameProvider>
  );
};

export default Index;
