import AppIcon from "@/assets/images/icon-wrapped.png?format=webp&w=80";
import Welcome from "@/pages/Welcome";
import { createElement, useCallback } from "react";
import { useState } from "react";

import useSocket from "./useSocket";

const defaultTabs = () => [
  {
    id: "apex-drop-farmer",
    title: "Apex Drop Farmer",
    icon: AppIcon,
    component: createElement(Welcome),
    active: true,
  },
];

export default function useApp() {
  const socket = useSocket();

  const [tabs, setTabs] = useState(defaultTabs);

  const setActiveTab = useCallback(
    (id) => {
      if (tabs.find((item) => item.id === id)) {
        setTabs((previous) =>
          previous.map((item) => ({ ...item, active: item.id === id }))
        );
        return true;
      }

      return false;
    },
    [tabs]
  );

  const pushTab = useCallback(
    (tab) => {
      if (!setActiveTab(tab.id)) {
        /** Push a new Tab */
        setTabs((previous) => [
          ...previous.map((item) => ({ ...item, active: false })),
          { ...tab, active: true },
        ]);
      }
    },
    [tabs, setActiveTab]
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

        return newTabs;
      });
    },
    [tabs]
  );

  return {
    socket,
    tabs,
    setActiveTab,
    closeTab,
    pushTab,
  };
}
