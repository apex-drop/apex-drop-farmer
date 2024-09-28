import { cn } from "@/lib/utils";
import { useMemo } from "react";

import TabButton from "./TabButton";
import useAppContext from "@/hooks/useAppContext";

export default function TabButtonList({ tabs }) {
  const { socket } = useAppContext();
  const otherTabs = useMemo(() => tabs.slice(1), [tabs]);

  return (
    <div
      className={cn(
        "flex shrink-0 py-2 pr-2",
        "overflow-auto border-b scrollbar-thin"
      )}
    >
      {/* Main */}
      <div className="sticky left-0 px-2 bg-white shrink-0">
        <TabButton
          key={tabs[0].id}
          tab={tabs[0]}
          connected={socket.connected}
        />
      </div>

      {/* Others */}
      <div className="flex gap-2 flex-nowrap shrink-0">
        {otherTabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} />
        ))}
      </div>
    </div>
  );
}
