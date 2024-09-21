import TapCatAuthContext from "./context/TapCatAuthContext";
import TapCatAuthDetect from "./components/TapCatAuthDetect";
import TapCatFarmer from "./components/TapCatFarmer";
import useTapCatAuthorizationHeader from "./hooks/useTapCatAuthorizationHeader";

function TapCat() {
  const auth = useTapCatAuthorizationHeader();
  return (
    <div className="flex flex-col text-white bg-rose-500 grow">
      <TapCatAuthContext.Provider value={auth}>
        {auth ? <TapCatFarmer /> : <TapCatAuthDetect />}
      </TapCatAuthContext.Provider>
    </div>
  );
}

export default TapCat;
