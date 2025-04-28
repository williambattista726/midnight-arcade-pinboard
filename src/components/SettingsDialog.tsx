
import React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsDialog: React.FC = () => {
  return (
    <DialogContent className="glass-morphism text-white sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">Settings</DialogTitle>
        <DialogDescription className="text-white/70">
          Customize your GameLink experience
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="general" className="mt-4">
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="notifications" className="text-white">Notifications</Label>
              <p className="text-sm text-white/70">Enable notifications for new games and updates</p>
            </div>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="auto-launch" className="text-white">Auto-launch</Label>
              <p className="text-sm text-white/70">Automatically launch games when clicked</p>
            </div>
            <Switch id="auto-launch" />
          </div>
        </TabsContent>
        <TabsContent value="appearance" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="compact-view" className="text-white">Compact View</Label>
              <p className="text-sm text-white/70">Display more games in a compact grid</p>
            </div>
            <Switch id="compact-view" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="animations" className="text-white">Animations</Label>
              <p className="text-sm text-white/70">Enable animations throughout the interface</p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default SettingsDialog;
