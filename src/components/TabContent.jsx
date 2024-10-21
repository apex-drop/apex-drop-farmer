import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export default function TabContent({ tab }) {
  const {
    messaging: { ports },
  } = useAppContext();

  const openBot = useCallback(() => {
    ports.forEach(
      /**
       * @param {chrome.runtime.Port} port
       */
      (port) => {
        if (port.name === "telegram-web") {
          port.postMessage({
            action: "open-telegram-link",
            data: {
              url: tab.telegramLink,
            },
          });
        }
      }
    );
  }, [ports, tab.telegramLink]);

  return (
    <div
      className={cn(
        "absolute inset-0",
        "flex flex-col ",
        "bg-white",
        !tab.active ? "invisible" : null
      )}
    >
      {tab.telegramLink ? (
        <button
          onClick={openBot}
          className="p-2 text-blue-500 border-b shrink-0"
        >
          Open Bot
        </button>
      ) : null}
      {/* Content */}
      <div className="flex flex-col min-w-0 min-h-0 overflow-auto grow">
        {tab.component}
      </div>
    </div>
  );
}
