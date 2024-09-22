import { cn } from "@/lib/utils";

import TabButton from "./TabButton";

export default function TabButtonList({ tabs }) {
  return (
    <div
      className={cn(
        "flex px-2 pt-2 shrink-0",
        "overflow-auto border-b scrollbar-thin"
      )}
    >
      {tabs.map((tab) => (
        <TabButton key={tab.id} tab={tab} />
      ))}
    </div>
  );
}
