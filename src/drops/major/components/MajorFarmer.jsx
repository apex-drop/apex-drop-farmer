import { CgSpinner } from "react-icons/cg";
import MajorIcon from "../assets/images/icon.png";
import useMajorUserQuery from "../hooks/useMajorUserQuery";
import MajorBalanceDisplay from "./MajorBalanceDisplay";
import MajorHoldCoin from "./MajorHoldCoin";
import MajorRoulette from "./MajorRoulette";
import MajorSwipeCoin from "./MajorSwipeCoin";

export default function MajorFarmer() {
  const userQuery = useMajorUserQuery();

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 p-2">
        <img
          src={MajorIcon}
          alt="Major Farmer"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="font-bold">Major Farmer</h1>
      </div>

      {userQuery.isSuccess ? (
        <>
          <MajorBalanceDisplay />
          <div className="flex flex-col gap-2 py-4">
            <MajorHoldCoin />
            <MajorRoulette />
            <MajorSwipeCoin />
          </div>
        </>
      ) : (
        <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
      )}
    </div>
  );
}
