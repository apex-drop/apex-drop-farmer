import * as Dialog from "@radix-ui/react-dialog";
import AppIcon from "@/assets/images/icon.png?format=webp&w=224";
import Settings from "@/partials/Settings";
import TelegramWebAIcon from "@/assets/images/telegram-web-a.png?format=webp&w=80";
import TelegramWebKIcon from "@/assets/images/telegram-web-k.png?format=webp&w=80";
import defaultSettings from "@/default-settings";
import toast from "react-hot-toast";
import useAppContext from "@/hooks/useAppContext";
import useSocketDispatchCallback from "@/hooks/useSocketDispatchCallback";
import useSocketHandlers from "@/hooks/useSocketHandlers";
import useSocketState from "@/hooks/useSocketState";
import {
  HiOutlineArrowPath,
  HiOutlineCog6Tooth,
  HiOutlinePower,
  HiOutlinePuzzlePiece,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

import DropButton from "./components/DropButton";
import Shutdown from "./partials/Shutdown";
import farmerTabs from "./farmerTabs";

export default function Welcome() {
  const [showSettings, setShowSettings, dispatchAndSetShowSettings] =
    useSocketState("app.toggle-settings", false);

  const { settings, socket, pushTab, closeTab } = useAppContext();

  /** Hidden Toggle */
  const [showHidden, setShowHidden] = useState(import.meta.env.DEV);

  /** Drops List */
  const drops = useMemo(
    () =>
      farmerTabs.filter(
        (item) =>
          !["apex-drop-farmer", "telegram-web-k", "telegram-web-a"].includes(
            item.id
          ) &&
          (showHidden || !item.hidden)
      ),
    [showHidden, farmerTabs]
  );

  /** Show Hidden Drops */
  const [showHiddenDrops, dispatchAndShowHiddenDrops] =
    useSocketDispatchCallback(
      /** Main */
      useCallback(() => {
        setShowHidden(true);
        toast.success("Unlocked hidden farmer!");
      }, [setShowHidden]),

      /** Dispatch */
      useCallback(
        (socket, drop) =>
          socket.dispatch({
            action: "app.show-hidden-drops",
          }),
        []
      )
    );

  const [, dispatchAndPushTab] = useSocketDispatchCallback(
    /** Main */
    pushTab,

    /** Dispatch */
    useCallback(
      (socket, drop) =>
        socket.dispatch({
          action: "app.push-tab",
          data: {
            id: drop.id,
          },
        }),
      []
    )
  );

  /** Find And Push Tab */
  const [findAndPushTab, dispatchThenFindAndPushTab] =
    useSocketDispatchCallback(
      /** Main */
      useCallback(
        (id) => {
          pushTab(farmerTabs.find((item) => item.id === id));
        },
        [farmerTabs, pushTab]
      ),

      /** Dispatch */
      useCallback(
        (socket, id) =>
          socket.dispatch({
            action: "app.push-tab",
            data: {
              id,
            },
          }),
        []
      )
    );
  /** Navigate to Telegram Web */
  const [navigateToTelegramWeb, dispatchAndNavigateToTelegramWeb] =
    useSocketDispatchCallback(
      /** Main */
      useCallback(
        (v) =>
          chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
            chrome?.tabs?.update(tabs[0].id, {
              url: `https://web.telegram.org/${v}`,
              active: true,
            });
          }),
        []
      ),

      /** Dispatch */
      useCallback(
        (socket, v) =>
          socket.dispatch({
            action: "app.navigate-to-telegram-web",
            data: {
              version: v,
            },
          }),
        []
      )
    );

  /** Open Telegram Web */
  const openTelegramWeb = useCallback(
    (v) => {
      if (settings.openTelegramWebWithinFarmer) {
        dispatchThenFindAndPushTab(`telegram-web-${v}`);
      } else {
        dispatchAndNavigateToTelegramWeb(v);
      }
    },
    [settings, dispatchThenFindAndPushTab, dispatchAndNavigateToTelegramWeb]
  );

  /** Open Extensions Page */
  const openExtensionsPage = useCallback(async () => {
    await chrome?.windows?.create({
      url: "chrome://extensions",
      state: "maximized",
      focused: true,
    });
  }, []);

  /** Open Farmer in Separate Window */
  const [reload, dispatchAndReload] = useSocketDispatchCallback(
    /** Main */
    useCallback(() => {
      window.location.reload();
    }, []),

    /** Dispatch */
    useCallback(
      (socket) =>
        socket.dispatch({
          action: "app.reload",
        }),
      []
    )
  );

  /** Handlers */
  useSocketHandlers(
    useMemo(
      () => ({
        "app.reload": () => {
          reload();
        },

        "app.show-hidden-drops": () => {
          showHiddenDrops();
        },
        "app.set-active-tab": (command) => {
          findAndPushTab(command.data.id);
        },

        "app.push-tab": (command) => {
          findAndPushTab(command.data.id);
        },

        "app.close-tab": (command) => {
          closeTab(command.data.id);
        },

        "app.navigate-to-telegram-web": (command) => {
          navigateToTelegramWeb(command.data.version);
        },
      }),
      [reload, showHiddenDrops, findAndPushTab, closeTab, navigateToTelegramWeb]
    )
  );

  /** Update Title */
  useEffect(() => {
    document.title = `${
      settings.farmerTitle || defaultSettings.farmerTitle
    } - Apex Drop Farmer`;
  }, [settings]);

  return (
    <>
      {/* Settings and New Window Button */}
      <div className="p-4 shrink-0">
        <div className="flex justify-between w-full gap-2 mx-auto max-w-96">
          <div className="flex gap-2">
            {/* Shutdown */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  title="Shutdown Farmer"
                  className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
                >
                  <HiOutlinePower className="w-5 h-5" />
                </button>
              </Dialog.Trigger>
              <Shutdown />
            </Dialog.Root>

            {/* Reload Window */}
            <button
              title="Reload Farmer"
              onClick={dispatchAndReload}
              className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
            >
              <HiOutlineArrowPath className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            {/* Open Extensions Page */}
            <button
              title="Open Extensions Page"
              onClick={openExtensionsPage}
              className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
            >
              <HiOutlinePuzzlePiece className="w-5 h-5" />
            </button>

            {/* Settings */}
            <Dialog.Root
              open={showSettings}
              onOpenChange={dispatchAndSetShowSettings}
            >
              <Dialog.Trigger
                title="Settings"
                className="p-2.5 rounded-full bg-neutral-50 hover:bg-neutral-100 shrink-0"
              >
                <HiOutlineCog6Tooth className="w-5 h-5" />
              </Dialog.Trigger>

              <Settings />
            </Dialog.Root>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 overflow-auto grow">
        <div className="flex flex-col w-full gap-2 mx-auto my-auto max-w-96">
          <img
            src={AppIcon}
            className="w-20 h-20 mx-auto"
            onDoubleClick={dispatchAndShowHiddenDrops}
          />
          <h3 className="text-xl font-bold text-center font-turret-road">
            Apex Drop Farmer
          </h3>
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
          <p
            onClick={() => setShowSettings(true)}
            className="font-bold text-center text-blue-500 cursor-pointer"
          >
            {settings.farmerTitle || defaultSettings.farmerTitle}
          </p>
          <p
            className={cn(
              "text-center",
              socket.connected ? "text-green-500" : "text-red-500"
            )}
          >
            {socket.connected ? "Connected" : "Disconnected"}
          </p>
          <p className="p-2 text-center text-yellow-700 bg-yellow-100 rounded-lg">
            By using the farmer you acknowledge that your account is at risk.
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
              <DropButton
                key={index}
                drop={drop}
                onClick={() => dispatchAndPushTab(drop)}
              />
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
              href="https://t.me/apex_drop"
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
    </>
  );
}
