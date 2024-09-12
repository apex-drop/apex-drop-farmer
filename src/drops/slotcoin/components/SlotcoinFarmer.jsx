import SlotcoinIcon from "../assets/images/icon.png";
import SlotcoinLottery from "./SlotcoinLottery";
import SlotcoinInfoDisplay from "./SlotcoinInfoDisplay";

export default function SlotcoinFarmer() {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-center gap-2">
        <img
          src={SlotcoinIcon}
          alt="Slotcoin Farmer"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="font-bold">Slotcoin Farmer</h1>
      </div>

      {/* Info */}
      <SlotcoinInfoDisplay />

      {/* Lottery */}
      <SlotcoinLottery />
    </div>
  );
}
