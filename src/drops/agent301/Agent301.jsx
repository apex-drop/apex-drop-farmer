import Agent301AuthContext from "./context/Agent301AuthContext";
import Agent301AuthDetect from "./components/Agent301AuthDetect";
import Agent301Farmer from "./components/Agent301Farmer";
import useAgent301AuthorizationHeader from "./hooks/useAgent301AuthorizationHeader";

function Agent301() {
  const auth = useAgent301AuthorizationHeader();
  return (
    <div className="flex flex-col text-white bg-black grow">
      <Agent301AuthContext.Provider value={auth}>
        {auth ? <Agent301Farmer /> : <Agent301AuthDetect />}
      </Agent301AuthContext.Provider>
    </div>
  );
}

export default Agent301;
