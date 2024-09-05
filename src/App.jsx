import AuthDetect from "@/components/AuthDetect";
import Farmer from "@/components/Farmer";

import AuthContext from "./context/AuthContext";
import useAuthorizationHeader from "./hooks/useAuthorizationHeader";

function App() {
  const auth = useAuthorizationHeader();
  return (
    <AuthContext.Provider value={auth}>
      {auth ? <Farmer /> : <AuthDetect />}
    </AuthContext.Provider>
  );
}

export default App;
