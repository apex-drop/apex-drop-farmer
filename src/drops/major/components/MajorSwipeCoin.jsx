import { useMutation } from "@tanstack/react-query";
import SwipeCoinIcon from "../assets/images/swipe-coin.svg";
import useMajorAuth from "../hooks/useMajorAuth";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import axios from "axios";
import StarIcon from "../assets/images/star-amount.svg";
import useMajorGame from "../hooks/useMajorGame";

export default function MajorSwipeCoin() {
  const game = useMajorGame();
  const Authorization = useMajorAuth();
  const startMutation = useMutation({
    mutationKey: ["major", "swipe-coin", "start"],
    mutationFn: () =>
      axios
        .get("https://major.bot/api/swipe_coin/", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "swipe-coin", "claim"],
    mutationFn: (coins) =>
      axios
        .post(
          "https://major.bot/api/swipe_coin/",
          { coins },
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
      () =>
        claimMutation.mutateAsync(
          Math.min(+prompt("Coins", "2000") || 2000, 3000)
        )
    );
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50"
      >
        <img src={SwipeCoinIcon} className="w-10 h-10 shrink-0" />
        <div>
          <h1 className="font-bold">Swipe Coin</h1>
          <p className="text-orange-500">
            +3,000 <img src={StarIcon} className="inline h-4" />
          </p>
        </div>
      </button>

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}
    </>
  );
}