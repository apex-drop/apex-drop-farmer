import useTabContext from "@/hooks/useTabContext";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

export default function TabButton({ tab }) {
  const { setActiveTab, closeTab } = useTabContext();
  const buttonRef = useRef();

  const handleTabClick = (ev) => {
    setActiveTab(tab.id);
  };
  const handleCloseButtonClick = (ev) => {
    ev.stopPropagation();
    closeTab(tab.id);
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
      <img src={tab.icon} className="rounded-full w-7 h-7 shrink-0" />

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
