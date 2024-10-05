import FarmerDetect from "@/components/FarmerDetect";

import BirdTonIcon from "../assets/images/icon.png?format=webp";

export default function BirdTonAuthDetect({ status }) {
  return (
    <FarmerDetect title={"BirdTon Farmer"} icon={BirdTonIcon} status={status} />
  );
}
