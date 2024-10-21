import { cn } from "@/lib/utils";

export default function TabContent({ tab }) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "flex flex-col ",
        "bg-white",
        !tab.active ? "invisible" : null
      )}
    >
      {/* Content */}
      <div className="flex flex-col min-w-0 min-h-0 overflow-auto grow">
        {tab.component}
      </div>
    </div>
  );
}
