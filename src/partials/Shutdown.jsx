import * as Dialog from "@radix-ui/react-dialog";
import AppIcon from "@/assets/images/icon.png?format=webp&w=80";
import useSocketDispatchCallback from "@/hooks/useSocketDispatchCallback";
import useSocketHandlers from "@/hooks/useSocketHandlers";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useMemo } from "react";

export default function Shutdown() {
  const [shutdown, dispatchAndShutdown] = useSocketDispatchCallback(
    /** Main */
    useCallback(() => {
      window.close();
    }, []),

    /** Dispatch */
    useCallback(
      (socket) =>
        socket.dispatch({
          action: "app.shutdown",
        }),
      []
    )
  );

  /** Handlers */
  useSocketHandlers(
    useMemo(
      () => ({
        "app.shutdown": () => {
          shutdown();
        },
      }),
      [shutdown]
    )
  );

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-40",
          "flex items-center justify-center",
          "p-4 overflow-auto bg-black/50"
        )}
      >
        <Dialog.Content className="flex flex-col w-full max-w-sm gap-2 p-4 bg-white rounded-xl">
          {/* Title */}
          <Dialog.Title
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "font-bold text-center"
            )}
          >
            <img src={AppIcon} className="w-8 h-8 rounded-full" />
            Apex Drop Farmer
          </Dialog.Title>

          {/* Description */}
          <Dialog.Description className="px-2 text-center text-neutral-600">
            Are you sure you want to close the farmer?
          </Dialog.Description>

          {/* Shutdown Button */}
          <button
            onClick={dispatchAndShutdown}
            className={cn("px-4 py-2 bg-red-500 text-white rounded-lg")}
          >
            Shutdown
          </button>

          {/* Cancel Button */}
          <Dialog.Close className={cn("px-4 py-2 bg-neutral-200 rounded-lg")}>
            Cancel
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
