import * as Dialog from "@radix-ui/react-dialog";
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
import { cn, getSettings } from "@/lib/utils";
import Major from "@/drops/major/Major";
import useTabContext from "@/hooks/useTabContext";
import Blum from "@/drops/blum/Blum";
import Tomarket from "@/drops/tomarket/Tomarket";
import Pumpad from "@/drops/pumpad/Pumpad";
import Slotcoin from "@/drops/slotcoin/Slotcoin";
import Agent301 from "@/drops/agent301/Agent301";
import TapCat from "@/drops/tapcat/TapCat";
import Goats from "@/drops/goats/Goats";
import Truecoin from "@/drops/truecoin/Truecoin";
import { useMemo } from "react";
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import TelegramWeb from "@/TelegramWeb";

import TelegramWebKIcon from "@/assets/images/telegram-web-k.png?format=webp&w=80";
import TelegramWebAIcon from "@/assets/images/telegram-web-a.png?format=webp&w=80";
import Settings from "@/partials/Settings";

const navigateToWebVersion = (v) =>
  chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
    chrome?.tabs?.update(tabs[0].id, {
      url: `https://web.telegram.org/${v}`,
      active: true,
    });
  });

const openInSeparateWindow = () => {
  chrome?.windows?.create({
    url: "index.html",
    width: 400,
    type: "popup",
  });

  window.close();
};

export default function Welcome() {
  const { pushTab } = useTabContext();
  const drops = useMemo(
    () => [
      {
        id: "major",
        title: "Major",
        icon: MajorIcon,
        component: <Major />,
      },
      {
        title: "Blum",
        id: "blum",
        icon: BlumIcon,
        component: <Blum />,
      },
      {
        title: "Tomarket",
        id: "tomarket",
        icon: TomarketIcon,
        component: <Tomarket />,
      },
      {
        title: "Pumpad",
        id: "pumpad",
        icon: PumpadIcon,
        component: <Pumpad />,
      },
      {
        title: "Slotcoin",
        id: "slotcoin",
        icon: SlotcoinIcon,
        component: <Slotcoin />,
      },
      {
        title: "Agent 301",
        id: "agent301",
        icon: Agent301Icon,
        component: <Agent301 />,
      },
      {
        title: "Tap Cat",
        id: "tapcat",
        icon: TapCatIcon,
        component: <TapCat />,
      },
      {
        title: "Goats",
        id: "goats",
        icon: GoatsIcon,
        component: <Goats />,
      },
      {
        title: "Truecoin",
        id: "truecoin",
        icon: TruecoinIcon,
        component: <Truecoin />,
      },
    ],
    []
  );

  const pushTgWeb = (v) => {
    pushTab({
      id: "telegram-web-" + v,
      title: `Telegram Web ${v.toUpperCase()}`,
      icon: v === "k" ? TelegramWebKIcon : TelegramWebAIcon,
      component: <TelegramWeb version={v} />,
    });
  };

  const openTelegramWeb = (v) => {
    getSettings().then((settings) => {
      if (settings.openTelegramWebWithinFarmer) {
        pushTgWeb(v);
      } else {
        navigateToWebVersion(v);
      }
    });
  };

  return (
    <div className="flex flex-col w-full gap-2 p-4 mx-auto max-w-96 grow">
      {/* Settings and New Window Button */}
      <div className="flex justify-end gap-2">
        {/* Open in Separate Window */}
        <button
          title="Open in separate Window"
          onClick={openInSeparateWindow}
          className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
        >
          <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
        </button>

        {/* Settings */}
        <Dialog.Root>
          <Dialog.Trigger
            title="Settings"
            className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
          >
            <HiOutlineCog6Tooth className="w-5 h-5" />
          </Dialog.Trigger>

          <Settings />
        </Dialog.Root>
      </div>

      <div className="flex flex-col justify-center gap-2 grow">
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
            v{chrome?.runtime?.getManifest().version}
          </span>
        </p>

        <div className="flex justify-center gap-1">
          {["k", "a"].map((v, index) => (
            <button
              key={index}
              onClick={() => openTelegramWeb(v)}
              className={cn(
                "p-2",
                "rounded-full",
                "bg-neutral-100",
                "hover:bg-blue-500",
                "hover:text-white",
                "inline-flex items-center justify-center gap-1"
              )}
              title={`Switch to Web${v.toUpperCase()}`}
            >
              <img
                src={v === "k" ? TelegramWebKIcon : TelegramWebAIcon}
                className="w-6 h-6"
              />
              {`Web${v.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Drops */}
        <div className={cn("grid grid-cols-3", "gap-2 py-4")}>
          {drops.map((drop, index) => (
            <button
              key={index}
              onClick={() => pushTab(drop)}
              className={cn(
                "flex flex-col justify-center items-center",
                "gap-2 p-2 rounded-lg",
                "bg-neutral-100 hover:bg-neutral-200"
              )}
              title={drop.title}
            >
              <img
                src={drop.icon}
                className="w-10 h-10 rounded-full shrink-0"
              />
              <h3 className={cn("min-w-0")}>{drop.title}</h3>
            </button>
          ))}
        </div>

        {/* Connect */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <a
            href="https://apexdrop.com.ng"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Website
          </a>
          &bull;
          <a
            href="https://t.me/Apex_Drop"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Channel
          </a>
          &bull;
          <a
            href="https://wa.me/2349018646163"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Dev
          </a>
        </div>
      </div>
    </div>
  );
}
