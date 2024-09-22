import { Toaster } from "react-hot-toast";
import { useCallback } from "react";
import { useState } from "react";

import TabContext from "./contexts/TabContext";
import Welcome from "./pages/Welcome";
import AppIcon from "@/assets/images/icon.png?format=webp&w=80";
import TabContent from "./components/TabContent";
import TabButtonList from "./components/TabButtonList";

const defaultTabs = () => [
  {
    id: "apex-drop-farmer",
    title: "Apex Drop Farmer",
    icon: AppIcon,
    component: <Welcome />,
    active: true,
    removable: false,
  },
];

function App() {
  const [tabs, setTabs] = useState(defaultTabs);

  const setActiveTab = useCallback(
    (id) => {
      setTabs((previous) =>
        previous.map((item) => ({ ...item, active: item.id === id }))
      );
    },
    [tabs]
  );

  const pushTab = useCallback(
    (tab) => {
      if (tabs.find((item) => item.id === tab.id)) {
        setActiveTab(tab.id);
      } else {
        // Add New Tab
        setTabs((previous) => [
          ...previous.map((item) => ({ ...item, active: false })),
          { removable: true, ...tab, active: true },
        ]);
      }
    },
    [tabs]
  );

  const closeTab = useCallback(
    (id) => {
      setTabs((previous) => {
        const previousIndex = previous.findIndex((tab) => tab.id === id);

        const newTabs = previous
          .filter((item) => item.id !== id)
          .map((item, index) => ({
            ...item,
            active: index === previousIndex - 1,
          }));

        console.log(newTabs);

        return newTabs;
      });
    },
    [tabs]
  );

  return (
    <TabContext.Provider value={{ pushTab, closeTab, setActiveTab }}>
      <div className="flex flex-col h-dvh">
        {tabs.length > 1 ? <TabButtonList tabs={tabs} /> : null}

        {/* Tabs Contents Wrapper */}
        <div className="relative min-w-0 min-h-0 overflow-auto grow">
          {tabs.map((tab) => (
            <TabContent key={tab.id} tab={tab} />
          ))}
        </div>
      </div>
      <Toaster position="top-center" />
    </TabContext.Provider>
  );
}

export default App;
