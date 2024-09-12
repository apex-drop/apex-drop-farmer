import SlotcoinAuthContext from "./context/SlotcoinAuthContext";
import SlotcoinAuthDetect from "./components/SlotcoinAuthDetect";
import SlotcoinFarmer from "./components/SlotcoinFarmer";
import useSlotcoinAuthorizationHeader from "./hooks/useSlotcoinAuthorizationHeader";

function Slotcoin() {
  const auth = useSlotcoinAuthorizationHeader();
  return (
    <SlotcoinAuthContext.Provider value={auth}>
      {auth ? <SlotcoinFarmer /> : <SlotcoinAuthDetect />}
    </SlotcoinAuthContext.Provider>
  );
}

export default Slotcoin;
