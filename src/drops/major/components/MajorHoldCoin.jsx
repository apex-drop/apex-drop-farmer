import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import HoldCoinIcon from "../assets/images/hold-coin.svg";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import StarIcon from "../assets/images/star-amount.svg";
import useMajorGame from "../hooks/useMajorGame";
import useMajorApi from "../hooks/useMajorApi";
import toast from "react-hot-toast";

export default function MajorHoldCoin() {
  const game = useMajorGame();
  const api = useMajorApi();

  const startMutation = useMutation({
    retry(failureCount, e) {
      return !e.response?.data?.detail?.["blocked_until"];
    },
    mutationKey: ["major", "hold-coin", "start"],
    mutationFn: () =>
      api.get("https://major.bot/api/bonuses/coins/").then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "hold-coin", "claim"],
    mutationFn: () =>
      toast
        .promise(
          delay(2_000),
          {
            loading: "Delaying for 2 secs..",
            success: "Done!",
            error: "Error!",
          },
          {
            style: {
              fontWeight: "bold",
            },
          }
        )
        .then(() =>
          api.post("https://major.bot/api/bonuses/coins/", { coins: 915 })
        )
        .then((res) => res.data),
  });

  const handleButtonClick = () => {
    game(
      () => startMutation.mutateAsync(),
      () => claimMutation.mutateAsync()
    );
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50"
      >
        <img src={HoldCoinIcon} className="w-10 h-10 shrink-0" />
        <div>
          <h1 className="font-bold">Hold Coin</h1>
          <p className="text-orange-500">
            +915 <img src={StarIcon} className="inline h-4" />
          </p>
        </div>
      </button>

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}
    </>
  );
}
