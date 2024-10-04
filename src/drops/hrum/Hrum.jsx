import HrumAuthDetect from "./components/HrumAuthDetect";
import HrumFarmer from "./components/HrumFarmer";
import HrumFarmerContext from "./context/HrumFarmerContext";
import useHrumFarmer from "./hooks/useHrumFarmer";

function Hrum() {
  const farmer = useHrumFarmer();
  return (
    <div className="flex flex-col min-w-0 min-h-0 text-white bg-purple-500 grow">
      <HrumFarmerContext.Provider value={farmer}>
        {farmer.auth ? (
          <HrumFarmer />
        ) : (
          <HrumAuthDetect status={farmer.status} />
        )}
      </HrumFarmerContext.Provider>
    </div>
  );
}

export default Hrum;
