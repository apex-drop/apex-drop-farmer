import * as Tabs from "@radix-ui/react-tabs";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import BitsBalanceDisplay from "./BitsBalanceDisplay";
import BitsIcon from "../assets/images/icon.png?format=webp&w=80";
import BitsSocialTasks from "./BitsSocialTasks";
import useBitsClaimFreeTicketMutation from "../hooks/useBitsClaimFreeTicketMutation";
import useBitsCollectDailyRewardMutation from "../hooks/useBitsCollectDailyRewardMutation";
import useBitsCollectPassiveFarmingMutation from "../hooks/useBitsCollectPassiveFarmingMutation";
import useBitsDailyRewardQuery from "../hooks/useBitsDailyRewardQuery";
import useBitsFreeSpinQuery from "../hooks/useBitsFreeSpinQuery";

export default function BitsFarmer() {
  const dailyRewardQuery = useBitsDailyRewardQuery();
  const freeSpinQuery = useBitsFreeSpinQuery();
  const freeTicketQuery = useBitsFreeTicketQuery();
  const claimFreeTicketMutation = useBitsClaimFreeTicketMutation();
  const collectDailyRewardMutation = useBitsCollectDailyRewardMutation();
  const collectPassiveFarmingMutation = useBitsCollectPassiveFarmingMutation();

  /** Claim Daily Reward */
  useEffect(() => {
    if (!dailyRewardQuery.data) return;

    (async function () {
      const data = dailyRewardQuery.data;
      const day = data.dailyRewards.find((item) => item.status === "Waiting");

      if (day) {
        await collectDailyRewardMutation.mutateAsync(day.position);
        toast.success("Bits - Collected Daily Reward");
      }
    })();
  }, [dailyRewardQuery.data]);
  return (
    <div className="flex flex-col gap-2 py-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img src={BitsIcon} alt="Bits Farmer" className="w-8 h-8" />
        <h1 className="font-bold">Bits Farmer</h1>
      </div>

      {/* Balance Display */}
      <BitsBalanceDisplay />

      <Tabs.Root defaultValue="tasks" className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-1">
          {["tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b-2 border-transparent",
                "data-[state=active]:border-white"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="tasks">
          <BitsSocialTasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
