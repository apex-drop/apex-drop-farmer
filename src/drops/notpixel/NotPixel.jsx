import NotPixelAuthDetect from "./components/NotPixelAuthDetect";
import NotPixelFarmer from "./components/NotPixelFarmer";
import NotPixelFarmerContext from "./context/NotPixelFarmerContext";
import useNotPixelFarmer from "./hooks/useNotPixelFarmer";

function NotPixel() {
  const farmer = useNotPixelFarmer();
  return (
    <NotPixelFarmerContext.Provider value={farmer}>
      {farmer.auth ? (
        <NotPixelFarmer />
      ) : (
        <NotPixelAuthDetect status={farmer.status} />
      )}
    </NotPixelFarmerContext.Provider>
  );
}

export default NotPixel;
