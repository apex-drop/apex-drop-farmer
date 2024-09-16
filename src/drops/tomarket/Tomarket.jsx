import TomarketAuthContext from "./context/TomarketAuthContext";
import TomarketAuthDetect from "./components/TomarketAuthDetect";
import TomarketFarmer from "./components/TomarketFarmer";
import useTomarketAuthorizationHeader from "./hooks/useTomarketAuthorizationHeader";

function Tomarket() {
  const auth = useTomarketAuthorizationHeader();

  return (
    <div className="flex flex-col grow">
      <TomarketAuthContext.Provider value={auth}>
        {auth ? <TomarketFarmer /> : <TomarketAuthDetect />}
      </TomarketAuthContext.Provider>
    </div>
  );
}

export default Tomarket;
