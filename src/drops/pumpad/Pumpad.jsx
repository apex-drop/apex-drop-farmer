import PumpadAuthContext from "./context/PumpadAuthContext";
import PumpadAuthDetect from "./components/PumpadAuthDetect";
import PumpadFarmer from "./components/PumpadFarmer";
import usePumpadAuthorizationHeader from "./hooks/usePumpadAuthorizationHeader";

function Pumpad() {
  const auth = usePumpadAuthorizationHeader();
  return (
    <PumpadAuthContext.Provider value={auth}>
      {auth ? <PumpadFarmer /> : <PumpadAuthDetect />}
    </PumpadAuthContext.Provider>
  );
}

export default Pumpad;
