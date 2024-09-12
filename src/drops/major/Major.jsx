import MajorAuthContext from "./context/MajorAuthContext";
import MajorAuthDetect from "./components/MajorAuthDetect";
import MajorFarmer from "./components/MajorFarmer";
import useMajorAuthorizationHeader from "./hooks/useMajorAuthorizationHeader";

function Major() {
  const auth = useMajorAuthorizationHeader();
  return (
    <MajorAuthContext.Provider value={auth}>
      {auth ? <MajorFarmer /> : <MajorAuthDetect />}
    </MajorAuthContext.Provider>
  );
}

export default Major;
