import AutoGamer from "./AutoGamer";
import BalanceDisplay from "./BalanceDisplay";
import FarmerHeader from "./FarmerHeader";
import UsernameDisplay from "./UsernameDisplay";

export default function Farmer() {
  return (
    <div className="p-4 flex flex-col">
      <FarmerHeader />
      <UsernameDisplay />
      <BalanceDisplay />
      <AutoGamer />
    </div>
  );
}
