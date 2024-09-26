import GoatsAuthDetect from "./components/GoatsAuthDetect";
import GoatsFarmer from "./components/GoatsFarmer";
import GoatsFarmerContext from "./context/GoatsFarmerContext";
import useGoatsFarmer from "./hooks/useGoatsFarmer";

function Goats() {
  const farmer = useGoatsFarmer();
  return (
    <div className="flex flex-col text-white bg-black grow">
      <GoatsFarmerContext.Provider value={farmer}>
        {farmer.auth ? <GoatsFarmer /> : <GoatsAuthDetect />}
      </GoatsFarmerContext.Provider>
    </div>
  );
}

export default Goats;
