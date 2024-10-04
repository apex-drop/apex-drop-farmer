import * as Tabs from "@radix-ui/react-tabs";
import useSocketTabs from "@/hooks/useSocketTabs";
import { CgSpinner } from "react-icons/cg";
import { cn } from "@/lib/utils";

import CookieIcon from "../assets/images/cookie.png";
import HrumBalanceDisplay from "./HrumBalanceDisplay";
import HrumIcon from "../assets/images/icon.png";
import HrumRiddleTask from "./HrumRiddleTask";
import useHrumAllQuery from "../hooks/useHrumAllQuery";

export default function () {
  const allQuery = useHrumAllQuery();
  const tabs = useSocketTabs("hrum.farmer-tabs", "daily");

  return allQuery.isPending ? (
    <div className="flex items-center justify-center grow">
      <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
    </div>
  ) : allQuery.isSuccess ? (
    <div className="flex flex-col gap-2 p-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img
          src={HrumIcon}
          alt="Hrum Farmer"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="font-bold">Hrum Farmer</h1>
      </div>
      {/* Balance */}
      <HrumBalanceDisplay balance={allQuery.data.hero.token} />

      {/* Cookie Icon */}
      <img src={CookieIcon} className="w-20 h-20 mx-auto my-4" />

      <Tabs.Root {...tabs} className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-2">
          {["daily", "tasks"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b-4 border-transparent",
                "data-[state=active]:border-yellow-500"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="daily">
          {/* Hrum Riddle */}
          <HrumRiddleTask />
        </Tabs.Content>
        <Tabs.Content value="tasks"></Tabs.Content>
      </Tabs.Root>
    </div>
  ) : (
    <div className="flex items-center justify-center text-red-500 grow">
      Error...
    </div>
  );
}
