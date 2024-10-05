import BirdTonAuthDetect from "./components/BirdTonAuthDetect";
import BirdTonFarmer from "./components/BirdTonFarmer";
import BirdTonFarmerContext from "./context/BirdTonFarmerContext";
import useBirdTon from "./hooks/useBirdTon";
import useBirdTonFarmer from "./hooks/useBirdTonFarmer";

export default function BirdTon() {
  const farmer = useBirdTon(useBirdTonFarmer());

  return (
    <BirdTonFarmerContext.Provider value={farmer}>
      {farmer.auth ? (
        <BirdTonFarmer />
      ) : (
        <BirdTonAuthDetect status={farmer.status} />
      )}
    </BirdTonFarmerContext.Provider>
  );
}
