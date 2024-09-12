import { useMutation } from "@tanstack/react-query";
import RouletteIcon from "../assets/images/roulette.svg";
import useMajorAuth from "../hooks/useMajorAuth";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import axios from "axios";
import StarIcon from "../assets/images/star-amount.svg";
import useMajorGame from "../hooks/useMajorGame";

export default function MajorRoulette() {
  const game = useMajorGame();
  const Authorization = useMajorAuth();
  const startMutation = useMutation({
    mutationKey: ["major", "roulette", "start"],
    mutationFn: () =>
      axios
        .get("https://major.bot/api/roulette/", {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
        .then((res) => res.data),
  });

  const claimMutation = useMutation({
    mutationKey: ["major", "roulette", "claim"],
    mutationFn: () =>
      axios
        .post("https://major.bot/api/roulette/", null, {
          withCredentials: true,
          headers: {
            Authorization,
          },
        })
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
