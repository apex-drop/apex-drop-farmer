import { useMutation } from "@tanstack/react-query";
import HoldCoinIcon from "../assets/images/hold-coin.svg";
import StarIcon from "../assets/images/star-amount.svg";
import useMajorAuth from "../hooks/useMajorAuth";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import axios from "axios";
import useMajorGame from "../hooks/useMajorGame";

export default function MajorHoldCoin() {
  const game = useMajorGame();
  const Authorization = useMajorAuth();
  const startMutation = useMutation({
    retry(failureCount, e) {
      return !e.response?.data?.detail?.["blocked_until"];
    },
    mutationKey: ["major", "hold-coin", "start"],
    mutationFn: () =>
      axios
        .get("https://major.bot/api/bonuses/coins/", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "hold-coin", "claim"],
    mutationFn: () =>
      axios
        .post(
          "https://major.bot/api/bonuses/coins/",
          { coins: 915 },
          {
            withCredentials: true,
            headers: {
              Authorization,
            },
          }
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
