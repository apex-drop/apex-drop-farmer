import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import usePumpadLotteryMutation from "../hooks/usePumpadLotteryMutation";
import usePumpadLotteryQuery from "../hooks/usePumpadLotteryQuery";

export default function PumpadLottery() {
  const client = useQueryClient();

  const query = usePumpadLotteryQuery();
  const drawCount = useMemo(() => query.data?.["draw_count"], [query.data]);

  const spinMutation = usePumpadLotteryMutation();

  const [autoSpin, setAutoSpin] = useState(false);

  /** Handle button click */
  const handleAutoSpinClick = () => {
    setAutoSpin((previous) => !previous);
  };

  useEffect(() => {
    if (!autoSpin) {
      return;
    }

    if (!drawCount) {
      setAutoSpin(false);
      return;
    }

    (async function () {
      await spinMutation.mutateAsync();

      client.setQueryData(["pumpad", "lottery"], (previous) => {
        return { ...previous, draw_count: previous["draw_count"] - 1 };
      });
    })();
  }, [autoSpin, drawCount]);

  return (
    <div className="p-4">
      {query.isPending ? (
        <div className="flex justify-center">Fetching Lottery...</div>
      ) : // Error
      query.isError ? (
        <div className="flex justify-center text-red-500">
          Failed to fetch lottery...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-center">{drawCount}</h3>
          <p className="text-center text-neutral-500">Lottery</p>

          {/* Auto Spin Button */}
          <button
            disabled={!drawCount}
            onClick={handleAutoSpinClick}
            className={cn(
              "p-2 text-black rounded-lg disabled:opacity-50",
              autoSpin ? "bg-red-500" : "bg-pumpad-green-500",
              "font-bold"
            )}
          >
            {autoSpin ? "Stop" : "Start"}
          </button>

          {autoSpin ? <div className="text-center">Working....</div> : null}
        </div>
      )}
    </div>
  );
}
