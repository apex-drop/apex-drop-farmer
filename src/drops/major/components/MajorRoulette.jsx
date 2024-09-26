import { useMutation } from "@tanstack/react-query";

import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import RouletteIcon from "../assets/images/roulette.svg";
import StarIcon from "../assets/images/star-amount.svg";
import useMajorGame from "../hooks/useMajorGame";
import useMajorApi from "../hooks/useMajorApi";

export default function MajorRoulette() {
  const game = useMajorGame();
  const api = useMajorApi();
  const startMutation = useMutation({
    retry(failureCount, e) {
      return !e.response?.data?.detail?.["blocked_until"];
    },
    mutationKey: ["major", "roulette", "start"],
    mutationFn: () =>
      api.get("https://major.bot/api/roulette/").then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "roulette", "claim"],
    mutationFn: () =>
      api.post("https://major.bot/api/roulette/", null).then((res) => res.data),
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
        <img src={RouletteIcon} className="w-10 h-10 shrink-0" />
        <div>
          <h1 className="font-bold">Roulette</h1>
          <p className="text-orange-500">
            +10,000 <img src={StarIcon} className="inline h-4" />
          </p>
        </div>
      </button>

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}
    </>
  );
}
