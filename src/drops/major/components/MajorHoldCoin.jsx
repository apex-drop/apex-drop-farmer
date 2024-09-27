import toast from "react-hot-toast";
import { delay } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import HoldCoinIcon from "../assets/images/hold-coin.svg";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import MajorGameButton from "./MajorGameButton";
import useMajorApi from "../hooks/useMajorApi";
import useMajorGame from "../hooks/useMajorGame";

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
            className: "font-bold font-sans",
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
      <MajorGameButton
        icon={HoldCoinIcon}
        title={"Hold Coin"}
        reward={915}
        onClick={handleButtonClick}
      />

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}
    </>
  );
}
