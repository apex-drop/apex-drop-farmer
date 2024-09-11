import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

import BlumAutoGamer from "./BlumAutoGamer";
import BlumAutoTasks from "./BlumAutoTasks";
import BlumBalanceDisplay from "./BlumBalanceDisplay";
import BlumFarmerHeader from "./BlumFarmerHeader";
import BlumUsernameDisplay from "./BlumUsernameDisplay";

export default function BlumFarmer() {
  return (
    <div className="flex flex-col p-4">
      <BlumFarmerHeader />
      <BlumUsernameDisplay />
      <BlumBalanceDisplay />

      <Tabs.Root defaultValue="game" className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-2">
          {["game", "tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b border-transparent",
                "data-[state=active]:border-green-500"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="game">
          <BlumAutoGamer />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <BlumAutoTasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
