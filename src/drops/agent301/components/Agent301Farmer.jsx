import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

import Agent301BalanceDisplay from "./Agent301BalanceDisplay";
import Agent301Icon from "../assets/images/icon.png";
import Agent301Lottery from "./Agent301Lottery";
import Agent301Tasks from "./Agent301Tasks";

export default function Agent301Farmer() {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img src={Agent301Icon} alt="Agent301 Farmer" className="w-8 h-8" />
        <h1 className="font-bold">Agent301 Farmer</h1>
      </div>

      {/* Balance Display */}
      <Agent301BalanceDisplay />

      <Tabs.Root defaultValue="tickets" className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-2">
          {["tickets", "tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b-2 border-transparent",
                "data-[state=active]:border-white"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="tickets">
          <Agent301Lottery />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <Agent301Tasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}