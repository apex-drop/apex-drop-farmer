import BitsAuthDetect from "./components/BitsAuthDetect";
import BitsFarmer from "./components/BitsFarmer";
import BitsFarmerContext from "./context/BitsFarmerContext";
import useBitsFarmer from "./hooks/useBitsFarmer";

function Bits() {
  const farmer = useBitsFarmer();
  return (
    <div className="flex flex-col min-w-0 min-h-0 text-white bg-black grow">
      <BitsFarmerContext.Provider value={farmer}>
        {farmer.auth ? (
          <BitsFarmer />
        ) : (
          <BitsAuthDetect status={farmer.status} />
        )}
      </BitsFarmerContext.Provider>
    </div>
  );
}

export default Bits;
