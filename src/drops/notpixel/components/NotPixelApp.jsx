import toast from "react-hot-toast";
import useProcessLock from "@/hooks/useProcessLock";
import useSocketDispatchCallback from "@/hooks/useSocketDispatchCallback";
import useSocketHandlers from "@/hooks/useSocketHandlers";
import { CgSpinner } from "react-icons/cg";
import { cn, delay } from "@/lib/utils";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

import NotPixelIcon from "../assets/images/icon.png?format=webp";
import useNotPixelDataQueries from "../hooks/useNotPixelDataQueries";
import useNotPixelRepaintMutation from "../hooks/useNotPixelRepaintMutation";

export default function NotPixelApp({ diff }) {
  const dataQueries = useNotPixelDataQueries();
  const [userQuery, miningQuery] = dataQueries.query;
  const [user, mining] = dataQueries.data;
  const process = useProcessLock();
  const repaintMutation = useNotPixelRepaintMutation();
  const [color, setColor] = useState(null);

  /** Start */
  const [startFarming, dispatchAndStartFarming] = useSocketDispatchCallback(
    /** Main */
    useCallback(() => {
      process.start();
      setColor(null);
    }, [process, setColor]),

    /** Dispatch */
    useCallback((socket) => {
      socket.dispatch({
        action: "notpixel.repaint.start",
      });
    }, [])
  );

  /** Stop */
  const [stopFarming, dispatchAndStopFarming] = useSocketDispatchCallback(
    /** Main */
    useCallback(() => {
      process.stop();
      setColor(null);
    }, [process, setColor]),

    /** Dispatch */
    useCallback((socket) => {
      socket.dispatch({
        action: "notpixel.repaint.stop",
      });
    }, [])
  );

  /** Sync Handlers */
  useSocketHandlers(
    useMemo(
      () => ({
        "notpixel.repaint.start": () => {
          startFarming();
        },
        "notpixel.repaint.stop": () => {
          stopFarming();
        },
      }),
      [startFarming, stopFarming]
    )
  );

  /** Farmer */
  useEffect(() => {
    if (mining?.charges < 1 && process.started) {
      process.stop();
    }

    if (!process.canExecute) return;

    (async function () {
      /** Lock Process */
      process.lock();

      try {
        const pixel = diff[Math.floor(Math.random() * diff.length)];

        if (pixel) {
          const [pixelId, newColor] = pixel;

          setColor(newColor);

          const data = await repaintMutation.mutateAsync({
            pixelId,
            newColor,
          });

          /** Show Difference */
          toast.success(`+${data.balance - mining.userBalance}`);

          /** Delay */
          await delay(3000);
          await miningQuery.refetch();
        }
      } catch {}

      /** Reset Color */
      setColor(null);

      /** Reset Mutation */
      repaintMutation.reset();

      /** Release Lock */
      process.unlock();
    })();
  }, [process, diff, mining]);

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img
          src={NotPixelIcon}
          alt="Not Pixel Farmer"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="font-bold">Not Pixel Farmer</h1>
      </div>

      {dataQueries.isSuccess ? (
        <>
          <h1 className="text-3xl text-center">{mining.userBalance}</h1>
          <h2 className="text-center">Charges: {mining.charges}</h2>

          <button
            onClick={
              !process.started
                ? dispatchAndStartFarming
                : dispatchAndStopFarming
            }
            disabled={mining.charges < 1}
            className={cn(
              "text-white px-4 py-2 rounded-lg disabled:opacity-50",
              !process.started ? "bg-black" : "bg-red-500"
            )}
          >
            {!process.started ? "Start Farming" : "Stop Farming"}
          </button>

          {process.started ? (
            <>
              <div className="flex flex-col items-center justify-center gap-2">
                {/* Color */}
                {color ? (
                  <div
                    className="w-10 h-10 border rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ) : null}

                <div
                  className={cn(
                    "text-center",
                    {
                      pending: "text-orange-500",
                      success: "text-green-500",
                      error: "text-red-500",
                    }[repaintMutation.status]
                  )}
                >
                  {
                    {
                      idle: "Waiting...",
                      pending: "Painting...",
                      success: "Painted!",
                      error: "Error..",
                    }[repaintMutation.status]
                  }
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
      )}
    </div>
  );
}
