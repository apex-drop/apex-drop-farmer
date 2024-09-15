import GoatsAuthContext from "./context/GoatsAuthContext";
import GoatsAuthDetect from "./components/GoatsAuthDetect";
import GoatsFarmer from "./components/GoatsFarmer";
import useGoatsAuthorizationHeader from "./hooks/useGoatsAuthorizationHeader";

function Goats() {
  const auth = useGoatsAuthorizationHeader();
  return (
    <div className="flex flex-col text-white bg-black grow">
      <GoatsAuthContext.Provider value={auth}>
        {auth ? <GoatsFarmer /> : <GoatsAuthDetect />}
      </GoatsAuthContext.Provider>
    </div>
  );
}

export default Goats;
