import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useState } from "react";

import useTapCatLotteryMutation from "../hooks/useTapCatLotteryMutation";
import useTapCatProfileQuery from "../hooks/useTapCatProfileQuery";

export default function TapCatLottery() {
  const query = useTapCatProfileQuery();
  const energy = query.data?.["playing_tickets_amount"] || 0;

  const spinMutation = useTapCatLotteryMutation();

  const [autoSpin, setAutoSpin] = useState(false);
  const [working, setWorking] = useState(false);

  /** Handle button click */
  const handleAutoSpinClick = () => {
    setAutoSpin((previous) => !previous);
    setWorking(false);
  };

  useEffect(() => {
    if (!autoSpin || working) {
      return;
    }

    if (energy < 1) {
      setAutoSpin(false);
      setWorking(false);
      return;
    }

    (async function () {
      // Lock Process
      setWorking(true);

      /** Spin */
      try {
        await spinMutation.mutateAsync();
      } catch {}

      /** Refetch */
      try {
        await query.refetch();
      } catch {}

      /** Delay */
      await delay(3_000);

      // Release Lock
      setWorking(false);
    })();
  }, [autoSpin, energy, working]);

  return (
    <div className="p-4">
      {query.isPending ? (
        <div className="flex justify-center">Fetching Slots...</div>
      ) : // Error
      query.isError ? (
        <div className="flex justify-center text-orange-500">
          Failed to fetch slots...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          {/* Auto Spin Button */}
          <button
            disabled={energy < 1}
            onClick={handleAutoSpinClick}
            className={cn(
              "p-2 rounded-lg disabled:opacity-50",
              autoSpin ? "bg-white text-black" : "bg-black text-white",
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
