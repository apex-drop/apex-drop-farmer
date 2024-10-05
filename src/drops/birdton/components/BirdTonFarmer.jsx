import * as Tabs from "@radix-ui/react-tabs";
import useSocketTabs from "@/hooks/useSocketTabs";
import { CgSpinner } from "react-icons/cg";
import { cn } from "@/lib/utils";

import BirdTonGamer from "./BirdTonGamer";
import BirdTonIcon from "../assets/images/icon.png?format=webp";
import CoinIcon from "../assets/images/coin.png?format=webp";
import EnergyIcon from "../assets/images/energy.png?format=webp";
import useBirdTonFarmerContext from "../hooks/useBirdTonFarmerContext";

export default function BirdTonFarmer() {
  const { connected, authQuery } = useBirdTonFarmerContext();
  const user = authQuery.data;
  const energy = user["energy"] || 0;
  const maxEnergy = user["energy_capacity"] || 0;
  const tabs = useSocketTabs("birdton.farmer-tabs", "game");

  return connected ? (
    <div className="flex flex-col gap-2 p-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img
          src={BirdTonIcon}
          alt="BirdTON Farmer"
          className="w-5 h-5 rounded-full"
        />
        <h1 className="font-bold">BirdTON Farmer</h1>
      </div>

      {/* Balance */}
      <h3 className="flex items-center justify-center gap-2 text-3xl font-bold text-center">
        <img src={CoinIcon} className="inline w-9 h-9" />{" "}
        {Intl.NumberFormat().format(user["balance"])}
      </h3>

      <h4 className="flex justify-center text-sm font-bold text-center">
        <span className="py-1.5 px-2 text-sky-500">
          <img src={EnergyIcon} className="inline w-5" /> {energy} / {maxEnergy}
        </span>
      </h4>

      <Tabs.Root {...tabs} className="flex flex-col gap-4">
        <Tabs.List className="grid grid-cols-1">
          {["game"].map((value, index) => (
            <Tabs.Trigger
              key={index}
              value={value}
              className={cn(
                "p-2",
                "border-b-4 border-transparent",
                "data-[state=active]:border-sky-500"
              )}
            >
              {value.toUpperCase()}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="game">
          {/* Gamer */}
          <BirdTonGamer />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ) : (
    <div className="flex items-center justify-center grow">
      <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
    </div>
  );
}
