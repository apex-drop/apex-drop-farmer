import * as Tabs from "@radix-ui/react-tabs";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { isToday } from "date-fns";
import { useEffect } from "react";

import TadaBalanceDisplay from "./TadaBalanceDisplay";
import TadaIcon from "../assets/images/icon.png?format=webp&w=80";
import TadaMissions from "./TadaMissions";
import useTadaCheckInMutation from "../hooks/useTadaCheckInMutation";
import useTadaCheckInQuery from "../hooks/useTadaCheckInQuery";

export default function TadaFarmer() {
  const checkInQuery = useTadaCheckInQuery();
  const checkInMutation = useTadaCheckInMutation();

  useEffect(() => {
    if (!checkInQuery.data) return;

    (async function () {
      const checkIn = checkInQuery.data;
      const result = checkIn.result;

      if (!isToday(checkIn.lastCheckinTime)) {
        const day = result.find((item) => !item.status);
        await checkInMutation.mutateAsync(day["_id"]);
        toast.success("Tada Daily Check-In");
      }
    })();
  }, [checkInQuery.data]);
  return (
    <div className="flex flex-col gap-2 py-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img src={TadaIcon} alt="Tada Farmer" className="w-8 h-8" />
        <h1 className="font-bold">Tada Farmer</h1>
      </div>

      {/* Balance Display */}
      <TadaBalanceDisplay />

      <Tabs.Root defaultValue="missions" className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-1">
          {["missions"].map((value, index) => (
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
        <Tabs.Content value="missions">
          <TadaMissions />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}