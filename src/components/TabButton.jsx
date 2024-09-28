import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

export default function TabButton({ tab, connected }) {
  const { socket, setActiveTab, closeTab } = useAppContext();
  const buttonRef = useRef();

  const handleTabClick = (ev) => {
    setActiveTab(tab.id);

    socket.dispatch({
      action: "app.set-active-tab",
      data: {
        id: tab.id,
      },
    });
  };
  const handleCloseButtonClick = (ev) => {
    ev.stopPropagation();

    closeTab(tab.id);

    socket.dispatch({
      action: "app.close-tab",
      data: {
        id: tab.id,
      },
    });
  };

  useEffect(() => {
    if (tab.active) {
      buttonRef.current.scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [tab.active]);

  return (
    <div
      ref={buttonRef}
      onClick={handleTabClick}
      title={tab.title}
      className={cn(
        "cursor-pointer",
        "flex gap-2 items-center",
        "p-1.5 rounded-full shrink-0",
        tab.active ? "bg-neutral-100" : null
      )}
    >
      {/* Icon */}
      <div className="relative shrink-0">
        <img src={tab.icon} className="rounded-full w-7 h-7" />
        {typeof connected !== "undefined" ? (
          <span
            className={cn(
              "absolute inset-0",
              "rotate-[120deg]",

              // After
              "after:absolute",
              "after:top-0 after:left-1/2",
              "after:-translate-x-1/2 after:-translate-y-1/2",
              "after:border-2 after:border-white",
              "after:p-1",
              "after:rounded-full",
              connected ? "after:bg-green-500" : "after:bg-red-500"
            )}
          ></span>
        ) : null}
      </div>

      {/* Title */}
      <span
        className={cn(
          "font-bold",
          "max-w-10 truncate",
          !tab.active ? "hidden" : null
        )}
      >
        {tab.title}
      </span>

      {/* Close Button */}
      {tab.active && tab.id !== "apex-drop-farmer" ? (
        <button
          className="inline-flex items-center justify-center w-7 h-7 shrink-0"
          onClick={handleCloseButtonClick}
        >
          <HiOutlineXMark className="w-5 h-5" />
        </button>
      ) : null}
    </div>
  );
}
