import YescoinAuthDetect from "./components/YescoinAuthDetect";
import YescoinFarmer from "./components/YescoinFarmer";
import YescoinFarmerContext from "./context/YescoinFarmerContext";
import useYescoinFarmer from "./hooks/useYescoinFarmer";

function Yescoin() {
  const farmer = useYescoinFarmer();
  return (
    <YescoinFarmerContext.Provider value={farmer}>
      {farmer.auth ? (
        <YescoinFarmer />
      ) : (
        <YescoinAuthDetect status={farmer.status} />
      )}
    </YescoinFarmerContext.Provider>
  );
}

export default Yescoin;
