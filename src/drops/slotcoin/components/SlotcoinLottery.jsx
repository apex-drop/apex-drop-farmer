import { cn, delay } from "@/lib/utils";
import { useEffect } from "react";
import { useState } from "react";

import EnergyIcon from "../assets/images/energy.png";
import useSlotcoinLotteryMutation from "../hooks/useSlotcoinLotteryMutation";
import useSlotcoinInfoQuery from "../hooks/useSlotcoinInfoQuery";

export default function SlotcoinLottery() {
  const query = useSlotcoinInfoQuery();
  const balance = query.data?.user?.balance || 0;
  const energy = query.data?.user?.spins || 0;
  const maxEnergy = query.data?.user?.["max_spins"] || 0;

  const spinMutation = useSlotcoinLotteryMutation();

  const [autoSpin, setAutoSpin] = useState(false);

  /** Handle button click */
  const handleAutoSpinClick = () => {
    setAutoSpin((previous) => !previous);
  };

  useEffect(() => {
    if (!autoSpin) {
      return;
    }

    if (energy < 1) {
      setAutoSpin(false);
      return;
    }

    (async function () {
      await spinMutation.mutateAsync();

      await delay(2_000);

      await query.refetch();
    })();
  }, [autoSpin, energy, balance]);

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
