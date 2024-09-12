import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useState } from "react";

import useAgent301BalanceQuery from "../hooks/useAgent301BalanceQuery";
import useAgent301LotteryMutation from "../hooks/useAgent301LotteryMutation";

export default function Agent301Lottery() {
  const [autoSpin, setAutoSpin] = useState(false);

  const balanceQuery = useAgent301BalanceQuery();
  const result = balanceQuery.data?.result;
  const tickets = result?.tickets;

  const spinMutation = useAgent301LotteryMutation();

  /** Handle button click */
  const handleAutoSpinClick = () => {
    setAutoSpin((previous) => !previous);
  };

  useEffect(() => {
    if (!autoSpin) {
      return;
    }

    if (tickets < 1) {
      setAutoSpin(false);
      return;
    }

    (async function () {
      await spinMutation.mutateAsync();

      await delay(10_000);

      await balanceQuery.refetch();
    })();
  }, [autoSpin, tickets]);

  return (
    <div className="p-4">
      {balanceQuery.isPending ? (
        <div className="flex justify-center">Loading...</div>
      ) : // Error
      balanceQuery.isError ? (
        <div className="flex justify-center text-red-500">
          Failed to fetch tickets...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          <button
            disabled={tickets < 1}
            onClick={handleAutoSpinClick}
            className={cn(
              "p-2 rounded-lg disabled:opacity-50",
              autoSpin ? "bg-red-500 text-black" : "bg-white text-black"
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
