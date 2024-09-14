import TruecoinAuthContext from "./context/TruecoinAuthContext";
import TruecoinAuthDetect from "./components/TruecoinAuthDetect";
import TruecoinFarmer from "./components/TruecoinFarmer";
import useTruecoinAuthorizationHeader from "./hooks/useTruecoinAuthorizationHeader";

function Truecoin() {
  const auth = useTruecoinAuthorizationHeader();
  return (
    <TruecoinAuthContext.Provider value={auth}>
      {auth ? <TruecoinFarmer /> : <TruecoinAuthDetect />}
    </TruecoinAuthContext.Provider>
  );
}

export default Truecoin;
