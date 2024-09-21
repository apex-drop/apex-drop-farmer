import GoatsIcon from "@/drops/goats/assets/images/icon.png?format=webp&w=80";
import Agent301Icon from "@/drops/agent301/assets/images/icon.png?format=webp&w=80";
import AppIcon from "@/assets/images/icon.png?format=webp&w=224";
import BlumIcon from "@/drops/blum/assets/images/icon.png?format=webp&w=80";
import MajorIcon from "@/drops/major/assets/images/icon.png?format=webp&w=80";
import PumpadIcon from "@/drops/pumpad/assets/images/icon.png?format=webp&w=80";
import SlotcoinIcon from "@/drops/slotcoin/assets/images/icon.png?format=webp&w=80";
import TruecoinIcon from "@/drops/truecoin/assets/images/icon.png?format=webp&w=80";
import TomarketIcon from "@/drops/tomarket/assets/images/icon.png?format=webp&w=80";
import TapCatIcon from "@/drops/tapcat/assets/images/icon.png?format=webp&w=80";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const drops = [
  {
    title: "Major",
    path: "/major",
    icon: MajorIcon,
  },
  {
    title: "Blum",
    path: "/blum",
    icon: BlumIcon,
  },
  {
    title: "Tomarket",
    path: "/tomarket",
    icon: TomarketIcon,
  },
  {
    title: "Pumpad",
    path: "/pumpad",
    icon: PumpadIcon,
  },
  {
    title: "Slotcoin",
    path: "/slotcoin",
    icon: SlotcoinIcon,
  },
  {
    title: "Agent 301",
    path: "/agent301",
    icon: Agent301Icon,
  },
  {
    title: "Tap Cat",
    path: "/tapcat",
    icon: TapCatIcon,
  },
  {
    title: "Goats",
    path: "/goats",
    icon: GoatsIcon,
  },
  {
    title: "Truecoin",
    path: "/truecoin",
    icon: TruecoinIcon,
  },
];

const navigateToWebVersion = (v) =>
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.update(tabs[0].id, {
      url: `https://web.telegram.org/${v}`,
      active: true,
    });
  });

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center gap-2 p-4 py-20 mx-auto min-h-dvh max-w-96">
      <img src={AppIcon} className="mx-auto w-28 h-28" />
      <h3 className="text-lg font-bold text-center">Apex Drop Farmer</h3>
      <p className="text-lg text-center">
        <span
          className={cn(
            "text-transparent font-bold",
            "bg-clip-text",
            "bg-gradient-to-r from-pink-500 to-violet-500"
          )}
        >
          v{chrome.runtime.getManifest().version}
        </span>
      </p>

      <div className="flex justify-center gap-1">
        {["k", "a"].map((v, index) => (
          <button
            key={index}
            onClick={() => navigateToWebVersion(v)}
            className={cn(
              "p-2 px-4",
              "rounded-full",
              "bg-neutral-100",
              "hover:bg-blue-500",
              "hover:text-white"
            )}
          >
            {`Web${v.toUpperCase()}`}
          </button>
        ))}
      </div>

      {/* Drops */}

      <div className={cn("grid grid-cols-3", "gap-2 py-4")}>
        {drops.map((drop, index) => (
          <Link
            key={index}
            to={drop.path}
            className={cn(
              "flex flex-col justify-center items-center",
              "gap-2 p-2 rounded-lg",
              "bg-neutral-100 hover:bg-neutral-200"
            )}
          >
            <img src={drop.icon} className="w-10 h-10 rounded-full shrink-0" />
            <h3 className={cn("min-w-0")}>{drop.title}</h3>
          </Link>
        ))}
      </div>

      {/* Connect */}
      <div className="flex flex-col items-center gap-2 text-xs">
        <a
          href="https://t.me/Apex_Drop"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Join Channel
        </a>
        <a
          href="https://wa.me/2349018646163"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Chat with Dev
        </a>
      </div>
    </div>
  );
}
