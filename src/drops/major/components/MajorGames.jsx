import MajorHoldCoin from "./MajorHoldCoin";
import MajorRoulette from "./MajorRoulette";
import MajorSwipeCoin from "./MajorSwipeCoin";

export default function MajorGames() {
  return (
    <div className="flex flex-col gap-2 py-4">
      <MajorHoldCoin />
      <MajorRoulette />
      <MajorSwipeCoin />
    </div>
  );
}
