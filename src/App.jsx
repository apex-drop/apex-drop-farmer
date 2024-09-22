import { Toaster } from "react-hot-toast";
import { useCallback } from "react";
import { useState } from "react";

import TabContext from "./contexts/TabContext";
import Welcome from "./pages/Welcome";
import { cn } from "./lib/utils";
import { useMemo } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineXMark,
} from "react-icons/hi2";

function App() {
  const [tabs, setTabs] = useState([
    {
      id: "apex-drop-farmer",
      title: "Apex Drop Farmer",
      component: <Welcome />,
      active: true,
      removable: false,
    },
  ]);

  const inactiveTabs = useMemo(
    () => tabs.filter((item) => !item.active),
    [tabs]
  );

  const hideTab = useCallback(
    (id) => {
      setTabs((previous) =>
        previous.map((item) =>
          id === item.id ? { ...item, active: false } : item
        )
      );
    },
    [tabs]
  );

  const removeTab = useCallback(
    (id) => {
      setTabs((previous) => previous.filter((item) => item.id !== id));
    },
    [tabs]
  );

  const pushTab = useCallback(
    (tab) => {
      if (tabs.find((item) => item.id === tab.id)) {
        setTabs((previous) =>
          previous.map((item) =>
            tab.id === item.id ? { ...item, active: true } : item
          )
        );
      } else {
        setTabs((previous) => [
          ...previous,
          { removable: true, ...tab, active: true },
        ]);
      }
    },
    [tabs]
  );

  const closeAllTabs = useCallback(() => {
    setTabs((previous) =>
      previous
        .filter((item) => item.id !== "apex-drop-farmer")
        .map((item) => ({ ...item, active: true }))
    );
  }, [tabs]);

  return (
    <TabContext.Provider value={{ pushTab, closeAllTabs, removeTab }}>
      <div className="flex flex-col h-dvh">
        <div className="relative min-w-0 min-h-0 overflow-auto grow">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "absolute inset-0",
                "flex flex-col h-full",
                "bg-white",
                !tab.active ? "invisible" : null
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "shrink-0 p-4",
                  "items-center",
                  tabs.length > 1 ? "flex" : "hidden"
                )}
              >
                <button
                  className={cn(
                    "p-2 shrink-0",
                    !tab.removable ? "hidden" : null
                  )}
                  onClick={() => removeTab(tab.id)}
                >
                  <HiOutlineXMark />
                </button>
                <h4 className="min-w-0 font-bold grow">{tab.title}</h4>

                <button
                  className={cn(
                    "p-2 shrink-0",
                    !tab.removable ? "hidden" : null
                  )}
                  onClick={() => hideTab(tab.id)}
                >
                  <HiOutlineChevronDown />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col min-w-0 min-h-0 overflow-auto grow">
                {tab.component}
              </div>
            </div>
          ))}
        </div>

        {/* Button Stack */}
        {inactiveTabs.length > 0 ? (
          <button
            className={cn(
              "shrink-0 p-2",
              "border-t",
              "flex items-center",
              "text-left"
            )}
          >
            <span className="min-w-0 font-bold grow">
              {inactiveTabs[0].title}
              {inactiveTabs.length > 1 ? (
                <> & {inactiveTabs.length - 1} others</>
              ) : null}
            </span>

            <span className="p-2 shrink-0">
              <HiOutlineChevronUp className="w-5 h-5" />
            </span>
          </button>
        ) : null}
      </div>
      <Toaster position="top-center" />
    </TabContext.Provider>
  );
}

export default App;
