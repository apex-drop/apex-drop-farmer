import TadaAuthDetect from "./components/TadaAuthDetect";
import TadaFarmer from "./components/TadaFarmer";
import TadaFarmerContext from "./context/TadaFarmerContext";
import useTadaFarmer from "./hooks/useTadaFarmer";

function Tada() {
  const farmer = useTadaFarmer();
  return (
    <TadaFarmerContext.Provider value={farmer}>
      {farmer.auth ? <TadaFarmer /> : <TadaAuthDetect status={farmer.status} />}
    </TadaFarmerContext.Provider>
  );
}

export default Tada;
