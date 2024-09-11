import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useAgent301LotteryMutation from "../hooks/useAgent301LotteryMutation";
import useAgent301LotteryQuery from "../hooks/useAgent301LotteryQuery";

export default function Agent301Lottery() {
  const client = useQueryClient();
  const query = useAgent301LotteryQuery();
  const drawCount = useMemo(() => query.data?.["draw_count"], [query.data]);
  const [autoSpin, setAutoSpin] = useState(false);

  const spinMutation = useAgent301LotteryMutation();

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
      /** Fetch Lottery */
      await client.refetchQueries({
        queryKey: ["Agent301", "lottery"],
      });
      await spinMutation.reset();
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

          <button
            disabled={!drawCount}
            onClick={handleAutoSpinClick}
            className={cn(
              "p-2 text-black rounded-lg disabled:opacity-50",
              autoSpin ? "bg-red-500" : "bg-Agent301-green-500"
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
