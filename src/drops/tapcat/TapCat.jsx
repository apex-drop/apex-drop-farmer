import TapCatAuthDetect from "./components/TapCatAuthDetect";
import TapCatFarmer from "./components/TapCatFarmer";
import TapCatFarmerContext from "./context/TapCatFarmerContext";
import useTapCatFarmer from "./hooks/useTapCatFarmer";

function TapCat() {
  const farmer = useTapCatFarmer();
  return (
    <div className="flex flex-col text-white bg-rose-500 grow">
      <TapCatFarmerContext.Provider value={farmer}>
        {farmer.auth ? <TapCatFarmer /> : <TapCatAuthDetect />}
      </TapCatFarmerContext.Provider>
    </div>
  );
}

export default TapCat;
