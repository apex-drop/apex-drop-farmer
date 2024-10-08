import * as Tabs from "@radix-ui/react-tabs";
import toast from "react-hot-toast";
import useSocketTabs from "@/hooks/useSocketTabs";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import BlumAutoGamer from "./BlumAutoGamer";
import BlumAutoTasks from "./BlumAutoTasks";
import BlumBalanceDisplay from "./BlumBalanceDisplay";
import BlumFarmerHeader from "./BlumFarmerHeader";
import BlumUsernameDisplay from "./BlumUsernameDisplay";
import useBlumBalanceQuery from "../hooks/useBlumBalanceQuery";
import useBlumClaimFarmingMutation from "../hooks/useBlumClaimFarmingMutation";
import useBlumDailyRewardMutation from "../hooks/useBlumDailyRewardMutation";
import useBlumNowQuery from "../hooks/useBlumNowQuery";
import useBlumStartFarmingMutation from "../hooks/useBlumStartFarmingMutation";

export default function BlumFarmer() {
  const tabs = useSocketTabs("blum.farmer-tabs", "game");
  const dailyRewardMutation = useBlumDailyRewardMutation();
  const startFarmingMutation = useBlumStartFarmingMutation();
  const claimFarmingMutation = useBlumClaimFarmingMutation();
  const nowQuery = useBlumNowQuery();
  const balanceQuery = useBlumBalanceQuery();

  useEffect(() => {
    (async function () {
      try {
        await dailyRewardMutation.mutateAsync();
        toast.success("Blum Daily Check-In");
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (!nowQuery.data || !balanceQuery.data) {
      return;
    }

    (async function () {
      const now = nowQuery.data.now;
      const balance = balanceQuery.data;
      const farming = balance.farming;

      if (!balance.isFastFarmingEnabled) {
        await startFarmingMutation.mutateAsync();
        toast.success("Blum Started Farming");
      } else if (balance.timestamp >= farming.endTime) {
        await claimFarmingMutation.mutateAsync();
        toast.success("Blum Claimed Previous Farming");

        await startFarmingMutation.mutateAsync();
        toast.success("Blum Started Farming");
      }
    })();
  }, [nowQuery.data, balanceQuery.data]);

  return (
    <div className="flex flex-col p-4">
      <BlumFarmerHeader />
      <BlumUsernameDisplay />
      <BlumBalanceDisplay />

      <Tabs.Root {...tabs} className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-2">
          {["game", "tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b border-transparent",
                "data-[state=active]:border-blum-green-500"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="game">
          <BlumAutoGamer />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <BlumAutoTasks />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
