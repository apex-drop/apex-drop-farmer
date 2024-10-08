import toast from "react-hot-toast";
import useProcessLock from "@/hooks/useProcessLock";
import { CgSpinner } from "react-icons/cg";
import { cn, delay } from "@/lib/utils";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import NotPixelIcon from "../assets/images/icon.png?format=webp&w=80";
import useNotPixelMiningStatusQuery from "../hooks/useNotPixelMiningStatusQuery";
import useNotPixelRepaintMutation from "../hooks/useNotPixelRepaintMutation";

export default function NotPixelApp({ diff }) {
  const miningQuery = useNotPixelMiningStatusQuery();
  const mining = miningQuery.data;
  const process = useProcessLock();
  const repaintMutation = useNotPixelRepaintMutation();
  const [color, setColor] = useState(null);

  /** Start */
  const startFarming = useCallback(() => {
    process.start();
    setColor(null);
  }, [process, setColor]);

  /** Stop */
  const stopFarming = useCallback(() => {
    process.stop();
    setColor(null);
  }, [process, setColor]);

  /** Farmer */
  useEffect(() => {
    if (!process.canExecute) return;

    if (mining.charges < 1) {
      process.stop();
      return;
    }

    (async function () {
      /** Lock Process */
      process.lock();

      try {
        const item = diff[Math.floor(Math.random() * diff.length)];

        if (item) {
          const [pixelId, pixel] = item;
          const newColor = pixel.color;

          setColor(newColor);

          if (!process.signal.aborted) {
            const data = await repaintMutation.mutateAsync({
              pixelId,
              newColor,
            });

            /** Show Difference */
            toast.success(`+${data.balance - mining.userBalance}`);

            /** Delay */
            await delay(5_000);
          }

          /** Refetch */
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

      {miningQuery.isSuccess ? (
        <>
          <h1 className="text-3xl text-center">{mining.userBalance}</h1>
          <h2 className="text-center">Charges: {mining.charges}</h2>

          <button
            onClick={!process.started ? startFarming : stopFarming}
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
