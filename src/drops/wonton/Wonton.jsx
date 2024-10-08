import WontonAuthDetect from "./components/WontonAuthDetect";
import WontonFarmer from "./components/WontonFarmer";
import WontonFarmerContext from "./context/WontonFarmerContext";
import useWontonFarmer from "./hooks/useWontonFarmer";

function Wonton() {
  const farmer = useWontonFarmer();
  return (
    <WontonFarmerContext.Provider value={farmer}>
      {farmer.auth ? (
        <WontonFarmer />
      ) : (
        <WontonAuthDetect status={farmer.status} />
      )}
    </WontonFarmerContext.Provider>
  );
}

export default Wonton;
