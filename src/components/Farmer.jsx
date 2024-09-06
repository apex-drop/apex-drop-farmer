import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

import AutoGamer from "./AutoGamer";
import AutoTasks from "./AutoTasks";
import BalanceDisplay from "./BalanceDisplay";
import FarmerHeader from "./FarmerHeader";
import UsernameDisplay from "./UsernameDisplay";

export default function Farmer() {
  return (
    <div className="flex flex-col p-4">
      <FarmerHeader />
      <UsernameDisplay />
      <BalanceDisplay />

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
          <AutoGamer />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <AutoTasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
