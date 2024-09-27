import { useMutation } from "@tanstack/react-query";
import MajorFullscreenSpinner from "./MajorFullscreenSpinner";
import RouletteIcon from "../assets/images/roulette.svg";
import useMajorGame from "../hooks/useMajorGame";
import useMajorApi from "../hooks/useMajorApi";
import MajorGameButton from "./MajorGameButton";

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
      <MajorGameButton
        icon={RouletteIcon}
        title={"Roulette"}
        reward={10000}
        onClick={handleButtonClick}
      />

      {startMutation.isPending || claimMutation.isPending ? (
        <MajorFullscreenSpinner />
      ) : null}
    </>
  );
}
