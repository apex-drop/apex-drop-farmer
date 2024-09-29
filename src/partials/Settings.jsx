import * as Dialog from "@radix-ui/react-dialog";
import LabelToggle from "@/components/LabelToggle";
import { CgSpinner } from "react-icons/cg";
import { cn, getSettings } from "@/lib/utils";
import { useEffect } from "react";
import { useState } from "react";
import useSocketHandlers from "@/hooks/useSocketHandlers";
import { useMemo } from "react";
import useSocketDispatchCallback from "@/hooks/useSocketDispatchCallback";
import { useCallback } from "react";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [configureSettings, dispatchAndConfigureSettings] =
    useSocketDispatchCallback(
      /** Configure Settings */
      useCallback(
        (k, v) => {
          const newSettings = {
            ...settings,
            [k]: v,
          };

          chrome?.storage?.local.set({
            settings: newSettings,
          });
        },
        [settings]
      ),

      /** Dispatch */
      useCallback(
        (socket, k, v) =>
          socket.dispatch({
            action: "settings.set-value",
            data: {
              key: k,
              value: v,
            },
          }),
        []
      )
    );

  /** Set initial settings */
  useEffect(() => {
    getSettings().then((settings) => {
      setSettings(settings);
    });

    const watchStorage = ({ settings }) => {
      if (settings) {
        setSettings(settings.newValue);
      }
    };

    /** Listen for change */
    chrome?.storage?.local?.onChanged.addListener(watchStorage);

    return () => {
      /** Remove Listener */
      chrome?.storage?.local?.onChanged.removeListener(watchStorage);
    };
  }, []);

  /** Handlers */
  useSocketHandlers(
    useMemo(
      () => ({
        "settings.set-value": (command) => {
          configureSettings(command.data.key, command.data.value);
        },
      }),
      [configureSettings]
    )
  );

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        className={cn(
          "fixed inset-x-0 bottom-0 flex flex-col bg-white h-3/4 rounded-t-xl",
          "flex flex-col"
        )}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        {settings ? (
          <>
            <div className="flex flex-col gap-2 p-4 overflow-auto grow">
              <Dialog.Title className="text-lg font-bold text-center">
                <span
                  className={cn(
                    "text-transparent font-bold",
                    "bg-clip-text",
                    "bg-gradient-to-r from-pink-500 to-violet-500"
                  )}
                >
                  Settings
                </span>
              </Dialog.Title>
              <Dialog.Description className="text-center text-neutral-500">
                Configure the Farmer
              </Dialog.Description>

              <form className="flex flex-col gap-2 py-4">
                {/* Open Farmer in new Window */}
                <LabelToggle
                  onChange={(ev) =>
                    dispatchAndConfigureSettings(
                      "openFarmerInNewWindow",
                      ev.target.checked
                    )
                  }
                  checked={settings?.openFarmerInNewWindow}
                >
                  Open Farmer in new Window - (PC)
                </LabelToggle>

                {/* Open Telegram Web within the Farmer */}
                <LabelToggle
                  onChange={(ev) =>
                    dispatchAndConfigureSettings(
                      "openTelegramWebWithinFarmer",
                      ev.target.checked
                    )
                  }
                  checked={settings?.openTelegramWebWithinFarmer}
                >
                  Launch Telegram Web within the Farmer
                </LabelToggle>
              </form>
            </div>
            <div className="flex flex-col p-4 font-bold shrink-0">
              <Dialog.Close className="p-2.5 text-white bg-black rounded-xl">
                Close
              </Dialog.Close>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center grow">
            <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
