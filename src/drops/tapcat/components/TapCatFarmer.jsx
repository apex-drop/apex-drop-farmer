import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

import TapCatIcon from "../assets/images/icon.png?format=webp";
import TapCatLottery from "./TapCatLottery";
import TapCatProfileDisplay from "./TapCatProfileDisplay";
import TapCatTasks from "./TapCatTasks";

export default function TapCatFarmer() {
  return (
    <div className="flex flex-col gap-2 py-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 py-2">
        <img
          src={TapCatIcon}
          alt="TapCat Farmer"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="font-bold">TapCat Farmer</h1>
      </div>

      {/* Info */}
      <TapCatProfileDisplay />

      <Tabs.Root defaultValue="slots" className="flex flex-col">
        <Tabs.List className="grid grid-cols-2">
          {["slots", "tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn("p-2", "data-[state=active]:bg-rose-700")}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="slots">
          {/* Lottery */}
          <TapCatLottery />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <TapCatTasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
