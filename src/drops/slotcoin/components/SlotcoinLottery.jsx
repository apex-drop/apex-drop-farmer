import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useState } from "react";

import EnergyIcon from "../assets/images/energy.png?format=webp";
import useSlotcoinInfoQuery from "../hooks/useSlotcoinInfoQuery";
import useSlotcoinLotteryMutation from "../hooks/useSlotcoinLotteryMutation";

export default function SlotcoinLottery() {
  const query = useSlotcoinInfoQuery();
  const energy = query.data?.user?.spins || 0;
  const maxEnergy = query.data?.user?.["max_spins"] || 0;

  const spinMutation = useSlotcoinLotteryMutation();

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

      try {
        await spinMutation.mutateAsync();
      } catch {}

      try {
        await query.refetch();
      } catch {}

      // Release Lock
      setWorking(false);
    })();
  }, [autoSpin, energy, working]);

  return (
    <div className="p-4">
      {query.isPending ? (
        <div className="flex justify-center">Fetching Spins...</div>
      ) : // Error
      query.isError ? (
        <div className="flex justify-center text-red-500">
          Failed to fetch lottery...
        </div>
      ) : (
        // Success
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-center text-purple-500">
            <img src={EnergyIcon} className="inline w-5" /> {energy} /{" "}
            {maxEnergy}
          </h3>

          {/* Auto Spin Button */}
          <button
            disabled={energy < 1}
            onClick={handleAutoSpinClick}
            className={cn(
              "p-2 text-white rounded-lg disabled:opacity-50",
              autoSpin ? "bg-red-500" : "bg-purple-500",
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
