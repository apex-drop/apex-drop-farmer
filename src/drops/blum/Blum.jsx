import BlumAuthContext from "./context/BlumAuthContext";
import BlumAuthDetect from "./components/BlumAuthDetect";
import BlumFarmer from "./components/BlumFarmer";
import useBlumAuthorizationHeader from "./hooks/useBlumAuthorizationHeader";

function Blum() {
  const auth = useBlumAuthorizationHeader();
  return (
    <div className="flex flex-col text-white bg-black grow">
      <BlumAuthContext.Provider value={auth}>
        {auth ? <BlumFarmer /> : <BlumAuthDetect />}
      </BlumAuthContext.Provider>
    </div>
  );
}

export default Blum;
